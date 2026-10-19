// ═══════════════════════════════════════════════════════════════
//  NeuroAtlas · Motor de gamificación
//  XP · Niveles neuro-temáticos · Racha diaria · Logros
//  Todo persiste en localStorage (sin backend, listo para Vercel)
// ═══════════════════════════════════════════════════════════════

import { toast } from '@/hooks/use-toast'

// ─── Niveles ───────────────────────────────────────────────────
export type Level = { xp: number; name: string; emoji: string }

export const LEVELS: Level[] = [
  { xp: 0, name: 'Neurona novata', emoji: '🌱' },
  { xp: 60, name: 'Dendrita curiosa', emoji: '🌿' },
  { xp: 150, name: 'Sinapsis activa', emoji: '⚡' },
  { xp: 300, name: 'Axón veloz', emoji: '🚀' },
  { xp: 500, name: 'Ganglio en marcha', emoji: '🧩' },
  { xp: 750, name: 'Circuito local', emoji: '🔗' },
  { xp: 1050, name: 'Vía ascendente', emoji: '📈' },
  { xp: 1400, name: 'Corteza brillante', emoji: '✨' },
  { xp: 1800, name: 'Cerebro maestro', emoji: '🧠' },
  { xp: 2300, name: 'Neuroanatomista legendario', emoji: '👑' },
]

export function getLevelInfo(xp: number) {
  let idx = 0
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) idx = i
  const current = LEVELS[idx]
  const next = LEVELS[idx + 1] ?? null
  const span = next ? next.xp - current.xp : 1
  const pct = next ? Math.min(100, Math.round(((xp - current.xp) / span) * 100)) : 100
  return { index: idx, current, next, pct, toNext: next ? next.xp - xp : 0 }
}

// ─── Logros ────────────────────────────────────────────────────
export type Achievement = {
  id: string
  name: string
  desc: string
  icon: string // clave de icono (mapeada a lucide en el diálogo)
  tone: 'fuchsia' | 'amber' | 'emerald' | 'violet' | 'rose' | 'cyan'
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'primer-paso', name: 'Primer destello', desc: 'Estudia tu primera estructura', icon: 'sparkles', tone: 'fuchsia' },
  { id: 'diez', name: 'Dendrita en acción', desc: 'Estudia 10 estructuras', icon: 'zap', tone: 'violet' },
  { id: 'veinticinco', name: 'Mitad del camino', desc: 'Estudia 25 estructuras', icon: 'waypoints', tone: 'cyan' },
  { id: 'cincuenta', name: 'Corteza avanzada', desc: 'Estudia 50 estructuras', icon: 'brain', tone: 'fuchsia' },
  { id: 'cerebro-completo', name: 'Cerebro completo', desc: 'Estudia las 71 estructuras', icon: 'crown', tone: 'amber' },
  { id: 'racha-3', name: 'En racha', desc: 'Estudia 3 días seguidos', icon: 'flame', tone: 'rose' },
  { id: 'racha-7', name: 'Semana sináptica', desc: 'Estudia 7 días seguidos', icon: 'calendar', tone: 'amber' },
  { id: 'quiz-70', name: 'Aprobado con estilo', desc: 'Saca 70% o más en el examen', icon: 'medal', tone: 'emerald' },
  { id: 'quiz-perfecto', name: 'Puntaje perfecto', desc: '10/10 en el examen de test', icon: 'target', tone: 'emerald' },
  { id: 'practico-aprobado', name: 'Práctico dominado', desc: 'Saca 10.5/15 o más en el simulador', icon: 'stethoscope', tone: 'violet' },
  { id: 'practico-perfecto', name: 'Nota legendaria', desc: '15/15 en el simulador práctico', icon: 'trophy', tone: 'amber' },
  { id: 'compartido', name: 'Compartir es cuidar', desc: 'Comparte tu progreso con alguien', icon: 'share', tone: 'cyan' },
]

// ─── Almacenamiento ────────────────────────────────────────────
const XP_KEY = 'neuroatlas-xp'
const STREAK_KEY = 'neuroatlas-streak-info'
const ACH_KEY = 'neuroatlas-achievements'

type StreakInfo = { count: number; last: string }

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

function todayStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getXp(): number {
  if (typeof window === 'undefined') return 0
  return readJson<number>(XP_KEY, 0)
}

export function getStreak(): number {
  if (typeof window === 'undefined') return 0
  return readJson<StreakInfo>(STREAK_KEY, { count: 0, last: '' }).count
}

export function getUnlockedIds(): string[] {
  if (typeof window === 'undefined') return []
  return readJson<string[]>(ACH_KEY, [])
}

// ─── Núcleo ────────────────────────────────────────────────────
export type RecordResult = {
  xpGained: number
  xp: number
  level: ReturnType<typeof getLevelInfo>
  leveledUp: boolean
  unlocked: Achievement[]
  streak: number
  streakIncreased: boolean
}

function addXp(amount: number, res: { xpGained: number; leveledUp: boolean; xp: number }) {
  const before = getXp()
  const after = before + amount
  writeJson(XP_KEY, after)
  res.xpGained += amount
  res.xp = after
  if (getLevelInfo(after).index > getLevelInfo(before).index) res.leveledUp = true
}

