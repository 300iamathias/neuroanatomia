'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import {
  Brain,
  CheckCircle2,
  Trophy,
  XCircle,
  RotateCcw,
  Play,
  Medal,
} from 'lucide-react'
import { QUESTIONS, type QuizQuestion, type TopicId } from '@/lib/anatomy-data'
import { EXTRA_QUESTIONS } from '@/lib/neuro-extra-data'
import { recordQuiz } from '@/lib/gamification'
import { confettiBurst, confettiParty } from '@/lib/confetti'

const QUESTIONS_PER_EXAM = 10
const ALL_QUESTIONS: QuizQuestion[] = [...QUESTIONS, ...(EXTRA_QUESTIONS as unknown as QuizQuestion[])]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Phase = 'inicio' | 'pregunta' | 'resultado'

export function QuizView() {
  const [phase, setPhase] = useState<Phase>('inicio')
  const [filter, setFilter] = useState<TopicId | 'todos' | 'extras'>('todos')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([]) // respuesta elegida por pregunta
  const [chosen, setChosen] = useState<number | null>(null)
  const [best, setBest] = useState<number | null>(null)

  const score = useMemo(
    () => answers.reduce((acc, a, i) => (a === questions[i]?.correct ? acc + 1 : acc), 0),
    [answers, questions]
  )

  const startExam = (topicFilter: TopicId | 'todos' | 'extras') => {
    const pool =
      topicFilter === 'todos'
        ? ALL_QUESTIONS
        : topicFilter === 'extras'
          ? (EXTRA_QUESTIONS as unknown as QuizQuestion[])
          : QUESTIONS.filter((q) => q.topic === topicFilter)
    setFilter(topicFilter)
    setQuestions(shuffle(pool).slice(0, QUESTIONS_PER_EXAM))
    setAnswers([])
    setCurrent(0)
    setChosen(null)
    setPhase('pregunta')
  }

  const pick = (i: number) => {
    if (chosen !== null) return
    setChosen(i)
    setAnswers((prev) => {
      const next = [...prev]
      next[current] = i
      return next
    })
  }

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      const finalScore = answers.reduce(
        (acc, a, i) => (a === questions[i]?.correct ? acc + 1 : acc),
        0
      )
      const pct = Math.round((finalScore / questions.length) * 100)
      setBest((b) => (b === null ? pct : Math.max(b, pct)))
      try {
        const prevBest = Number(localStorage.getItem('neuroatlas-best') ?? '0')
        localStorage.setItem('neuroatlas-best', String(Math.max(prevBest, pct)))
      } catch {}
      // ── Gamificación: XP, logros y confetti ──
      recordQuiz(finalScore, questions.length)
      if (finalScore === questions.length && questions.length >= 10) confettiParty()
      else if (pct >= 70) confettiBurst()
      setPhase('resultado')
    } else {
      setCurrent((c) => c + 1)
      setChosen(null)
    }
  }

  const gradeMessage = (pct: number) => {
    if (pct >= 90)
      return { text: '¡Impecable! Tu hipocampo está en modo leyenda. 🌟', color: 'text-emerald-400' }
    if (pct >= 70)
      return { text: '¡Muy bien! Repasa las que fallaste y quedas listo. 💪', color: 'text-amber-400' }
    if (pct >= 50)
      return { text: 'Vas bien, pero dale otra vuelta al atlas antes del examen. 📖', color: 'text-orange-400' }
    return { text: 'Tranquilo: vuelve al modo Explorar y toca todas las estructuras. 🧠', color: 'text-rose-400' }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* ─── INICIO ─── */}
      {phase === 'inicio' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-border bg-card/70">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-fuchsia-500/15">
                <Brain className="h-9 w-9 text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-foreground sm:text-2xl">Simulador de examen</h3>
                <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                  {QUESTIONS_PER_EXAM} preguntas al azar, con explicación inmediata de cada respuesta. Igualito al
                  examen de verdad (pero sin nervios).
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={() => startExam('todos')} className="bg-fuchsia-600 text-white hover:bg-fuchsia-500">
                  <Play className="h-4 w-4" /> Examen completo
                </Button>
                <Button variant="outline" onClick={() => startExam('extras')}>
                  Temas del práctico ✨
                </Button>
                <Button variant="outline" onClick={() => startExam('limbico')}>
                  Solo sistema límbico
                </Button>
                <Button variant="outline" onClick={() => startExam('lobulos')}>
                  Solo lóbulos
                </Button>
                <Button variant="outline" onClick={() => startExam('surcos')}>
                  Solo surcos y giros
                </Button>
              </div>
              {best !== null && (
                <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                  <Medal className="h-4 w-4" /> Tu mejor puntaje: {best}%
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ─── PREGUNTA ─── */}
      {phase === 'pregunta' && questions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Progress value={((current + 1) / questions.length) * 100} className="h-2.5 flex-1" />
            <span className="shrink-0 text-sm font-semibold text-muted-foreground">
              {current + 1}/{questions.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.22 }}
            >
              <Card className="border-border bg-card/70">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold leading-snug text-foreground sm:text-xl">
                    {questions[current].question}
                  </h3>
                  <div className="mt-4 grid gap-2.5">
                    {questions[current].options.map((opt, i) => {
                      const isCorrect = i === questions[current].correct
                      const isChosen = chosen === i
                      let cls =
                        'border-border bg-card hover:border-fuchsia-400/60 hover:bg-fuchsia-500/10 text-left'
                      if (chosen !== null) {
                        if (isCorrect)
                          cls = 'border-emerald-500 bg-emerald-500/15 text-left'
                        else if (isChosen)
                          cls = 'border-rose-500 bg-rose-500/15 text-left'
                        else cls = 'border-border bg-card/40 text-left opacity-60'
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => pick(i)}
                          disabled={chosen !== null}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all sm:text-[15px] ${cls}`}
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-foreground">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {chosen !== null && isCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />}
                          {chosen !== null && isChosen && !isCorrect && <XCircle className="h-5 w-5 shrink-0 text-rose-500" />}
                        </button>
                      )
                    })}
                  </div>

                  {chosen !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5"
                    >
                      <p className="text-sm font-bold uppercase tracking-wide text-amber-400">
                        {chosen === questions[current].correct ? '¡Correcto! 🎉' : 'Casi… la respuesta correcta es la ' + String.fromCharCode(65 + questions[current].correct)}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                        {questions[current].explanation}
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end">
            <Button
              onClick={nextQuestion}
              disabled={chosen === null}
              className="bg-fuchsia-600 text-white hover:bg-fuchsia-500"
            >
              {current + 1 >= questions.length ? 'Ver resultado' : 'Siguiente pregunta'}
            </Button>
          </div>
        </div>
      )}

      {/* ─── RESULTADO ─── */}
      {phase === 'resultado' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-border bg-card/70">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/15">
                <Trophy className="h-10 w-10 text-amber-400" />
              </div>
              <div>
                <p className="text-5xl font-extrabold text-foreground">
                  {score}
                  <span className="text-2xl text-muted-foreground">/{questions.length}</span>
                </p>
                <p className={`mt-2 text-base font-semibold ${gradeMessage(Math.round((score / questions.length) * 100)).color}`}>
                  {gradeMessage(Math.round((score / questions.length) * 100)).text}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {Math.round((score / questions.length) * 100)}% de acierto ·{' '}
                  {filter === 'todos'
                    ? 'examen completo'
                    : filter === 'extras'
                      ? 'temas del práctico (unidades 1-2)'
                      : 'tema: ' + filter}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={() => startExam(filter)} className="bg-fuchsia-600 text-white hover:bg-fuchsia-500">
                  <RotateCcw className="h-4 w-4" /> Intentar de nuevo
                </Button>
                <Button variant="outline" onClick={() => setPhase('inicio')}>
                  Cambiar de tema
                </Button>
              </div>
              {best !== null && (
                <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                  <Medal className="h-4 w-4" /> Mejor puntaje registrado: {best}%
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
