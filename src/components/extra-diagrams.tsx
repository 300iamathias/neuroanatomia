'use client'

import type { ReactNode } from 'react'
import type { ExtraTopicId } from '@/lib/neuro-extra-data'

// ════════════════════════════════════════════════════════════
//  Diagramas SVG interactivos · Temas del examen práctico
//  Cada diagrama soporta modo EXAMEN (pins numerados 1-5,
//  sin nombres visibles) para el simulador práctico.
// ════════════════════════════════════════════════════════════

export interface ExtraDiagramProps {
  selectedId: string | null
  onSelect: (id: string) => void
  examMode?: boolean
}

export interface ExamPin {
  id: string
  x: number
  y: number
}

/** Pines numerados del simulador (5 estructuras por tema) */
export const EXAM_PINS: Record<ExtraTopicId, ExamPin[]> = {
  division: [
    { id: 'snc', x: 200, y: 205 },
    { id: 'snp', x: 560, y: 205 },
    { id: 'medula', x: 295, y: 330 },
    { id: 'autonomo', x: 665, y: 330 },
    { id: 'parasimpatico', x: 585, y: 515 },
  ],
  meninges: [
    { id: 'duramadre', x: 640, y: 165 },
    { id: 'aracnoides', x: 640, y: 210 },
    { id: 'subaracnoideo', x: 640, y: 255 },
    { id: 'piamadre', x: 640, y: 299 },
    { id: 'granulaciones', x: 380, y: 160 },
  ],
  planos: [
    { id: 'terminos', x: 300, y: 155 },
    { id: 'sagital', x: 100, y: 395 },
    { id: 'coronal', x: 283, y: 395 },
    { id: 'horizontal', x: 466, y: 395 },
    { id: 'imagen', x: 649, y: 395 },
  ],
  areas: [
    { id: 'm1', x: 464, y: 205 },
    { id: 's1', x: 497, y: 212 },
    { id: 'broca', x: 262, y: 375 },
    { id: 'wernicke', x: 472, y: 385 },
    { id: 'v1', x: 620, y: 255 },
  ],
  ventriculos: [
    { id: 'laterales', x: 260, y: 122 },
    { id: 'plexos', x: 350, y: 150 },
    { id: 'tercero', x: 450, y: 265 },
    { id: 'acueducto', x: 450, y: 350 },
    { id: 'cuarto', x: 450, y: 440 },
  ],
  tallo: [
    { id: 'mesencefalo', x: 382, y: 180 },
    { id: 'protuberancia', x: 385, y: 290 },
    { id: 'bulbo', x: 395, y: 400 },
    { id: 'reticular', x: 388, y: 345 },
    { id: 'pares', x: 314, y: 251 },
  ],
}

interface RegionProps {
  id: string
  name: string
  active: boolean
  onSelect: (id: string) => void
  children: ReactNode
}

/** Región interactiva (click + teclado + hover) */
export function Region({ id, name, active, onSelect, children }: RegionProps) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={name}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(id)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(id)
        }
      }}
      onMouseEnter={(e) => e.currentTarget.setAttribute('filter', 'brightness(1.22) drop-shadow(0 0 6px rgba(255,255,255,0.45))')}
      onMouseLeave={(e) => e.currentTarget.removeAttribute('filter')}
      className="cursor-pointer outline-none transition-[filter] duration-150"
      style={active ? { filter: 'brightness(1.22) drop-shadow(0 0 8px rgba(255,255,255,0.55))' } : undefined}
    >
      <title>{name}</title>
      {children}
    </g>
  )
}

/** Etiqueta con línea guía (se oculta en modo examen) */
function Label({
  text,
  x,
  y,
  tx,
  ty,
  color = '#ffffff',
  small = false,
  hide = false,
}: {
  text: string
  x: number
  y: number
  tx: number
  ty: number
  color?: string
  small?: boolean
  hide?: boolean
}) {
  if (hide) return null
  return (
    <g pointerEvents="none">
      <line x1={x} y1={y} x2={tx} y2={ty} stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeDasharray="2 2" />
      <circle cx={x} cy={y} r="3.2" fill={color} stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      <text
        x={tx}
        y={ty}
        fontSize={small ? 11 : 13}
        fontWeight={700}
        fill={color}
        textAnchor="middle"
        stroke="#1c1917"
        strokeWidth={3.5}
        strokeLinejoin="round"
        style={{ paintOrder: 'stroke' }}
      >
        {text}
      </text>
    </g>
  )
}