function touchStreak(res: { streak: number; streakIncreased: boolean }) {
  const today = todayStr()
  const info = readJson<StreakInfo>(STREAK_KEY, { count: 0, last: '' })
  if (info.last === today) {
    res.streak = Math.max(1, info.count)
    return
  }
  const yesterday = todayStr(new Date(Date.now() - 86400000))
  const nextCount = info.last === yesterday ? info.count + 1 : 1
  writeJson(STREAK_KEY, { count: nextCount, last: today })
  res.streak = nextCount
  res.streakIncreased = true
}

function unlockMany(ids: string[], res: { unlocked: Achievement[] }) {
  const have = new Set(getUnlockedIds())
  for (const id of ids) {
    if (have.has(id)) continue
    const ach = ACHIEVEMENTS.find((a) => a.id === id)
    if (!ach) continue
    have.add(id)
    res.unlocked.push(ach)
  }
  writeJson(ACH_KEY, [...have])
}

function finish(res: RecordResult): RecordResult {
  // Toast de subida de nivel
  if (res.leveledUp) {
    toast({
      title: `${res.level.current.emoji} ¡Subiste de nivel!`,
      description: `Ahora eres: ${res.level.current.name}`,
    })
  }
  // Toasts de logros (máximo 2 por acción para no saturar)
  for (const ach of res.unlocked.slice(0, 2)) {
    toast({
      title: `🏆 Logro: ${ach.name}`,
      description: ach.desc,
    })
  }
  return res
}

// ─── Acciones de alto nivel ────────────────────────────────────
/** Llamar SOLO cuando se estudia una estructura NUEVA. */
export function recordStudy(studiedCount: number, total: number): RecordResult {
  const res: RecordResult = {
    xpGained: 0,
    xp: 0,
    level: getLevelInfo(getXp()),
    leveledUp: false,
    unlocked: [],
    streak: getStreak(),
    streakIncreased: false,
  }
  addXp(5, res)
  touchStreak(res)
  const ids = ['primer-paso']
  if (studiedCount >= 10) ids.push('diez')
  if (studiedCount >= 25) ids.push('veinticinco')
  if (studiedCount >= 50) ids.push('cincuenta')
  if (studiedCount >= total) ids.push('cerebro-completo')
  unlockMany(ids, res)
  res.level = getLevelInfo(res.xp)
  return finish(res)
}

/** Llamar al terminar un examen de test. */
export function recordQuiz(correct: number, total: number): RecordResult {
  const res: RecordResult = {
    xpGained: 0,
    xp: 0,
    level: getLevelInfo(getXp()),
    leveledUp: false,
    unlocked: [],
    streak: getStreak(),
    streakIncreased: false,
  }
  addXp(correct * 3 + (correct === total && total >= 10 ? 20 : 0), res)
  touchStreak(res)
  const pct = total > 0 ? (correct / total) * 100 : 0
  const ids: string[] = []
  if (pct >= 70) ids.push('quiz-70')
  if (correct === total && total >= 10) ids.push('quiz-perfecto')
  unlockMany(ids, res)
  res.level = getLevelInfo(res.xp)
  return finish(res)
}

/** Llamar al terminar el simulador práctico (máx. 15 pts). */
export function recordPractical(score: number): RecordResult {
  const res: RecordResult = {
    xpGained: 0,
    xp: 0,
    level: getLevelInfo(getXp()),
    leveledUp: false,
    unlocked: [],
    streak: getStreak(),
    streakIncreased: false,
  }
  addXp(Math.round(score * 2), res)
  touchStreak(res)
  const ids: string[] = []
  if (score >= 10.5) ids.push('practico-aprobado')
  if (score >= 15) ids.push('practico-perfecto')
  unlockMany(ids, res)
  res.level = getLevelInfo(res.xp)
  return finish(res)
}

/** Llamar cuando se comparte el progreso con éxito. */
export function recordShare(): RecordResult {
  const res: RecordResult = {
    xpGained: 0,
    xp: 0,
    level: getLevelInfo(getXp()),
    leveledUp: false,
    unlocked: [],
    streak: getStreak(),
    streakIncreased: false,
  }
  addXp(10, res)
  touchStreak(res)
  unlockMany(['compartido'], res)
  res.level = getLevelInfo(res.xp)
  return finish(res)
}

/** Texto listo para compartir en WhatsApp/redes. */
export function buildShareText(studied: number, total: number): string {
  const xp = getXp()
  const lvl = getLevelInfo(xp)
  const streak = getStreak()
  const parts = [
    `🧠 Llevo ${studied}/${total} estructuras de neuroanatomía en NeuroAtlas`,
    `Nivel: ${lvl.current.emoji} ${lvl.current.name} (${xp} XP)`,
    streak > 1 ? `Racha: ${streak} días seguidos 🔥` : null,
    `¡Entra y estudia tú también, es gratis!`,
  ].filter(Boolean)
  return parts.join('\n')
}
