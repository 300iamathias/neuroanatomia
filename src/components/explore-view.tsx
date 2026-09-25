'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, ChevronLeft, ChevronRight, GraduationCap, HeartPulse, Route, Sparkles, Target, Zap, Brain } from 'lucide-react'
import { TOPICS, getTopic, type Structure, type TopicId } from '@/lib/anatomy-data'
import { LimbicDiagram, LobesDiagram, SulciGyriDiagram } from '@/components/brain-diagrams'

const TOPIC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  Brain,
  Route,
}

function DiagramForTopic({
  topic,
  selectedId,
  onSelect,
}: {
  topic: TopicId
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  if (topic === 'limbico') return <LimbicDiagram selectedId={selectedId} onSelect={onSelect} />
  if (topic === 'lobulos') return <LobesDiagram selectedId={selectedId} onSelect={onSelect} />
  return <SulciGyriDiagram selectedId={selectedId} onSelect={onSelect} />
}

function DetailPanel({
  structure,
  studied,
  onPrev,
  onNext,
  index,
  total,
}: {
  structure: Structure
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
          <Badge
            className="shrink-0 border-0 text-white"
            style={{ backgroundColor: structure.color }}
          >
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

            <section
              aria-label="Para el examen"
              className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5"
            >
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

export function ExploreView({
  topicId,
  onTopicChange,
  selectedId,
  onStructureSelect,
  studiedIds,
}: {
  topicId: TopicId
  onTopicChange: (t: TopicId) => void
  selectedId: string | null
  onStructureSelect: (id: string | null) => void
  studiedIds: Set<string>
}) {
  const topic = getTopic(topicId)
  const structure = useMemo(
    () => topic.structures.find((s) => s.id === selectedId),
    [topic, selectedId]
  )
  const idx = structure ? topic.structures.findIndex((s) => s.id === structure.id) : -1

  const goPrev = () => {
    if (idx > 0) onStructureSelect(topic.structures[idx - 1].id)
    else onStructureSelect(topic.structures[topic.structures.length - 1].id)
  }
  const goNext = () => {
    if (idx < topic.structures.length - 1) onStructureSelect(topic.structures[idx + 1].id)
    else onStructureSelect(topic.structures[0].id)
  }

  return (
    <div className="space-y-5">
      {/* Selector de tema */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {TOPICS.map((t) => {
          const Icon = TOPIC_ICONS[t.icon] ?? Brain
          const active = t.id === topicId
          const studiedCount = t.structures.filter((s) => studiedIds.has(s.id)).length
          return (
            <button
              key={t.id}
              onClick={() => onTopicChange(t.id)}
              aria-pressed={active}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                active
                  ? 'border-fuchsia-500/70 bg-fuchsia-500/10 shadow-[0_0_24px_rgba(217,70,239,0.15)]'
                  : 'border-border bg-card/60 hover:border-fuchsia-500/40 hover:bg-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    active ? 'bg-fuchsia-500 text-white' : 'bg-muted text-muted-foreground group-hover:text-fuchsia-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className={`truncate text-sm font-bold sm:text-base ${active ? 'text-fuchsia-300' : 'text-foreground'}`}>
                    {t.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{t.subtitle}</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${(studiedCount / t.structures.length) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {studiedCount}/{t.structures.length} estudiadas
              </p>
            </button>
          )
        })}
      </div>

      {/* Descripción del tema */}
      <p className="text-center text-sm text-muted-foreground">{topic.description}</p>

      {/* Diagrama + panel */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
        <Card className="overflow-hidden border-border bg-card/70 lg:col-span-3">
          <CardContent className="p-3 sm:p-4">
            <DiagramForTopic key={topicId} topic={topicId} selectedId={selectedId} onSelect={onStructureSelect} />
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
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-500/15">
                  <Target className="h-7 w-7 text-fuchsia-400" />
                </div>
                <p className="text-base font-semibold text-foreground">Toca una estructura del cerebro</p>
                <p className="max-w-[280px] text-sm text-muted-foreground">
                  Selecciona cualquier zona del diagrama (o una tarjeta de abajo) y aquí aparecerán su función,
                  características y el dato clave para tu examen.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Lista de estructuras del tema */}
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
                onClick={() => onStructureSelect(s.id)}
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