/** Texto plano legible (se oculta en modo examen) */
function PlainText({
  text,
  x,
  y,
  size = 14,
  fill = '#ffffff',
  weight = 700,
  hide = false,
}: {
  text: string
  x: number
  y: number
  size?: number
  fill?: string
  weight?: number
  hide?: boolean
}) {
  if (hide) return null
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor="middle"
      stroke="rgba(0,0,0,0.65)"
      strokeWidth={3}
      strokeLinejoin="round"
      style={{ paintOrder: 'stroke' }}
      pointerEvents="none"
    >
      {text}
    </text>
  )
}

function Backdrop() {
  return <rect x="0" y="0" width="760" height="560" rx="18" fill="url(#extraGrad)" />
}

function ExtraDefs() {
  return (
    <defs>
      <radialGradient id="extraGrad" cx="50%" cy="35%" r="85%">
        <stop offset="0%" stopColor="#2a2432" />
        <stop offset="100%" stopColor="#17141d" />
      </radialGradient>
      <clipPath id="extraCerebrum">
        <ellipse cx="378" cy="248" rx="282" ry="172" transform="rotate(-8 378 248)" />
        <ellipse cx="398" cy="392" rx="163" ry="66" transform="rotate(-4 398 392)" />
        <ellipse cx="552" cy="330" rx="130" ry="102" transform="rotate(-15 552 330)" />
        <ellipse cx="618" cy="372" rx="78" ry="78" transform="rotate(-10 618 372)" />
      </clipPath>
      <marker id="extraArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
      </marker>
    </defs>
  )
}

/** Pin numerado para el modo examen */
export function Pin({
  n,
  x,
  y,
  state,
}: {
  n: number
  x: number
  y: number
  state: 'pendiente' | 'actual' | 'acertada' | 'revelada'
}) {
  const fill =
    state === 'actual' ? '#f59e0b' : state === 'acertada' ? '#10b981' : state === 'revelada' ? '#f43f5e' : '#26212e'
  return (
    <g pointerEvents="none" style={{ transform: 'translate(0,0)' }}>
      <circle cx={x} cy={y} r="14" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.65">
        <animate attributeName="r" values="14;24;14" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.65;0;0.65" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r="14" fill={fill} stroke="#ffffff" strokeWidth="2.2" />
      <text
        x={x}
        y={y + 5}
        fontSize="14"
        fontWeight={800}
        fill={state === 'pendiente' ? '#ffffff' : '#1c1917'}
        textAnchor="middle"
        style={{ paintOrder: 'stroke' }}
      >
        {n}
      </text>
    </g>
  )
}

