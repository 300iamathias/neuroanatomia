'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Compass, Layers, ClipboardList, PartyPopper, Share2, Stethoscope, Trophy } from 'lucide-react'
import { ExploreView } from '@/components/explore-view'
import { FlashcardsView } from '@/components/flashcards-view'
import { QuizView } from '@/components/quiz-view'
import { UnitsView } from '@/components/units-view'
import { NeuralBackground } from '@/components/neural-background'
import { AchievementsDialog } from '@/components/achievements-dialog'
import { TOTAL_STRUCTURES, type TopicId } from '@/lib/anatomy-data'
import { EXTRA_TOTAL_STRUCTURES } from '@/lib/neuro-extra-data'
import { buildShareText, getLevelInfo, getStreak, getUnlockedIds, getXp, recordShare, recordStudy } from '@/lib/gamification'
import { confettiBurst, confettiParty } from '@/lib/confetti'

type TabId = 'explorar' | 'tarjetas' | 'examen' | 'practico'

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'explorar', label: 'Explorar', icon: Compass },
  { id: 'tarjetas', label: 'Tarjetas', icon: Layers },
  { id: 'examen', label: 'Examen', icon: ClipboardList },
  { id: 'practico', label: 'Práctico', icon: Stethoscope },
]

const STORAGE_KEY = 'neuroatlas-studied'
const TOTAL_ALL = TOTAL_STRUCTURES + EXTRA_TOTAL_STRUCTURES

