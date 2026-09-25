'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, ChevronLeft, ChevronRight, RotateCw, Layers } from 'lucide-react'
import { TOPICS, getTopic, type TopicId } from '@/lib/anatomy-data'

interface CardItem {
  topicId: TopicId
  topicTitle: string
  id: string
  name: string
  latin: string
  category: string
  color: string
  short: string
  examTip: string
}

function buildDeck(topicId: TopicId | 'todos'): CardItem[] {
  const topics = topicId === 'todos' ? TOPICS : [getTopic(topicId)]
  return topics.flatMap((t) =>
    t.structures.map((s) => ({
      topicId: t.id,
      topicTitle: t.title,
      id: s.id,
      name: s.name,
      latin: s.latin,
      category: s.category,
      color: s.color,
      short: s.short,
      examTip: s.examTip,
    }))
  )
}

export function FlashcardsView({ onStudied }: { onStudied: (id: string) => void }) {
  const [deckId, setDeckId] = useState<TopicId | 'todos'>('todos')

  return (
    <div className="space-y-4">
      {/* Selector de mazo */}
      <div className="flex flex-wrap justify-center gap-2">
        {(['todos', 'limbico', 'lobulos', 'surcos'] as const).map((id) => {
          const active = id === deckId
          const label = id === 'todos' ? '🎲 Todos' : getTopic(id).title
          return (
            <Button
              key={id}
              size="sm"
              variant={active ? 'default' : 'outline'}
              onClick={() => setDeckId(id)}
              className={active ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-500' : ''}
            >
              {label}
            </Button>
          )
        })}
      </div>

      {/* El mazo se reinicia (estado incluido) al cambiar la selección */}
      <FlashcardsDeck key={deckId} deckId={deckId} onStudied={onStudied} />
    </div>
  )
}

function FlashcardsDeck({
  deckId,
  onStudied,
}: {
  deckId: TopicId | 'todos'
  onStudied: (id: string) => void
}) {
  const deck = useMemo(() => buildDeck(deckId), [deckId])
  const [order, setOrder] = useState<number[]>(() => deck.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const shuffle = () => {
    const arr = deck.map((_, i) => i)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setOrder(arr)
    setPos(0)
    setFlipped(false)
  }

  const current = deck[order[pos % order.length]] ?? deck[0]
  if (!current) return null

  const next = () => {
    setFlipped(false)
    setPos((p) => (p + 1) % order.length)
  }
  const prev = () => {
    setFlipped(false)
    setPos((p) => (p - 1 + order.length) % order.length)
  }
  const flip = () => {
    setFlipped((f) => {
      if (!f) onStudied(current.id)
      return !f
    })
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex justify-center">
        <Button size="sm" variant="outline" onClick={shuffle} aria-label="Barajar tarjetas">
          <Shuffle className="h-4 w-4" /> Barajar
        </Button>
      </div>

      {/* Tarjeta */}
      <div style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-${pos}`}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={flip}
              aria-label={flipped ? 'Ver pregunta' : 'Ver respuesta'}
              className="relative block h-[340px] w-full cursor-pointer text-left sm:h-[300px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              {/* Cara frontal */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-gradient-to-br from-card to-card/60 p-6 shadow-xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Badge className="border-0 text-white" style={{ backgroundColor: current.color }}>
                  {current.category} · {current.topicTitle}
                </Badge>
                <h3 className="text-center text-2xl font-extrabold text-foreground sm:text-3xl">{current.name}</h3>
                <p className="text-sm italic text-muted-foreground">{current.latin}</p>
                <p className="mt-4 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-fuchsia-400">
                  <RotateCw className="h-3.5 w-3.5" /> Toca para ver la respuesta
                </p>
              </div>

              {/* Cara trasera */}
              <div
                className="absolute inset-0 flex flex-col justify-center gap-3 overflow-y-auto rounded-3xl border border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-950/60 to-purple-950/40 p-6 shadow-xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <h4 className="text-sm font-bold uppercase tracking-wide text-fuchsia-300">{current.name}</h4>
                <p className="text-[15px] leading-relaxed text-foreground/95">{current.short}</p>
                <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-400">🎓 Para el examen</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/90">{current.examTip}</p>
                </div>
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={prev} aria-label="Tarjeta anterior">
          <ChevronLeft className="h-4 w-4" /> Anterior
        </Button>
        <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <Layers className="h-4 w-4" /> {(pos % order.length) + 1} / {order.length}
        </p>
        <Button
          size="sm"
          onClick={next}
          className="bg-fuchsia-600 text-white hover:bg-fuchsia-500"
          aria-label="Tarjeta siguiente"
        >
          Siguiente <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Consejo: intenta responder en voz alta antes de voltear la tarjeta. Así tu hipocampo consolida mejor 🧠
      </p>
    </div>
  )
}
