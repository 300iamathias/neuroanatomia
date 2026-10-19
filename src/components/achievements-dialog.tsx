'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  CalendarDays,
  Crown,
  Flame,
  Medal,
  Share2,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
  Waypoints,
  Zap,
} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ACHIEVEMENTS, getUnlockedIds, type Achievement } from '@/lib/gamification'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  zap: Zap,
  waypoints: Waypoints,
  brain: Brain,
  crown: Crown,
  flame: Flame,
  calendar: CalendarDays,
  medal: Medal,
  target: Target,
  stethoscope: Stethoscope,
  trophy: Trophy,
  share: Share2,
}

const TONES: Record<Achievement['tone'], string> = {
  fuchsia: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  violet: 'bg-violet-500/15 text-violet-300 border-violet-500/40',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
}

export function AchievementsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  // Se lee localStorage solo cuando el diálogo se abre (estado derivado, sin effects)
  const unlocked = useMemo(() => (open ? new Set(getUnlockedIds()) : new Set<string>()), [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-border bg-card/95 backdrop-blur-xl nice-scrollbar sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-extrabold">
            <Trophy className="h-5 w-5 text-amber-400" /> Tus logros
            <span className="ml-auto rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              {unlocked.size}/{ACHIEVEMENTS.length}
            </span>
          </DialogTitle>
          <DialogDescription>
            Cada estructura estudiada, examen y racha suma. ¡Desbloquéalos todos!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = ICONS[a.icon] ?? Sparkles
            const isUnlocked = unlocked.has(a.id)
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                  isUnlocked ? TONES[a.tone] : 'border-white/5 bg-white/[0.02] opacity-45 grayscale'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isUnlocked ? TONES[a.tone] : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-foreground">{a.name}</span>
                  <span className="block text-xs leading-snug text-muted-foreground">{a.desc}</span>
                </span>
              </motion.div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