export default function Home() {
  const [tab, setTab] = useState<TabId>('explorar')
  const [topicId, setTopicId] = useState<TopicId>('limbico')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [studiedIds, setStudiedIds] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)
  // gamificación (se carga tras hidratar para evitar mismatch)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [unlockedCount, setUnlockedCount] = useState(0)
  const [achOpen, setAchOpen] = useState(false)
  const studiedRef = useRef<Set<string>>(new Set())

  // Cargar progreso + gamificación guardados
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = new Set(JSON.parse(raw) as string[])
          studiedRef.current = parsed
          setStudiedIds(parsed)
        }
      } catch {
        // ignore
      }
      setXp(getXp())
      setStreak(getStreak())
      setUnlockedCount(getUnlockedIds().length)
      setHydrated(true)
    }
    queueMicrotask(load)
  }, [])

  const markStudied = useCallback((id: string) => {
    if (studiedRef.current.has(id)) return
    const next = new Set(studiedRef.current)
    next.add(id)
    studiedRef.current = next
    setStudiedIds(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
    } catch {
      // ignore
    }
    // ── Gamificación: XP + racha + logros (solo estructura nueva) ──
    const res = recordStudy(next.size, TOTAL_ALL)
    setXp(res.xp)
    setStreak(res.streak)
    if (res.unlocked.length > 0) {
      setUnlockedCount((c) => c + res.unlocked.length)
      if (res.unlocked.some((a) => a.id === 'cerebro-completo')) confettiParty()
      else confettiBurst()
    }
    if (res.leveledUp) confettiParty()
  }, [])

  const handleStructureSelect = useCallback(
    (id: string | null) => {
      setSelectedId(id)
      if (id) markStudied(id)
    },
    [markStudied]
  )

  const handleShare = useCallback(async () => {
    const text = `${buildShareText(studiedRef.current.size, TOTAL_ALL)}\n${window.location.href}`
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: 'NeuroAtlas 🧠', text, url: window.location.href })
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
      }
      const res = recordShare()
      setXp(res.xp)
      setStreak(res.streak)
      setUnlockedCount((c) => c + res.unlocked.length)
    } catch {
      // usuario canceló el compartir
    }
  }, [])

  const pct = Math.round((studiedIds.size / TOTAL_ALL) * 100)
  const complete = studiedIds.size >= TOTAL_ALL
  const level = getLevelInfo(xp)

  return (
    <div className="relative flex min-h-screen flex-col bg-[#131018] text-foreground">
      {/* ═══ FONDO NEURONAL ANIMADO ═══ */}
      <NeuralBackground />

      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#131018]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-amber-400 shadow-[0_0_20px_rgba(217,70,239,0.35)]">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-amber-200 bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl">
                NeuroAtlas
              </h1>
              <p className="text-[11px] text-muted-foreground sm:text-xs">
                Sistema límbico · Lóbulos · Surcos y giros · Práctico
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2" aria-label={`Progreso: ${pct}% estudiado`}>
            {complete && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="hidden items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-400 sm:flex"
              >
                <PartyPopper className="h-3.5 w-3.5" /> ¡Cerebro completo!
              </motion.span>
            )}

            {/* Racha diaria */}
            <span
              title={streak > 0 ? `Racha de estudio: ${streak} ${streak === 1 ? 'día' : 'días'} seguidos 🔥` : 'Estudia hoy para empezar tu racha 🔥'}
              className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-300"
            >
              🔥 {streak}
            </span>

            {/* Nivel */}
            <span
              title={level.next ? `${level.current.name} · ${level.toNext} XP para ${level.next.name}` : `${level.current.name} · ¡nivel máximo!`}
              className="flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-300"
            >
              ⚡ Lv {level.index + 1}
              <span className="hidden sm:inline">· {level.current.name}</span>
            </span>

            {/* Logros */}
            <button
              onClick={() => setAchOpen(true)}
              aria-label={`Ver logros: ${unlockedCount} desbloqueados`}
              title="Ver logros 🏆"
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-300 transition-all hover:border-amber-400/50 hover:bg-amber-500/10"
            >
              <Trophy className="h-4 w-4" />
              {unlockedCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-extrabold text-black">
                  {unlockedCount}
                </span>
              )}
            </button>

            {/* Compartir */}
            <button
              onClick={handleShare}
              aria-label="Compartir mi progreso"
              title="Comparte tu progreso 📤 (+10 XP)"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-fuchsia-300 transition-all hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10"
            >
              <Share2 className="h-4 w-4" />
            </button>

            {/* Barra de estructuras */}
            <div className="w-36 sm:w-48">
              <div className="mb-1 flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>Tu progreso</span>
                <span>
                  {studiedIds.size}/{TOTAL_ALL}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400"
                  animate={{ width: hydrated ? `${pct}%` : '0%' }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mx-auto max-w-6xl px-4 pb-3 sm:px-6" aria-label="Modos de estudio">
          <div className="nice-scrollbar flex gap-2 overflow-x-auto pb-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={tab === id ? 'page' : undefined}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all sm:px-4 ${
                  tab === id
                    ? 'border-fuchsia-400/60 bg-fuchsia-500/15 text-fuchsia-200 shadow-[0_0_16px_rgba(217,70,239,0.2)]'
                    : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/25 hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* ═══ CONTENIDO ═══ */}
      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6 sm:py-7">
        {tab === 'explorar' && (
          <ExploreView
            topicId={topicId}
            onTopicChange={(t) => {
              setTopicId(t)
              setSelectedId(null)
            }}
            selectedId={selectedId}
            onStructureSelect={handleStructureSelect}
            studiedIds={studiedIds}
          />
        )}
        {tab === 'tarjetas' && <FlashcardsView onStudied={markStudied} />}
        {tab === 'examen' && <QuizView />}
        {tab === 'practico' && <UnitsView studiedIds={studiedIds} onStudied={markStudied} />}
      </main>

      {/* ═══ FOOTER (pegado abajo) ═══ */}
      <footer className="relative z-10 mt-auto border-t border-white/10 bg-black/25">
        <div
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:flex-row sm:px-6 sm:text-left"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <p className="text-xs text-muted-foreground sm:text-sm">
            🧠 Estudia un poco cada día: tu hipocampo consolida los recuerdos mientras duermes.
          </p>
          <p className="text-xs font-semibold text-fuchsia-300/80">
            NeuroAtlas · Tu laboratorio de neuroanatomía
          </p>
        </div>
      </footer>

      {/* ═══ DIÁLOGO DE LOGROS ═══ */}
      <AchievementsDialog open={achOpen} onOpenChange={setAchOpen} />
    </div>
  )
}
