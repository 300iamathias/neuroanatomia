'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Compass, Layers, ClipboardList, PartyPopper } from 'lucide-react'
import { ExploreView } from '@/components/explore-view'
import { FlashcardsView } from '@/components/flashcards-view'
import { QuizView } from '@/components/quiz-view'
import { TOTAL_STRUCTURES, type TopicId } from '@/lib/anatomy-data'

type TabId = 'explorar' | 'tarjetas' | 'examen'

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'explorar', label: 'Explorar', icon: Compass },
  { id: 'tarjetas', label: 'Tarjetas', icon: Layers },
  { id: 'examen', label: 'Examen', icon: ClipboardList },
]

const STORAGE_KEY = 'neuroatlas-studied'

export default function Home() {
  const [tab, setTab] = useState<TabId>('explorar')
  const [topicId, setTopicId] = useState<TopicId>('limbico')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [studiedIds, setStudiedIds] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  // Cargar progreso guardado (fuera del render síncrono del efecto)
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) setStudiedIds(new Set(JSON.parse(raw) as string[]))
      } catch {
        // ignore
      }
      setHydrated(true)
    }
    queueMicrotask(load)
  }, [])

  const markStudied = useCallback((id: string) => {
    setStudiedIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const handleStructureSelect = useCallback(
    (id: string | null) => {
      setSelectedId(id)
      if (id) markStudied(id)
    },
    [markStudied]
  )

  const pct = Math.round((studiedIds.size / TOTAL_STRUCTURES) * 100)
  const complete = studiedIds.size >= TOTAL_STRUCTURES

  return (
    <div className="dark flex min-h-screen flex-col bg-[#131018] text-foreground">
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
                Sistema límbico · Lóbulos · Surcos y giros
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3" aria-label={`Progreso: ${pct}% estudiado`}>
            {complete && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="hidden items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-400 sm:flex"
              >
                <PartyPopper className="h-3.5 w-3.5" /> ¡Cerebro completo!
              </motion.span>
            )}
            <div className="w-36 sm:w-48">
              <div className="mb-1 flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>Tu progreso</span>
                <span>
                  {studiedIds.size}/{TOTAL_STRUCTURES}
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
          <div className="flex gap-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={tab === id ? 'page' : undefined}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all sm:px-4 ${
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
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6 sm:py-7">
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
      </main>

      {/* ═══ FOOTER (pegado abajo) ═══ */}
      <footer className="mt-auto border-t border-white/10 bg-black/25">
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
    </div>
  )
}
