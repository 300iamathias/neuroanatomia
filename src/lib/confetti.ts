'use client'

import confetti from 'canvas-confetti'

const COLORS = ['#d946ef', '#a855f7', '#fbbf24', '#34d399', '#f472b6']

/** Disparo corto (aprobado, hitos menores). */
export function confettiBurst() {
  try {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: COLORS,
      disableForReducedMotion: true,
    })
  } catch {
    /* ignore */
  }
}

/** Fiesta completa (nota perfecta, cerebro completo, subida de nivel grande). */
export function confettiParty() {
  try {
    const end = Date.now() + 1400
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: COLORS, disableForReducedMotion: true })
      confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: COLORS, disableForReducedMotion: true })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
    confetti({ particleCount: 140, spread: 100, origin: { y: 0.6 }, colors: COLORS, disableForReducedMotion: true })
  } catch {
    /* ignore */
  }
}
