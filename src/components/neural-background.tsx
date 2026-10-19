'use client'

import { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════
//  Fondo animado de neuronas y sinapsis.
//  Partículas que derivan lentamente y se conectan con líneas
//  luminosas (como dendritas). Respeta prefers-reduced-motion.
// ═══════════════════════════════════════════════════════════════

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number }

const PALETTE = ['217,70,239', '139,92,246', '251,191,36'] // fucsia · violeta · ámbar

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let nodes: Node[] = []
    let w = 0
    let h = 0
    const mouse = { x: -9999, y: -9999 }
    const LINK_DIST = 130

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.max(28, Math.round((w * h) / 26000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.8,
        hue: Math.floor(Math.random() * PALETTE.length),
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // conexiones (sinapsis)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.16
            ctx.strokeStyle = `rgba(${PALETTE[a.hue]},${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // neuronas
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${PALETTE[n.hue]},0.55)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
        // halo suave
        ctx.fillStyle = `rgba(${PALETTE[n.hue]},0.07)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        // leve atracción hacia el cursor (como si "pensara" contigo)
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d2 = dx * dx + dy * dy
        if (d2 < 160 * 160 && d2 > 1) {
          n.x += dx * 0.0016
          n.y += dy * 0.0016
        }
        if (n.x < -20) n.x = w + 20
        if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        if (n.y > h + 20) n.y = -20
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    build()
    if (reduced) {
      draw() // una sola imagen estática
    } else {
      raf = requestAnimationFrame(step)
      window.addEventListener('mousemove', onMouse, { passive: true })
      window.addEventListener('mouseout', onLeave)
    }
    window.addEventListener('resize', build)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-70"
    />
  )
}