// ═══════════ 1 · DIVISIÓN DEL SISTEMA NERVIOSO ═══════════
export function DivisionDiagram({ selectedId, onSelect, examMode }: ExtraDiagramProps) {
  const node = (
    id: string,
    cx: number,
    cy: number,
    w: number,
    h: number,
    fill: string,
    title: string,
    sub?: string
  ) => (
    <Region id={id} name={title} active={selectedId === id} onSelect={onSelect}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="14" fill={examMode ? '#453e52' : fill} stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      {!examMode && (
        <>
          <text x={cx} y={sub ? cy - 2 : cy + 5} textAnchor="middle" fontSize="13.5" fontWeight={800} fill="#ffffff">
            {title}
          </text>
          {sub && (
            <text x={cx} y={cy + 15} textAnchor="middle" fontSize="10" fontWeight={600} fill="rgba(255,255,255,0.75)">
              {sub}
            </text>
          )}
        </>
      )}
      {examMode && (
        <text x={cx} y={cy + 6} textAnchor="middle" fontSize="16" fontWeight={800} fill="rgba(255,255,255,0.5)">
          ?
        </text>
      )}
    </Region>
  )

  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full" role="img" aria-label="Esquema de la división del sistema nervioso">
      <ExtraDefs />
      <Backdrop />
      {/* líneas de conexión */}
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" fill="none" pointerEvents="none">
        <path d="M 380 113 L 380 150 M 380 150 L 200 150 L 200 177 M 380 150 L 560 150 L 560 177" />
        <path d="M 200 233 L 200 265 L 115 265 L 115 299 M 200 265 L 295 265 L 295 299" />
        <path d="M 560 233 L 560 265 L 480 265 L 480 299 M 560 265 L 665 265 L 665 299" />
        <path d="M 665 358 L 665 400 L 585 400 L 585 419 M 585 400 L 585 489" />
      </g>
      {node('raiz', 380, 85, 230, 56, '#8b5cf6', 'SISTEMA NERVIOSO', 'el gran director')}
      {node('snc', 200, 205, 190, 56, '#7c3aed', 'Sistema Nervioso Central', 'encéfalo + médula · integra y decide')}
      {node('snp', 560, 205, 190, 56, '#059669', 'Sistema Nervioso Periférico', 'nervios y ganglios · comunica')}
      {node('encefalo', 115, 330, 150, 62, '#c026d3', 'Encéfalo', 'cerebro, cerebelo y tronco')}
      {node('medula', 295, 330, 150, 62, '#db2777', 'Médula Espinal', '31 pares · reflejos')}
      {node('somatico', 480, 330, 150, 62, '#d97706', 'Somático', 'voluntario · 1 neurona')}
      {node('autonomo', 665, 330, 150, 62, '#0d9488', 'Autónomo', 'involuntario · 2 neuronas')}
      {node('simpatico', 585, 445, 150, 52, '#dc2626', 'Simpático', 'lucha o huida · T1-L2')}
      {node('parasimpatico', 585, 515, 150, 52, '#16a34a', 'Parasimpático', 'descanso y digestión')}
      <PlainText text="SNC: protegido por cráneo, columna, meninges y LCR" x={185} y={455} size={11} fill="rgba(255,255,255,0.55)" weight={600} hide={examMode} />
      <PlainText text="SNP: 12 pares craneales + 31 pares espinales" x={185} y={478} size={11} fill="rgba(255,255,255,0.55)" weight={600} hide={examMode} />
    </svg>
  )
}

