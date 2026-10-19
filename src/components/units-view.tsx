'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  GraduationCap,
  ListChecks,
  MapPin,
  Medal,
  Network,
  Play,
  RotateCcw,
  Ruler,
  Scissors,
  Shield,
  Shuffle,
  Sparkles,
  Stethoscope,
  Target,
  Timer,
  Trophy,
  Waypoints,
  Zap,
} from 'lucide-react'
import {
  EXTRA_TOPICS,
  getExtraTopic,
  type ExtraStructure,
  type ExtraTopicId,
} from '@/lib/neuro-extra-data'
import { EXTRA_DIAGRAMS, EXAM_PINS, type ExamPin } from '@/components/extra-diagrams'
import { recordPractical } from '@/lib/gamification'
import { confettiBurst, confettiParty } from '@/lib/confetti'

const TOPIC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  Shield,
  Scissors,
  MapPin,
  Droplets,
  Waypoints,
}

const EXAM_SECONDS = 15 * 60
const BEST_KEY = 'neuroatlas-practico-best'

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

function fmtTime(total: number) {
  const m = Math.floor(Math.max(0, total) / 60)
  const s = Math.max(0, total) % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ═══════════════ PANEL DE DETALLE (estudio) ═══════════════
function DetailPanel({
  structure,
  studied,
  onPrev,
  onNext,
  index,
  total,
}: {
  structure: ExtraStructure
  studied: boolean
  onPrev: () => void
  onNext: () => void
  index: number
  total: number
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={structure.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22 }}
        className="flex h-full flex-col"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold leading-tight text-foreground sm:text-2xl">{structure.name}</h3>
              {studied && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" aria-label="Ya estudiada" />}
            </div>
            <p className="mt-0.5 text-xs italic text-muted-foreground sm:text-sm">{structure.latin}</p>
          </div>
          <Badge className="shrink-0 border-0 text-white" style={{ backgroundColor: structure.color }}>
            {structure.category}
          </Badge>
        </div>

        <div className="nice-scrollbar mt-3 max-h-[46vh] flex-1 overflow-y-auto pr-2 lg:max-h-[52vh]">
          <div className="space-y-4 pb-2">
            <section aria-label="Función principal">
              <h4 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-amber-500">
                <Zap className="h-4 w-4" /> Función principal
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 sm:text-[15px]">{structure.func}</p>
            </section>

            <section
              aria-label="Límites y relaciones anatómicas"
              className="rounded-xl border border-violet-500/40 bg-violet-500/10 p-3.5"
            >
              <h4 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-violet-300">
                <Ruler className="h-4 w-4" /> Límites y relaciones
                <Badge variant="outline" className="ml-1 border-violet-400/40 text-[10px] text-violet-300">
                  criterio 2 · rúbrica
                </Badge>
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{structure.limits}</p>
            </section>

            <section aria-label="Características">
              <h4 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-fuchsia-500">
                <Sparkles className="h-4 w-4" /> Características
              </h4>
              <ul className="mt-1.5 space-y-1.5">
                {structure.characteristics.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: structure.color }} />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Para el examen" className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5">
              <h4 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-amber-500">
                <GraduationCap className="h-4 w-4" /> Para el examen
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{structure.examTip}</p>
              {structure.mnemonic && (
                <p className="mt-2 rounded-lg bg-amber-500/15 px-3 py-2 text-sm font-medium text-amber-200/95">
                  💡 {structure.mnemonic}
                </p>
              )}
            </section>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
          <Button variant="outline" size="sm" onClick={onPrev} aria-label="Estructura anterior">
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>
          <span className="text-xs font-medium text-muted-foreground">
            {index + 1} / {total}
          </span>
          <Button size="sm" onClick={onNext} aria-label="Estructura siguiente">
            Siguiente <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ═══════════════ MODO 1 · ESTUDIAR ═══════════════
function StudyMode({
  studiedIds,
  onStudied,
}: {
  studiedIds: Set<string>
  onStudied: (id: string) => void
}) {
  const [topicId, setTopicId] = useState<ExtraTopicId>('division')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const topic = getExtraTopic(topicId)
  const structure = useMemo(() => topic.structures.find((s) => s.id === selectedId), [topic, selectedId])
  const idx = structure ? topic.structures.findIndex((s) => s.id === structure.id) : -1
  const Diagram = EXTRA_DIAGRAMS[topicId]

  const select = (id: string | null) => {
    setSelectedId(id)
    if (id) onStudied(id)
  }
  const goPrev = () => select(topic.structures[idx > 0 ? idx - 1 : topic.structures.length - 1].id)
  const goNext = () => select(topic.structures[idx < topic.structures.length - 1 ? idx + 1 : 0].id)

  return (
    <div className="space-y-5">
      {/* selector de tema */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EXTRA_TOPICS.map((t) => {
          const Icon = TOPIC_ICONS[t.icon] ?? Target
          const active = t.id === topicId
          const done = t.structures.filter((s) => studiedIds.has(s.id)).length
          return (
            <button
              key={t.id}
              onClick={() => {
                setTopicId(t.id)
                setSelectedId(null)
              }}
              aria-pressed={active}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                active
                  ? 'border-amber-500/70 bg-amber-500/10 shadow-[0_0_24px_rgba(245,158,11,0.15)]'
                  : 'border-border bg-card/60 hover:border-amber-500/40 hover:bg-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    active ? 'bg-amber-500 text-white' : 'bg-muted text-muted-foreground group-hover:text-amber-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className={`truncate text-sm font-bold sm:text-base ${active ? 'text-amber-300' : 'text-foreground'}`}>
                    {t.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{t.subtitle}</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-fuchsia-500 transition-all duration-500"
                  style={{ width: `${(done / t.structures.length) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {done}/{t.structures.length} estudiadas
              </p>
            </button>
          )
        })}
      </div>

      <p className="text-center text-sm text-muted-foreground">{topic.description}</p>

      {/* diagrama + panel */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
        <Card className="overflow-hidden border-border bg-card/70 lg:col-span-3">
          <CardContent className="p-3 sm:p-4">
            <Diagram key={topicId} selectedId={selectedId} onSelect={select} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {structure ? (
            <Card className="border-border bg-card/70">
              <CardContent className="p-4 sm:p-5">
                <DetailPanel
                  structure={structure}
                  studied={studiedIds.has(structure.id)}
                  onPrev={goPrev}
                  onNext={goNext}
                  index={idx}
                  total={topic.structures.length}
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-border bg-card/40">
              <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15">
                  <Target className="h-7 w-7 text-amber-400" />
                </div>
                <p className="text-base font-semibold text-foreground">Toca una estructura del diagrama</p>
                <p className="max-w-[280px] text-sm text-muted-foreground">
                  Verás su función, sus <strong>límites y relaciones anatómicas</strong> (criterio 2 de la rúbrica),
                  características y el dato clave para el examen práctico.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* chips */}
      <div>
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Target className="h-4 w-4" /> Estructuras de {topic.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {topic.structures.map((s) => {
            const active = s.id === selectedId
            const done = studiedIds.has(s.id)
            return (
              <button
                key={s.id}
                onClick={() => select(s.id)}
                aria-pressed={active}
                className={`group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all sm:text-[13px] ${
                  active
                    ? 'border-white/60 bg-white/10 text-white shadow-[0_0_14px_rgba(255,255,255,0.15)]'
                    : 'border-border bg-card/60 text-foreground/80 hover:border-white/30 hover:bg-card'
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: s.color }}
                />
                <span className={done && !active ? 'line-through opacity-60' : ''}>{s.name}</span>
                {done && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ═══════════════ MODO 2 · SIMULADOR PRÁCTICO ═══════════════
type PractPhase = 'setup' | 'run' | 'resultado'
type PractChoice = ExtraTopicId | 'mezcla'

const RUBRIC = [
  { pts: 3, label: 'Excelente', desc: 'Identifiqué la estructura + sus límites/relaciones + sus características o funciones' },
  { pts: 2, label: 'Regular', desc: 'Identifiqué la estructura y SOLO sus límites O solo sus funciones' },
  { pts: 1, label: 'Básico', desc: 'Solo identifiqué el nombre correcto de la estructura' },
  { pts: 0, label: 'Insuficiente', desc: 'No identifiqué la estructura o la dejé en blanco' },
]

function PracticalMode() {
  const [phase, setPhase] = useState<PractPhase>('setup')
  const [choice, setChoice] = useState<PractChoice>('mezcla')
  const [usedTopic, setUsedTopic] = useState<ExtraTopicId>('division')
  const [pins, setPins] = useState<ExamPin[]>([])
  const [structures, setStructures] = useState<ExtraStructure[]>([])
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [answers, setAnswers] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)
  const [scores, setScores] = useState<number[]>([])
  const [secondsLeft, setSecondsLeft] = useState(EXAM_SECONDS)
  const [best, setBest] = useState<number | null>(null)

  // cargar mejor puntaje
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(BEST_KEY)
        if (raw) setBest(Number(raw))
      } catch {
        /* ignore */
      }
    }
    queueMicrotask(load)
  }, [])

  // cronómetro
  useEffect(() => {
    if (phase !== 'run') return
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [phase])

  const start = () => {
    const topicId: ExtraTopicId =
      choice === 'mezcla' ? EXTRA_TOPICS[Math.floor(Math.random() * EXTRA_TOPICS.length)].id : choice
    const topic = getExtraTopic(topicId)
    const pinsForTopic = EXAM_PINS[topicId]
    const mapped = pinsForTopic.map((p) => topic.structures.find((s) => s.id === p.id)).filter(Boolean) as ExtraStructure[]
    setUsedTopic(topicId)
    setPins(pinsForTopic)
    setStructures(mapped)
    setIdx(0)
    setTyped('')
    setAnswers([])
    setRevealed(false)
    setScores([])
    setSecondsLeft(EXAM_SECONDS)
    setPhase('run')
  }

  const scoreStructure = (pts: number) => {
    const next = [...scores]
    next[idx] = pts
    setScores(next)
    if (idx + 1 >= structures.length) {
      const total = next.reduce((a, b) => a + (b ?? 0), 0)
      try {
        const prev = Number(localStorage.getItem(BEST_KEY) ?? '0')
        localStorage.setItem(BEST_KEY, String(Math.max(prev, total)))
        setBest((b) => (b === null ? total : Math.max(b, total)))
      } catch {
        /* ignore */
      }
      // ── Gamificación: XP, logros y confetti ──
      recordPractical(total)
      if (total >= 15) confettiParty()
      else if (total >= 10.5) confettiBurst()
      setPhase('resultado')
    } else {
      setIdx(idx + 1)
      setTyped('')
      setRevealed(false)
    }
  }

  const reveal = () => {
    setRevealed(true)
    setAnswers((prev) => {
      const next = [...prev]
      next[idx] = typed.trim()
      return next
    })
  }

  const total = scores.reduce((a, b) => a + (b ?? 0), 0)
  const current = structures[idx]
  const currentPin = pins[idx]

  const matches =
    revealed && current
      ? [current.name, ...(current.alt ?? [])]
          .map(norm)
          .filter((c) => c.length >= 5)
          .some((c) => norm(typed).includes(c))
      : false

  const pinState = (i: number): 'pendiente' | 'actual' | 'acertada' | 'revelada' => {
    if (i < idx) return (scores[i] ?? 0) >= 3 ? 'acertada' : 'revelada'
    if (i === idx) return 'actual'
    return 'pendiente'
  }

  const gradeMessage = (score: number) => {
    if (score >= 14) return { text: '¡Nivel 3 puro! Estás lista/o para el práctico real. 🌟', color: 'text-emerald-400' }
    if (score >= 11) return { text: '¡Muy bien! Solo pule límites y relaciones de algunas estructuras. 💪', color: 'text-amber-400' }
    if (score >= 7) return { text: 'Vas por buen camino: repasa las que te fallaron en el modo Estudiar. 📖', color: 'text-orange-400' }
    return { text: 'Tranquilo/a: el simulador es para aprender. Dale otra vuelta al diagrama y reintenta. 🧠', color: 'text-rose-400' }
  }

  return (
    <div className="space-y-5">
      {/* ─── CONFIGURACIÓN ─── */}
      {phase === 'setup' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <Card className="border-amber-500/30 bg-card/70">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-7">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15">
                <Stethoscope className="h-9 w-9 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-foreground sm:text-2xl">Simulador del Examen Práctico</h3>
                <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                  Igualito al examen práctico real: se proyecta una imagen con <strong>5 estructuras
                  numeradas</strong>, tenés <strong>15 minutos</strong>, y vos mismo/a te evalúas con la rúbrica oficial
                  (nota final sobre <strong>15 puntos</strong>).
                </p>
              </div>

              {/* rúbrica */}
              <div className="w-full max-w-xl space-y-2">
                <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <ListChecks className="h-4 w-4" /> Rúbrica oficial (por estructura)
                </p>
                {RUBRIC.map((r) => (
                  <div key={r.pts} className="flex items-start gap-3 rounded-xl border border-border bg-card/60 px-3.5 py-2.5 text-left">
                    <span
                      className={`mt-0.5 flex h-8 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold ${
                        r.pts === 3
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : r.pts === 2
                            ? 'bg-amber-500/20 text-amber-400'
                            : r.pts === 1
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {r.pts.toFixed(1)}
                    </span>
                    <p className="text-xs leading-relaxed text-foreground/80 sm:text-[13px]">
                      <strong className="text-foreground">{r.label}:</strong> {r.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* selección de tema */}
              <div className="w-full max-w-xl">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">¿Qué imagen quieres practicar?</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setChoice('mezcla')}
                    aria-pressed={choice === 'mezcla'}
                    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-[13px] ${
                      choice === 'mezcla'
                        ? 'border-amber-400/70 bg-amber-500/15 text-amber-200'
                        : 'border-border bg-card/60 text-foreground/80 hover:border-amber-400/40'
                    }`}
                  >
                    <Shuffle className="h-3.5 w-3.5" /> Mezcla aleatoria
                  </button>
                  {EXTRA_TOPICS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setChoice(t.id)}
                      aria-pressed={choice === t.id}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-[13px] ${
                        choice === t.id
                          ? 'border-amber-400/70 bg-amber-500/15 text-amber-200'
                          : 'border-border bg-card/60 text-foreground/80 hover:border-amber-400/40'
                      }`}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={start} size="lg" className="bg-amber-500 text-black hover:bg-amber-400">
                <Play className="h-5 w-5" /> Iniciar simulación (15 min)
              </Button>

              {best !== null && (
                <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                  <Medal className="h-4 w-4" /> Tu mejor nota práctica: {best}/15
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ─── EN CURSO ─── */}
      {phase === 'run' && current && currentPin && (
        <div className="space-y-4">
          {/* barra superior: cronómetro + progreso + puntaje */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3">
            <div
              className={`flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-lg font-extrabold tabular-nums ${
                secondsLeft <= 120 ? 'animate-pulse bg-rose-500/20 text-rose-300' : 'bg-white/5 text-foreground'
              }`}
              aria-label={`Tiempo restante ${fmtTime(secondsLeft)}`}
            >
              <Timer className="h-5 w-5" /> {fmtTime(secondsLeft)}
            </div>
            <div className="min-w-[120px] flex-1">
              <div className="mb-1 flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>Estructura {idx + 1} de 5</span>
                <span>Puntaje parcial: {total}/15</span>
              </div>
              <Progress value={((idx + (revealed ? 0.5 : 0)) / 5) * 100} className="h-2" />
            </div>
          </div>

          {secondsLeft === 0 && (
            <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-center text-sm font-bold text-rose-300">
              ⏰ ¡Se acabaron los 15 minutos! Termina de autoevaluarte para ver tu nota.
            </p>
          )}

          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
            {/* imagen proyectada con pines */}
            <Card className="overflow-hidden border-border bg-card/70 lg:col-span-3">
              <CardContent className="p-3 sm:p-4">
                <div className="relative">
                  {(() => {
                    const Diagram = EXTRA_DIAGRAMS[usedTopic]
                    return <Diagram selectedId={null} onSelect={() => {}} examMode />
                  })()}
                  {pins.map((p, i) => (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${(p.x / 760) * 100}%`, top: `${(p.y / 560) * 100}%` }}
                    >
                      <div
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-extrabold shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${
                          pinState(i) === 'actual'
                            ? 'border-amber-300 bg-amber-400 text-black'
                            : pinState(i) === 'acertada'
                              ? 'border-emerald-300 bg-emerald-500 text-white'
                              : pinState(i) === 'revelada'
                                ? 'border-rose-300 bg-rose-500 text-white'
                                : 'border-white/70 bg-[#26212e] text-white'
                        }`}
                      >
                        {pinState(i) === 'actual' && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
                        )}
                        <span className="relative">{i + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* panel de respuesta */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${idx}-${revealed}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border-border bg-card/70">
                    <CardContent className="p-4 sm:p-5">
                      {!revealed ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-base font-extrabold text-amber-300">
                              {idx + 1}
                            </span>
                            <h3 className="text-lg font-bold text-foreground">¿Qué estructura señala el pin {idx + 1}?</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Escribe el <strong>nombre</strong>. Después te autoevalúas con la rúbrica (límites y funciones
                            también cuentan).
                          </p>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              if (typed.trim().length >= 2) reveal()
                            }}
                            className="flex gap-2"
                          >
                            <Input
                              value={typed}
                              onChange={(e) => setTyped(e.target.value)}
                              placeholder="Nombre de la estructura…"
                              aria-label={`Respuesta para la estructura ${idx + 1}`}
                              autoFocus
                              className="bg-background/60"
                            />
                            <Button type="submit" disabled={typed.trim().length < 2} className="shrink-0 bg-amber-500 text-black hover:bg-amber-400">
                              Revelar
                            </Button>
                          </form>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-base font-extrabold text-amber-300">
                              {idx + 1}
                            </span>
                            <h3 className="text-lg font-bold text-foreground">{current.name}</h3>
                            <Badge
                              className={`border-0 ${matches ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}
                            >
                              {matches ? '✅ ¡Coincide!' : '❌ No coincide'}
                            </Badge>
                          </div>
                          <p className="text-xs italic text-muted-foreground">{current.latin}</p>
                          <p className="text-sm text-muted-foreground">
                            Tu respuesta: <strong className="text-foreground">{typed.trim()}</strong>
                          </p>

                          <div className="rounded-xl border border-violet-500/40 bg-violet-500/10 p-3">
                            <p className="text-xs font-bold uppercase tracking-wide text-violet-300">Límites y relaciones</p>
                            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{current.limits}</p>
                          </div>
                          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
                            <p className="text-xs font-bold uppercase tracking-wide text-amber-400">Función / descripción</p>
                            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{current.func}</p>
                          </div>

                          <div>
                            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                              <ListChecks className="h-4 w-4" /> Autoevalúate con la rúbrica:
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {RUBRIC.map((r) => (
                                <button
                                  key={r.pts}
                                  onClick={() => scoreStructure(r.pts)}
                                  title={r.desc}
                                  className={`rounded-xl border px-2.5 py-2 text-left text-xs font-semibold transition-all hover:scale-[1.03] ${
                                    r.pts === 3
                                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                                      : r.pts === 2
                                        ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                                        : r.pts === 1
                                          ? 'border-orange-500/50 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20'
                                          : 'border-rose-500/50 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20'
                                  }`}
                                >
                                  <span className="block text-base font-extrabold">{r.pts.toFixed(1)}</span>
                                  <span className="block text-[10px] font-bold uppercase tracking-wide opacity-80">{r.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* ─── RESULTADO ─── */}
      {phase === 'resultado' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-border bg-card/70">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/15">
                <Trophy className="h-10 w-10 text-amber-400" />
              </div>
              <div>
                <p className="text-5xl font-extrabold text-foreground">
                  {total}
                  <span className="text-2xl text-muted-foreground">/15</span>
                </p>
                <p className={`mt-2 text-base font-semibold ${gradeMessage(total).color}`}>{gradeMessage(total).text}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tema: {getExtraTopic(usedTopic).title} · tiempo usado: {fmtTime(EXAM_SECONDS - secondsLeft)}
                </p>
              </div>

              {/* revisión estructura por estructura */}
              <div className="w-full max-w-xl space-y-2 text-left">
                {structures.map((s, i) => (
                  <div key={s.id} className="rounded-xl border border-border bg-card/60 px-3.5 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-foreground">
                        {i + 1}. {s.name}
                      </p>
                      <Badge className="border-0 bg-white/10 text-foreground">{(scores[i] ?? 0).toFixed(1)}/3</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Escribiste:{' '}
                      <span className="font-medium text-foreground/80">{answers[i] ?? '—'}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={start} className="bg-amber-500 text-black hover:bg-amber-400">
                  <RotateCcw className="h-4 w-4" /> Repetir
                </Button>
                <Button variant="outline" onClick={() => setPhase('setup')}>
                  <BookOpen className="h-4 w-4" /> Cambiar de tema
                </Button>
              </div>
              {best !== null && (
                <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                  <Medal className="h-4 w-4" /> Tu mejor nota práctica: {best}/15
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

// ═══════════════ VISTA PRINCIPAL (pestaña) ═══════════════
export function UnitsView({
  studiedIds,
  onStudied,
}: {
  studiedIds: Set<string>
  onStudied: (id: string) => void
}) {
  const [mode, setMode] = useState<'estudiar' | 'practico'>('estudiar')

  return (
    <div className="space-y-5">
      {/* banner de presentación */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-fuchsia-500/10 to-violet-500/10 p-4 sm:p-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-foreground sm:text-xl">
              <Stethoscope className="h-6 w-6 text-amber-400" />
              Examen Práctico · Unidades 1 y 2
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Los 6 temas clásicos del componente práctico: división del sistema nervioso, meninges, planos,
              áreas funcionales, ventrículos y tallo cerebral — con notas clínicas y vocabulario de la rúbrica.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold">
              <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-amber-300">15 puntos</span>
              <span className="rounded-full bg-fuchsia-500/15 px-2.5 py-1 text-fuchsia-300">5 estructuras por imagen</span>
              <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-violet-300">15 minutos</span>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-300">Nombre + límites + funciones</span>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => setMode('estudiar')}
              aria-pressed={mode === 'estudiar'}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                mode === 'estudiar'
                  ? 'border-amber-400/70 bg-amber-500/20 text-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.25)]'
                  : 'border-white/10 bg-white/5 text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="h-4 w-4" /> Estudiar
            </button>
            <button
              onClick={() => setMode('practico')}
              aria-pressed={mode === 'practico'}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                mode === 'practico'
                  ? 'border-fuchsia-400/70 bg-fuchsia-500/20 text-fuchsia-200 shadow-[0_0_16px_rgba(217,70,239,0.25)]'
                  : 'border-white/10 bg-white/5 text-muted-foreground hover:text-foreground'
              }`}
            >
              <Stethoscope className="h-4 w-4" /> Simulador práctico
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'estudiar' ? (
          <motion.div key="estudiar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <StudyMode studiedIds={studiedIds} onStudied={onStudied} />
          </motion.div>
        ) : (
          <motion.div key="practico" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <PracticalMode />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