// ═══════════════════════ 2 · MENINGES ═══════════════════════
export function MeningesDiagram({ selectedId, onSelect, examMode }: ExtraDiagramProps) {
  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full" role="img" aria-label="Corte de las meninges">
      <ExtraDefs />
      <Backdrop />

      {/* piel y cráneo (decorativo) */}
      <rect x="40" y="52" width="680" height="30" rx="6" fill="#5a4a44" opacity="0.85" />
      <rect x="40" y="82" width="680" height="45" rx="6" fill="#8a8a95" opacity="0.8" />
      <g stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" pointerEvents="none">
        <line x1="80" y1="82" x2="120" y2="127" />
        <line x1="160" y1="82" x2="200" y2="127" />
        <line x1="240" y1="82" x2="280" y2="127" />
        <line x1="480" y1="82" x2="520" y2="127" />
        <line x1="560" y1="82" x2="600" y2="127" />
      </g>
      <PlainText text="Piel y cráneo" x={130} y={107} size={11} fill="rgba(255,255,255,0.75)" hide={examMode} />

      {/* duramadre */}
      <Region id="duramadre" name="Duramadre" active={selectedId === 'duramadre'} onSelect={onSelect}>
        <rect x="40" y="132" width="680" height="62" fill="#f97316" opacity="0.42" />
        <line x1="40" y1="132" x2="720" y2="132" stroke="#f97316" strokeWidth="2.5" />
        <line x1="40" y1="194" x2="720" y2="194" stroke="#f97316" strokeWidth="2.5" />
      </Region>

      {/* seno sagital superior (decorativo) */}
      <rect x="330" y="130" width="100" height="66" rx="16" fill="#8b1d3f" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <PlainText text="Seno sagital superior" x={380} y={190} size={10} fill="#fecdd3" hide={examMode} />

      {/* granulaciones aracnoideas */}
      <Region id="granulaciones" name="Granulaciones aracnoideas" active={selectedId === 'granulaciones'} onSelect={onSelect}>
        <path d="M 372 213 L 372 175 Q 372 152 380 152 Q 388 152 388 175 L 388 213 Z" fill="#eab308" opacity="0.85" />
        <ellipse cx="380" cy="158" rx="24" ry="13" fill="#eab308" opacity="0.9" />
      </Region>

      {/* aracnoides */}
      <Region id="aracnoides" name="Aracnoides" active={selectedId === 'aracnoides'} onSelect={onSelect}>
        <rect x="40" y="203" width="680" height="13" fill="#06b6d4" opacity="0.55" />
      </Region>

      {/* espacio subaracnoideo */}
      <Region id="subaracnoideo" name="Espacio subaracnoideo (LCR)" active={selectedId === 'subaracnoideo'} onSelect={onSelect}>
        <rect x="40" y="216" width="680" height="78" fill="#10b981" opacity="0.18" />
      </Region>
      {/* LCR + trabéculas (decorativo) */}
      <g pointerEvents="none">
        {[
          [90, 235], [150, 275], [220, 240], [290, 280], [455, 240], [520, 275], [590, 235], [660, 280],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4.5" fill="#34d399" opacity="0.75" />
        ))}
        <line x1="110" y1="220" x2="170" y2="290" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <line x1="250" y1="218" x2="300" y2="290" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <line x1="480" y1="220" x2="540" y2="290" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <PlainText text="LCR · líquido cefalorraquídeo" x={560} y={250} size={11} fill="#a7f3d0" hide={examMode} />
      </g>

      {/* piamadre */}
      <Region id="piamadre" name="Piamadre" active={selectedId === 'piamadre'} onSelect={onSelect}>
        <rect x="40" y="294" width="680" height="9" fill="#f43f5e" opacity="0.7" />
      </Region>

      {/* córtex con giros */}
      <Region id="cortex" name="Córtex cerebral (giros)" active={selectedId === 'cortex'} onSelect={onSelect}>
        <g fill="#3a3145">
          <rect x="40" y="315" width="680" height="215" />
          <circle cx="85" cy="318" r="26" />
          <circle cx="165" cy="322" r="24" />
          <circle cx="245" cy="316" r="27" />
          <circle cx="330" cy="322" r="23" />
          <circle cx="415" cy="317" r="26" />
          <circle cx="500" cy="322" r="24" />
          <circle cx="585" cy="316" r="27" />
          <circle cx="665" cy="322" r="24" />
        </g>
        <g stroke="rgba(0,0,0,0.45)" strokeWidth="3" fill="none" pointerEvents="none">
          <path d="M 125 340 Q 145 360 125 385" />
          <path d="M 290 345 Q 308 368 290 392" />
          <path d="M 455 340 Q 472 362 455 386" />
          <path d="M 620 345 Q 640 368 620 392" />
        </g>
      </Region>
      <PlainText text="Córtex cerebral (giros y surcos)" x={380} y={430} size={13} fill="rgba(255,255,255,0.6)" hide={examMode} />

      {/* etiquetas laterales */}
      <Label text="Duramadre" x={110} y={163} tx={110} ty={163} color="#fdba74" hide={examMode} />
      <Label text="Aracnoides" x={110} y={210} tx={110} ty={210} color="#67e8f9" hide={examMode} />
      <Label text="Espacio subaracnoideo" x={110} y={258} tx={110} ty={258} color="#6ee7b7" hide={examMode} />
      <Label text="Piamadre" x={110} y={299} tx={110} ty={299} color="#fda4af" hide={examMode} />
      <Label text="Granulaciones aracnoideas" x={380} y={158} tx={215} ty={132} color="#fde047" small hide={examMode} />
    </svg>
  )
}

// ═════════ 3 · CORTES Y PLANOS ANATÓMICOS ═════════
export function PlanosDiagram({ selectedId, onSelect, examMode }: ExtraDiagramProps) {
  const card = (
    id: string,
    cx: number,
    label: string,
    sub: string,
    mini: ReactNode
  ) => (
    <Region id={id} name={label} active={selectedId === id} onSelect={onSelect}>
      <rect x={cx - 85} y={340} width="170" height="182" rx="14" fill="rgba(255,255,255,0.05)" stroke={selectedId === id ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'} strokeWidth="1.5" />
      {mini}
      <text x={cx} y={486} textAnchor="middle" fontSize="13.5" fontWeight={800} fill="#ffffff">
        {label}
      </text>
      <text x={cx} y={506} textAnchor="middle" fontSize="10.5" fontWeight={600} fill="rgba(255,255,255,0.65)">
        {sub}
      </text>
    </Region>
  )

  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full" role="img" aria-label="Planos anatómicos del encéfalo">
      <ExtraDefs />
      <Backdrop />

      {/* encéfalo principal + términos de orientación */}
      <Region id="terminos" name="Términos de orientación" active={selectedId === 'terminos'} onSelect={onSelect}>
        <g fill="#3a3145" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
          <ellipse cx="300" cy="160" rx="150" ry="92" />
          <ellipse cx="352" cy="232" rx="72" ry="34" />
        </g>
        <ellipse cx="425" cy="238" rx="46" ry="30" fill="#4a3f56" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <rect x="322" y="252" width="26" height="52" rx="10" fill="#5a4f66" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <g stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" pointerEvents="none">
          <path d="M 185 148 L 138 148" markerEnd="url(#extraArrow)" stroke="#fda4af" />
          <path d="M 300 58 L 300 26" />
          <path d="M 300 258 L 300 296" />
        </g>
      </Region>
      <PlainText text="Anterior" x={105} y={140} size={12} fill="#fda4af" hide={examMode} />
      <PlainText text="Posterior" x={468} y={128} size={12} hide={examMode} />
      <PlainText text="Superior" x={345} y={38} size={12} hide={examMode} />
      <PlainText text="Inferior" x={345} y={312} size={12} hide={examMode} />
      <PlainText text="Toca el cerebro: vocabulario de orientación" x={300} y={205} size={12} fill="rgba(255,255,255,0.65)" hide={examMode} />

      {/* tarjeta sagital */}
      {card(
        'sagital',
        100,
        'Plano Sagital',
        'Derecha ↔ Izquierda',
        <g>
          <ellipse cx="100" cy="400" rx="56" ry="38" fill="#3a3145" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          <line x1="100" y1="358" x2="100" y2="442" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="6 4" />
        </g>
      )}

      {/* tarjeta coronal */}
      {card(
        'coronal',
        283,
        'Plano Coronal',
        'Anterior ↔ Posterior',
        <g>
          <ellipse cx="283" cy="400" rx="48" ry="44" fill="#3a3145" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          <line x1="283" y1="352" x2="283" y2="448" stroke="#d946ef" strokeWidth="3" strokeDasharray="6 4" />
        </g>
      )}

      {/* tarjeta horizontal */}
      {card(
        'horizontal',
        466,
        'Plano Horizontal',
        'Superior ↔ Inferior',
        <g>
          <ellipse cx="466" cy="400" rx="56" ry="38" fill="#3a3145" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          <line x1="406" y1="400" x2="526" y2="400" stroke="#14b8a6" strokeWidth="3" strokeDasharray="6 4" />
        </g>
      )}

      {/* tarjeta imagen clínica */}
      {card(
        'imagen',
        649,
        'RM / TAC',
        'Métodos de imagen',
        <g>
          <ellipse cx="649" cy="400" rx="56" ry="40" fill="#3a3145" stroke="#e5e7eb" strokeWidth="4" />
          <ellipse cx="633" cy="396" rx="16" ry="10" fill="#06b6d4" opacity="0.8" />
          <ellipse cx="668" cy="396" rx="16" ry="10" fill="#06b6d4" opacity="0.8" />
          <ellipse cx="650" cy="418" rx="20" ry="8" fill="#4a3f56" />
        </g>
      )}
    </svg>
  )
}

// ═══════ 4 · ÁREAS FUNCIONALES DE LA CORTEZA ═══════
export function AreasDiagram({ selectedId, onSelect, examMode }: ExtraDiagramProps) {
  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full" role="img" aria-label="Áreas funcionales de la corteza cerebral">
      <ExtraDefs />
      <Backdrop />

      {/* base del hemisferio */}
      <g clipPath="url(#extraCerebrum)">
        <rect x="60" y="50" width="700" height="430" fill="#3a3145" />
        {/* regiones */}
        <ellipse cx="195" cy="250" rx="105" ry="115" transform="rotate(-10 195 250)" fill="#a855f7" opacity="0.5" />
        <rect x="448" y="70" width="32" height="260" rx="16" transform="rotate(-8 464 200)" fill="#ef4444" opacity="0.72" />
        <rect x="482" y="70" width="30" height="260" rx="15" transform="rotate(-8 497 200)" fill="#f59e0b" opacity="0.68" />
        <ellipse cx="262" cy="375" rx="42" ry="36" fill="#ec4899" opacity="0.62" />
        <ellipse cx="472" cy="385" rx="54" ry="38" transform="rotate(-8 472 385)" fill="#d946ef" opacity="0.55" />
        <ellipse cx="390" cy="400" rx="46" ry="30" fill="#f97316" opacity="0.6" />
        <ellipse cx="622" cy="255" rx="70" ry="64" fill="#10b981" opacity="0.55" />
      </g>

      {/* surco central (Rolando) decorativo */}
      <line x1="481" y1="78" x2="502" y2="330" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="5 5" pointerEvents="none" />
      <PlainText text="Surco de Rolando" x={545} y={112} size={10.5} fill="rgba(255,255,255,0.7)" hide={examMode} />

      {/* cerebelo y tronco (decorativos) */}
      <g pointerEvents="none">
        <ellipse cx="556" cy="448" rx="88" ry="52" fill="#4a3f56" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M 480 445 Q 556 420 640 445" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
        <path d="M 485 465 Q 556 445 635 465" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
        <path d="M 420 420 L 452 500 Q 458 520 448 540 L 415 540 Q 405 505 408 465 Z" fill="#5a4f66" />
        <PlainText text="Cerebelo" x={556} y={490} size={11} fill="rgba(255,255,255,0.6)" />
        <PlainText text="Tronco" x={430} y={530} size={10.5} fill="rgba(255,255,255,0.6)" />
      </g>

      {/* etiquetas */}
      <Label text="Prefrontal" x={165} y={190} tx={140} ty={92} color="#d8b4fe" hide={examMode} />
      <Label text="Motora (4)" x={464} y={130} tx={430} ty={70} color="#fca5a5" hide={examMode} />
      <Label text="Somatosensorial (3-1-2)" x={497} y={150} tx={600} ty={82} color="#fcd34d" small hide={examMode} />
      <Label text="Broca" x={262} y={375} tx={215} ty={452} color="#f9a8d4" hide={examMode} />
      <Label text="Auditiva (41-42)" x={390} y={400} tx={330} ty={478} color="#fdba74" small hide={examMode} />
      <Label text="Wernicke" x={472} y={385} tx={480} ty={478} color="#f0abfc" hide={examMode} />
      <Label text="Visual (17)" x={622} y={255} tx={665} ty={180} color="#6ee7b7" hide={examMode} />
    </svg>
  )
}

// ═══════════ 5 · VENTRÍCULOS Y LCR ═══════════
export function VentriculosDiagram({ selectedId, onSelect, examMode }: ExtraDiagramProps) {
  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full" role="img" aria-label="Sistema ventricular">
      <ExtraDefs />
      <Backdrop />

      {/* contexto del encéfalo */}
      <g pointerEvents="none" opacity="0.5">
        <ellipse cx="370" cy="270" rx="300" ry="205" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        <ellipse cx="520" cy="430" rx="88" ry="55" fill="#4a3f56" opacity="0.6" />
        <PlainText text="Cerebelo" x={520} y={435} size={10.5} fill="rgba(255,255,255,0.55)" hide={examMode} />
      </g>

      {/* ventrículos laterales (forma de C) */}
      <Region id="laterales" name="Ventrículos laterales" active={selectedId === 'laterales'} onSelect={onSelect}>
        <path d="M 200 140 Q 240 105 320 120 Q 400 135 455 175 Q 490 200 480 235" fill="none" stroke="#06b6d4" strokeWidth="30" strokeLinecap="round" opacity="0.85" />
        <path d="M 480 235 L 558 258" fill="none" stroke="#06b6d4" strokeWidth="16" strokeLinecap="round" opacity="0.8" />
        <path d="M 480 235 Q 430 300 330 332" fill="none" stroke="#06b6d4" strokeWidth="20" strokeLinecap="round" opacity="0.8" />
      </Region>

      {/* plexo coroide */}
      <Region id="plexos" name="Plexos coroides" active={selectedId === 'plexos'} onSelect={onSelect}>
        <path d="M 232 128 Q 300 128 372 152 Q 415 166 448 188" fill="none" stroke="#f43f5e" strokeWidth="9" strokeLinecap="round" strokeDasharray="2 9" opacity="0.95" />
      </Region>

      {/* agujero de Monro (decorativo) */}
      <g pointerEvents="none">
        <line x1="402" y1="192" x2="442" y2="232" stroke="#10b981" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
      </g>

      {/* III ventrículo */}
      <Region id="tercero" name="Ventrículo III" active={selectedId === 'tercero'} onSelect={onSelect}>
        <ellipse cx="450" cy="265" rx="14" ry="44" fill="#10b981" opacity="0.9" />
      </Region>

      {/* acueducto de Silvio */}
      <Region id="acueducto" name="Acueducto de Silvio" active={selectedId === 'acueducto'} onSelect={onSelect}>
        <line x1="450" y1="309" x2="450" y2="392" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" opacity="0.95" />
      </Region>

      {/* IV ventrículo */}
      <Region id="cuarto" name="Ventrículo IV" active={selectedId === 'cuarto'} onSelect={onSelect}>
        <path d="M 450 395 L 496 440 L 450 482 L 404 440 Z" fill="#8b5cf6" opacity="0.9" />
      </Region>

      {/* salida del LCR (región circulación) */}
      <Region id="circulacion" name="Circulación del LCR" active={selectedId === 'circulacion'} onSelect={onSelect}>
        <g stroke="#f43f5e" strokeWidth="3" fill="none" strokeDasharray="5 4">
          <path d="M 450 482 L 450 522" markerEnd="url(#extraArrow)" />
          <path d="M 404 440 L 342 470" markerEnd="url(#extraArrow)" />
        </g>
        <text x="285" y="502" fontSize="12.5" fontWeight={700} fill="#fda4af" textAnchor="middle" stroke="#1c1917" strokeWidth={3} strokeLinejoin="round" style={{ paintOrder: 'stroke' }}>
          LCR → espacio subaracnoideo
        </text>
      </Region>

      {/* etiquetas */}
      <Label text="Ventrículos laterales (I y II)" x={235} y={118} tx={200} ty={82} color="#67e8f9" hide={examMode} />
      <Label text="Plexos coroides" x={310} y={132} tx={350} ty={98} color="#fda4af" small hide={examMode} />
      <Label text="Agujero de Monro" x={422} y={212} tx={350} ty={235} color="#a7f3d0" small hide={examMode} />
      <Label text="Ventrículo III" x={464} y={265} tx={560} ty={262} color="#6ee7b7" hide={examMode} />
      <Label text="Acueducto de Silvio" x={454} y={350} tx={565} ty={348} color="#fcd34d" hide={examMode} />
      <Label text="Ventrículo IV" x={470} y={442} tx={565} ty={448} color="#c4b5fd" hide={examMode} />
    </svg>
  )
}

// ═══════════ 6 · TALLO CEREBRAL ═══════════
export function TalloDiagram({ selectedId, onSelect, examMode }: ExtraDiagramProps) {
  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full" role="img" aria-label="Tallo cerebral">
      <ExtraDefs />
      <Backdrop />

      {/* contexto: córtex arriba */}
      <g pointerEvents="none" opacity="0.45">
        <ellipse cx="380" cy="88" rx="205" ry="68" fill="#332b3d" />
        <PlainText text="Córtex cerebral" x={380} y={70} size={11} fill="rgba(255,255,255,0.6)" hide={examMode} />
      </g>

      {/* mesencéfalo */}
      <Region id="mesencefalo" name="Mesencéfalo" active={selectedId === 'mesencefalo'} onSelect={onSelect}>
        <rect x="350" y="145" width="66" height="88" rx="12" fill="#ef4444" opacity="0.78" />
        <circle cx="418" cy="158" r="13" fill="#b91c1c" opacity="0.9" />
        <circle cx="418" cy="186" r="13" fill="#b91c1c" opacity="0.9" />
        <ellipse cx="376" cy="205" rx="17" ry="7" fill="#1c1917" opacity="0.85" />
      </Region>
      <PlainText text="Colículos sup./inf." x={455} y={176} size={9.5} fill="rgba(255,255,255,0.65)" hide={examMode} />
      <PlainText text="Sustancia negra" x={330} y={208} size={9.5} fill="rgba(255,255,255,0.65)" hide={examMode} />

      {/* protuberancia */}
      <Region id="protuberancia" name="Protuberancia (puente)" active={selectedId === 'protuberancia'} onSelect={onSelect}>
        <rect x="338" y="233" width="94" height="110" rx="28" fill="#f59e0b" opacity="0.75" />
      </Region>

      {/* bulbo */}
      <Region id="bulbo" name="Bulbo raquídeo" active={selectedId === 'bulbo'} onSelect={onSelect}>
        <path d="M 345 343 L 438 343 Q 448 395 426 448 Q 416 465 391 470 Q 368 464 358 446 Q 336 395 345 343 Z" fill="#10b981" opacity="0.72" />
      </Region>

      {/* médula espinal (decorativo) */}
      <g pointerEvents="none">
        <rect x="371" y="468" width="44" height="58" rx="8" fill="#4a3f56" />
        <PlainText text="Médula espinal" x={393} y={552} size={10.5} fill="rgba(255,255,255,0.6)" hide={examMode} />
      </g>

      {/* IV ventrículo (decorativo) */}
      <g pointerEvents="none">
        <path d="M 432 248 L 470 262 L 462 352 L 430 342 Z" fill="#22d3ee" opacity="0.3" />
        <PlainText text="IV ventr." x={490} y={268} size={9.5} fill="rgba(255,255,255,0.65)" hide={examMode} />
      </g>

      {/* cerebelo (decorativo) */}
      <g pointerEvents="none">
        <ellipse cx="575" cy="318" rx="72" ry="66" fill="#4a3f56" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M 515 300 Q 575 280 635 300" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
        <path d="M 512 325 Q 575 310 638 325" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
        <path d="M 518 350 Q 575 338 632 350" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
        <PlainText text="Cerebelo" x={575} y={322} size={11} fill="rgba(255,255,255,0.65)" hide={examMode} />
      </g>

      {/* formación reticular */}
      <Region id="reticular" name="Formación reticular (SARA)" active={selectedId === 'reticular'} onSelect={onSelect}>
        <ellipse cx="393" cy="295" rx="21" ry="168" fill="#d946ef" opacity="0.4" />
        {[
          [390, 175], [396, 215], [386, 255], [398, 295], [386, 335], [396, 375], [388, 415], [392, 448],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 8 : 6} fill="#f0abfc" opacity="0.85" />
        ))}
      </Region>

      {/* pares craneales */}
      <Region id="pares" name="Pares craneales" active={selectedId === 'pares'} onSelect={onSelect}>
        <g stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <line x1="352" y1="162" x2="298" y2="150" />
          <line x1="340" y1="258" x2="288" y2="248" />
          <line x1="340" y1="302" x2="288" y2="304" />
          <line x1="350" y1="382" x2="298" y2="384" />
          <line x1="362" y1="432" x2="302" y2="440" />
        </g>
        <g fill="#67e8f9">
          <circle cx="298" cy="150" r="4" />
          <circle cx="288" cy="248" r="4" />
          <circle cx="288" cy="304" r="4" />
          <circle cx="298" cy="384" r="4" />
          <circle cx="302" cy="440" r="4" />
        </g>
        <PlainText text="III-IV" x={272} y={144} size={10.5} fill="#67e8f9" hide={examMode} />
        <PlainText text="V" x={266} y={242} size={10.5} fill="#67e8f9" hide={examMode} />
        <PlainText text="VII-VIII" x={262} y={318} size={10.5} fill="#67e8f9" hide={examMode} />
        <PlainText text="IX-X" x={270} y={370} size={10.5} fill="#67e8f9" hide={examMode} />
        <PlainText text="XII" x={274} y={456} size={10.5} fill="#67e8f9" hide={examMode} />
      </Region>

      {/* etiquetas de los pisos */}
      <Label text="Mesencéfalo" x={416} y={175} tx={482} ty={148} color="#fca5a5" hide={examMode} />
      <Label text="Protuberancia" x={432} y={288} tx={510} ty={230} color="#fcd34d" hide={examMode} />
      <Label text="Bulbo raquídeo" x={438} y={415} tx={505} ty={432} color="#6ee7b7" hide={examMode} />
      <Label text="Formación reticular (SARA)" x={405} y={330} tx={255} ty={345} color="#f0abfc" small hide={examMode} />
    </svg>
  )
}

/** Mapa de diagramas por tema */
export const EXTRA_DIAGRAMS: Record<ExtraTopicId, (props: ExtraDiagramProps) => ReactNode> = {
  division: DivisionDiagram,
  meninges: MeningesDiagram,
  planos: PlanosDiagram,
  areas: AreasDiagram,
  ventriculos: VentriculosDiagram,
  tallo: TalloDiagram,
}
