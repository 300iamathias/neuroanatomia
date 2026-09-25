'use client'

import { useState, type ReactNode } from 'react'

// ════════════════════════════════════════════════════════════
//  Diagramas SVG interactivos del cerebro
//  - LimbicDiagram    → corte sagital (cara medial)
//  - LobesDiagram     → vista lateral con lóbulos
//  - SulciGyriDiagram → vista lateral con surcos y giros
// ════════════════════════════════════════════════════════════

export interface DiagramProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

interface RegionProps {
  id: string
  name: string
  active: boolean
  onSelect: (id: string) => void
  children: ReactNode
}

/** Región interactiva genérica (click + teclado + hover) */
function Region({ id, name, active, onSelect, children }: RegionProps) {
  const [hover, setHover] = useState(false)
  const glow = active || hover
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="cursor-pointer outline-none transition-[filter] duration-150 focus-visible:ring-2"
      style={{ filter: glow ? 'brightness(1.18) drop-shadow(0 0 7px rgba(255,255,255,0.5))' : undefined }}
    >
      <title>{name}</title>
      {children}
    </g>
  )
}

/** Etiqueta con línea guía y punto de anclaje */
function Label({
  text,
  x,
  y,
  tx,
  ty,
  color = '#ffffff',
  small = false,
}: {
  text: string
  x: number // punto de anclaje (sobre la estructura)
  y: number
  tx: number // posición del texto
  ty: number
  color?: string
  small?: boolean
}) {
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

/** Texto plano legible sobre el diagrama */
function PlainText({
  text,
  x,
  y,
  size = 14,
  fill = '#ffffff',
  weight = 700,
}: {
  text: string
  x: number
  y: number
  size?: number
  fill?: string
  weight?: number
}) {
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

/** Fondo decorativo con gradiente sutil */
function Backdrop() {
  return (
    <rect x="0" y="0" width="760" height="560" rx="18" fill="url(#neuroGrad)" />
  )
}

function Defs() {
  return (
    <defs>
      <radialGradient id="neuroGrad" cx="50%" cy="35%" r="85%">
        <stop offset="0%" stopColor="#2a2432" />
        <stop offset="100%" stopColor="#17141d" />
      </radialGradient>
      {/* recorte del hemisferio cerebral (vista lateral): elipse principal + lóbulo temporal + abultamiento occipital-baso */}
      <clipPath id="clipCerebrum">
        <ellipse cx="378" cy="248" rx="282" ry="172" transform="rotate(-8 378 248)" />
        <ellipse cx="398" cy="392" rx="163" ry="66" transform="rotate(-4 398 392)" />
        <ellipse cx="552" cy="330" rx="130" ry="102" transform="rotate(-15 552 330)" />
        <ellipse cx="618" cy="372" rx="78" ry="78" transform="rotate(-10 618 372)" />
      </clipPath>
    </defs>
  )
}

/** Cerebelo + tronco encefálico decorativos (detrás del hemisferio) */
function PosteriorStructures({
  cerebellumFill,
  stemFill,
  stemStroke,
  cellFill,
}: {
  cerebellumFill: string
  stemFill: string
  stemStroke: string
  cellFill: string
}) {
  return (
    <g>
      {/* Tronco encefálico (mesencéfalo → protuberancia → bulbo) */}
      <path
        d="M432,395 C436,440 430,475 442,505 C449,524 453,540 455,558 L490,558 C486,538 484,518 481,498 C477,468 483,436 478,405 C470,428 448,425 432,395 Z"
        fill={stemFill}
        stroke={stemStroke}
        strokeWidth="2"
      />
      {/* bulbo del puente (protuberancia) */}
      <ellipse cx="458" cy="488" rx="26" ry="20" fill={cellFill} opacity="0.5" />
      {/* Cerebelo */}
      <g>
        <ellipse cx="594" cy="450" rx="99" ry="59" transform="rotate(-9 594 450)" fill={cerebellumFill} stroke={stemStroke} strokeWidth="2" />
        <path d="M515,455 C545,442 585,436 625,442 C655,447 678,455 688,462" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2.5" />
        <path d="M522,472 C552,461 592,456 632,461 C660,465 680,472 690,478" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2.5" />
        <path d="M535,488 C562,479 598,474 636,478" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="2.5" />
      </g>
    </g>
  )
}

/* ════════════════════ DIAGRAMA · SISTEMA LÍMBICO (sagital) ════════════════════ */

export function LimbicDiagram({ selectedId, onSelect }: DiagramProps) {
  const is = (id: string) => selectedId === id
  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full select-none" role="img" aria-label="Diagrama sagital del sistema límbico">
      <Defs />
      <Backdrop />

      {/* Hemisferio cerebral (cara medial) */}
      <ellipse cx="378" cy="250" rx="286" ry="174" transform="rotate(-7 378 250)" fill="#857a8b" stroke="#a99fb0" strokeWidth="2.5" />
      {/* Pliegues decorativos de la corteza */}
      <g opacity="0.35" stroke="rgba(0,0,0,0.4)" strokeWidth="2" fill="none">
        <path d="M150,180 C190,150 230,140 262,150" />
        <path d="M130,260 C170,240 205,238 238,248" />
        <path d="M540,150 C570,170 586,196 590,224" />
        <path d="M560,300 C580,290 596,270 602,248" />
        <path d="M300,90 C330,104 352,120 362,138" />
      </g>

      {/* Tronco + cerebelo decorativos */}
      <g>
        <path
          d="M436,382 C438,425 432,455 444,488 C450,508 455,528 457,552 L492,552 C488,530 486,508 483,486 C479,455 486,420 481,388 C466,404 448,400 436,382 Z"
          fill="#b08a66"
          stroke="#cfa87e"
          strokeWidth="2"
        />
        <ellipse cx="594" cy="462" rx="100" ry="60" transform="rotate(-9 594 462)" fill="#6b6070" stroke="#8d8294" strokeWidth="2" />
        <path d="M515,468 C548,454 590,448 632,454 C660,458 680,466 690,473" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />
        <path d="M524,484 C556,474 596,469 638,473" fill="none" stroke="rgba(0,0,0,0.26)" strokeWidth="2.5" />
      </g>

      {/* ─── Estructuras límbicas ─── */}

      {/* Giro cingulado (arco sobre el cuerpo calloso) */}
      <Region id="giro-cingulado" name="Giro cingulado" active={is('giro-cingulado')} onSelect={onSelect}>
        <path d="M250,322 C230,198 312,110 410,106 C508,102 588,180 594,288" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="40" strokeLinecap="round" />
        <path
          d="M250,322 C230,198 312,110 410,106 C508,102 588,180 594,288"
          fill="none"
          strokeWidth="20"
          strokeLinecap="round"
          stroke={is('giro-cingulado') ? '#ffffff' : '#d946ef'}
        />
      </Region>

      {/* Cuerpo calloso (interactivo) */}
      <Region id="cuerpo-calloso" name="Cuerpo calloso" active={is('cuerpo-calloso')} onSelect={onSelect}>
        <path d="M268,302 C252,204 322,142 408,138 C494,134 560,192 568,262" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="38" strokeLinecap="round" />
        <path
          d="M268,302 C252,204 322,142 408,138 C494,134 560,192 568,262"
          fill="none"
          strokeWidth={is('cuerpo-calloso') ? 27 : 24}
          strokeLinecap="round"
          stroke={is('cuerpo-calloso') ? '#ffffff' : '#f3e9d8'}
        />
      </Region>
      <PlainText text="cuerpo calloso" x={600} y={228} size={10.5} fill="#5b4a3a" weight={600} />

      {/* Fórnix */}
      <Region id="fornix" name="Fórnix" active={is('fornix')} onSelect={onSelect}>
        <path d="M424,392 C452,352 448,314 404,296 C368,282 330,296 326,326" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="24" strokeLinecap="round" />
        <path d="M424,392 C452,352 448,314 404,296 C368,282 330,296 326,326" fill="none" stroke={is('fornix') ? '#ffffff' : '#ec4899'} strokeWidth="7.5" strokeLinecap="round" />
      </Region>

      {/* Tálamo */}
      <Region id="talamo" name="Tálamo" active={is('talamo')} onSelect={onSelect}>
        <ellipse cx="425" cy="298" rx="62" ry="46" transform="rotate(-12 425 298)" fill={is('talamo') ? '#ffffff' : '#8b5cf6'} stroke="#5b3fa8" strokeWidth="2" />
        <PlainText text="TÁLAMO" x={425} y={303} size={12} fill="#f5f3ff" weight={800} />
      </Region>

      {/* Ganglios basales (núcleos laterales al tálamo) */}
      <Region id="ganglios-basales" name="Ganglios basales" active={is('ganglios-basales')} onSelect={onSelect}>
        <ellipse cx="487" cy="242" rx="36" ry="27" transform="rotate(-15 487 242)" fill={is('ganglios-basales') ? '#ffffff' : '#06b6d4'} stroke="#0e7490" strokeWidth="2" />
        <ellipse cx="479" cy="233" rx="9" ry="5" transform="rotate(-15 479 233)" fill="rgba(255,255,255,0.4)" />
        <path d="M468,252 C480,259 497,259 510,250" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M472,241 C483,247 498,247 509,239" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeLinecap="round" />
      </Region>

      {/* Núcleos septales */}
      <Region id="septum" name="Núcleos septales" active={is('septum')} onSelect={onSelect}>
        <ellipse cx="314" cy="318" rx="20" ry="14" fill={is('septum') ? '#ffffff' : '#84cc16'} stroke="#4d7c0f" strokeWidth="2" />
      </Region>

      {/* Núcleo accumbens */}
      <Region id="nucleo-accumbens" name="Núcleo accumbens" active={is('nucleo-accumbens')} onSelect={onSelect}>
        <circle cx="326" cy="354" r="16" fill={is('nucleo-accumbens') ? '#ffffff' : '#eab308'} stroke="#a16207" strokeWidth="2" />
        <circle cx="321" cy="349" r="4.5" fill="rgba(255,255,255,0.55)" />
      </Region>

      {/* Circunvolución parahipocampal */}
      <Region id="parahipocampal" name="Circunvolución parahipocampal" active={is('parahipocampal')} onSelect={onSelect}>
        <path d="M254,474 C320,500 402,494 448,460" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="30" strokeLinecap="round" />
        <path d="M254,474 C320,500 402,494 448,460" fill="none" stroke={is('parahipocampal') ? '#ffffff' : '#14b8a6'} strokeWidth="13" strokeLinecap="round" />
      </Region>

      {/* Hipocampo (caballito de mar) */}
      <Region id="hipocampo" name="Hipocampo" active={is('hipocampo')} onSelect={onSelect}>
        <path d="M258,444 C300,480 366,482 410,454 C430,440 438,418 432,400" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="42" strokeLinecap="round" />
        <path d="M258,444 C300,480 366,482 410,454 C430,440 438,418 432,400" fill="none" stroke={is('hipocampo') ? '#ffffff' : '#10b981'} strokeWidth="26" strokeLinecap="round" />
        {/* pliegues del hipocampo */}
        <path d="M286,452 C310,464 340,468 366,462" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="3" strokeLinecap="round" />
        <path d="M296,440 C318,450 344,454 368,450" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="3" strokeLinecap="round" />
      </Region>

      {/* Amígdala */}
      <Region id="amigdala" name="Amígdala" active={is('amigdala')} onSelect={onSelect}>
        <ellipse cx="288" cy="424" rx="26" ry="17" transform="rotate(-35 288 424)" fill={is('amigdala') ? '#ffffff' : '#f43f5e'} stroke="#9f1239" strokeWidth="2" />
        <ellipse cx="282" cy="419" rx="8" ry="4.5" transform="rotate(-35 282 419)" fill="rgba(255,255,255,0.4)" />
      </Region>

      {/* Hipotálamo (+ hipófisis) */}
      <Region id="hipotalamo" name="Hipotálamo" active={is('hipotalamo')} onSelect={onSelect}>
        <ellipse cx="378" cy="360" rx="52" ry="28" fill={is('hipotalamo') ? '#ffffff' : '#f59e0b'} stroke="#b45309" strokeWidth="2" />
        <circle cx="350" cy="404" r="14" fill={is('hipotalamo') ? '#ffffff' : '#d97706'} stroke="#92400e" strokeWidth="2" />
        <path d="M356,392 L354,384" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
        <PlainText text="HIPOTÁLAMO" x={378} y={365} size={10.5} fill="#451a03" weight={800} />
      </Region>

      {/* Cuerpos mamilares */}
      <Region id="cuerpos-mamilares" name="Cuerpos mamilares" active={is('cuerpos-mamilares')} onSelect={onSelect}>
        <circle cx="432" cy="398" r="13" fill={is('cuerpos-mamilares') ? '#ffffff' : '#f97316'} stroke="#9a3412" strokeWidth="2" />
        <circle cx="428" cy="394" r="3.5" fill="rgba(255,255,255,0.5)" />
      </Region>

      {/* Formación reticular (sobre el tronco) */}
      <Region id="tronco-limbico" name="Formación reticular" active={is('tronco-limbico')} onSelect={onSelect}>
        <ellipse cx="464" cy="474" rx="24" ry="54" fill={is('tronco-limbico') ? '#ffffff' : '#a855f7'} stroke="#6b21a8" strokeWidth="2" opacity="0.95" />
        <path d="M456,440 C462,452 466,470 462,490" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="3 3" />
      </Region>

      {/* Etiquetas */}
      <Label text="Giro cingulado" x={408} y={112} tx={330} ty={88} color="#f5d0fe" />
      <Label text="Fórnix" x={340} y={293} tx={295} ty={225} color="#f9a8d4" />
      <Label text="Ganglios basales" x={500} y={240} tx={560} ty={334} color="#a5f3fc" small />
      <Label text="Septum" x={296} y={310} tx={252} ty={288} color="#d9f99d" />
      <Label text="N. accumbens" x={310} y={354} tx={240} ty={372} color="#fde68a" />
      <Label text="Amígdala" x={266} y={428} tx={216} ty={402} color="#fda4af" />
      <Label text="Hipocampo" x={336} y={474} tx={318} ty={518} color="#a7f3d0" />
      <Label text="C. parahipocampal" x={282} y={490} tx={196} ty={532} color="#99f6e4" small />
      <Label text="Cuerpos mamilares" x={445} y={398} tx={510} ty={428} color="#fdba74" small />
      <Label text="Formación reticular" x={488} y={500} tx={560} ty={540} color="#e9d5ff" small />
    </svg>
  )
}

/* ════════════════════ DIAGRAMA · LÓBULOS (lateral) ════════════════════ */

export function LobesDiagram({ selectedId, onSelect }: DiagramProps) {
  const is = (id: string) => selectedId === id
  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full select-none" role="img" aria-label="Vista lateral del cerebro con los lóbulos">
      <Defs />
      <Backdrop />

      {/* Estructuras posteriores detrás */}
      <PosteriorStructures cerebellumFill="#a150a8" stemFill="#c9976b" stemStroke="#e0b183" cellFill="#8f5f8f" />

      {/* Lóbulos recortados al contorno del hemisferio */}
      <g clipPath="url(#clipCerebrum)">
        {/* Occipital (se dibuja primero, el temporal tapa la parte inferior) */}
        <Region id="occipital" name="Lóbulo occipital" active={is('occipital')} onSelect={onSelect}>
          <path d="M600,20 L740,20 L740,400 L545,335 Z" fill={is('occipital') ? '#ffffff' : '#ef4444'} />
        </Region>
        {/* Parietal */}
        <Region id="parietal" name="Lóbulo parietal" active={is('parietal')} onSelect={onSelect}>
          <path d="M335,20 L600,20 L545,335 L296,340 Z" fill={is('parietal') ? '#ffffff' : '#8b5cf6'} />
        </Region>
        {/* Frontal */}
        <Region id="frontal" name="Lóbulo frontal" active={is('frontal')} onSelect={onSelect}>
          <path d="M60,20 L335,20 L296,340 L178,352 L110,425 L60,470 Z" fill={is('frontal') ? '#ffffff' : '#10b981'} />
        </Region>
        {/* Temporal */}
        <Region id="temporal" name="Lóbulo temporal" active={is('temporal')} onSelect={onSelect}>
          <path d="M178,352 L545,335 L640,430 L600,490 L200,490 Z" fill={is('temporal') ? '#ffffff' : '#f97316'} />
        </Region>

        {/* Textura de giros (decorativa) */}
        <g fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="2.5">
          <path d="M140,150 C180,128 230,122 268,134" />
          <path d="M150,230 C195,210 245,206 285,216" />
          <path d="M400,100 C440,120 470,150 482,184" />
          <path d="M430,230 C470,214 515,212 548,224" />
          <path d="M250,410 C300,392 360,388 410,396" />
          <path d="M260,440 C310,424 370,420 420,428" />
        </g>
      </g>

      {/* Ínsula (lóbulo profundo, en el fondo del surco de Silvio) */}
      <Region id="insula" name="Ínsula (quinto lóbulo)" active={is('insula')} onSelect={onSelect}>
        <ellipse cx="500" cy="306" rx="44" ry="22" transform="rotate(-5 500 306)" fill="rgba(0,0,0,0)" />
        <ellipse cx="500" cy="306" rx="36" ry="16" transform="rotate(-5 500 306)" fill={is('insula') ? '#ffffff' : '#14b8a6'} stroke="#0f766e" strokeWidth="2" />
        <path d="M478,306 C488,302 502,301 516,304" fill="none" stroke="rgba(0,0,0,0.32)" strokeWidth="2" strokeLinecap="round" />
        <path d="M480,312 C492,309 506,308 518,310" fill="none" stroke="rgba(0,0,0,0.24)" strokeWidth="2" strokeLinecap="round" />
      </Region>

      {/* Contorno del hemisferio (solo siluetas reales, sin la elipse auxiliar) */}
      <ellipse cx="378" cy="248" rx="282" ry="172" transform="rotate(-8 378 248)" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <ellipse cx="398" cy="392" rx="163" ry="66" transform="rotate(-4 398 392)" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />

      {/* Líneas de frontera: surcos de referencia */}
      <g fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" strokeDasharray="6 5">
        <path d="M336,22 C326,120 306,240 296,348" />
        <path d="M172,352 C300,344 430,338 552,332" />
        <path d="M600,22 L545,335" strokeOpacity="0.5" />
      </g>

      {/* Cerebelo y tronco interactivos: contorno solo al seleccionar */}
      <Region id="cerebelo" name="Cerebelo" active={is('cerebelo')} onSelect={onSelect}>
        <ellipse cx="594" cy="450" rx="99" ry="59" transform="rotate(-9 594 450)" fill="rgba(0,0,0,0)" />
        {is('cerebelo') && (
          <ellipse cx="594" cy="450" rx="99" ry="59" transform="rotate(-9 594 450)" fill="none" stroke="#ffffff" strokeWidth={4} />
        )}
      </Region>
      <Region id="tronco" name="Tronco encefálico" active={is('tronco')} onSelect={onSelect}>
        <path
          d="M432,395 C436,440 430,475 442,505 C449,524 453,540 455,558 L490,558 C486,538 484,518 481,498 C477,468 483,436 478,405 Z"
          fill="rgba(0,0,0,0)"
          stroke={is('tronco') ? '#ffffff' : 'rgba(255,255,255,0.35)'}
          strokeWidth={is('tronco') ? 4 : 2.5}
        />
      </Region>

      {/* Etiquetas */}
      <PlainText text="FRONTAL" x={185} y={195} size={17} weight={800} />
      <PlainText text="PARIETAL" x={452} y={168} size={17} weight={800} />
      <PlainText text="OCCIPITAL" x={648} y={192} size={15} weight={800} />
      <PlainText text="TEMPORAL" x={392} y={430} size={17} weight={800} />
      <PlainText text="Ínsula" x={500} y={283} size={12} weight={700} />
      <PlainText text="Cerebelo" x={594} y={456} size={13} weight={700} />
      <PlainText text="Tronco" x={528} y={548} size={12} weight={700} />
    </svg>
  )
}

/* ════════════════════ DIAGRAMA · SURCOS Y GIROS (lateral + medial) ════════════════════ */

export function SulciGyriDiagram({ selectedId, onSelect }: DiagramProps) {
  const is = (id: string) => selectedId === id
  const band = (id: string, d: string, color: string, name: string, w = 24) => (
    <Region id={id} name={name} active={is(id)} onSelect={onSelect}>
      <path d={d} fill="none" stroke="rgba(0,0,0,0)" strokeWidth={w + 14} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={is(id) ? '#ffffff' : color}
        strokeWidth={is(id) ? w + 4 : w}
        strokeLinecap="round"
        opacity={is(id) ? 1 : 0.9}
      />
    </Region>
  )

  return (
    <svg viewBox="0 0 760 560" className="h-auto w-full select-none" role="img" aria-label="Mapa de surcos y giros de la corteza cerebral">
      <Defs />
      <Backdrop />

      {/* Estructuras posteriores decorativas */}
      <PosteriorStructures cerebellumFill="#7a6f80" stemFill="#b08a66" stemStroke="#cfa87e" cellFill="#6b6070" />

      {/* Hemisferio base — clic = concepto de plegamiento */}
      <Region id="concepto" name="La corteza plegada (giros + surcos)" active={is('concepto')} onSelect={onSelect}>
        <g clipPath="url(#clipCerebrum)">
          <rect x="0" y="0" width="760" height="560" fill={is('concepto') ? '#e8dff0' : '#d9d0e2'} />
          {/* textura de pliegues */}
          <g fill="none" stroke="rgba(90,70,110,0.22)" strokeWidth="2.5">
            <path d="M120,180 C160,158 205,152 240,162" />
            <path d="M115,250 C155,232 200,228 236,238" />
            <path d="M395,95 C432,115 462,145 476,180" />
            <path d="M420,255 C462,240 508,238 542,250" />
            <path d="M240,425 C295,405 360,400 415,408" />
          </g>
        </g>
        {/* contorno */}
        <g clipPath="url(#clipCerebrum)">
          <ellipse cx="378" cy="248" rx="282" ry="172" transform="rotate(-8 378 248)" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        </g>
      </Region>

      <g clipPath="url(#clipCerebrum)">
        {/* ── GIROS (bandas de color, clicables) ── */}
        {band('giros-frontales', 'M138,142 C198,124 258,121 300,132', '#84cc16', 'Giros frontales (superior, medio e inferior)', 21)}
        {band('giros-frontales', 'M132,225 C196,204 258,199 300,209', '#84cc16', 'Giros frontales (superior, medio e inferior)', 21)}
        {band('giros-frontales', 'M128,302 C178,290 228,286 274,296', '#84cc16', 'Giros frontales (superior, medio e inferior)', 21)}
        {band('giro-precentral', 'M312,68 C303,150 291,248 285,338', '#22c55e', 'Giro precentral', 25)}
        {band('giro-postcentral', 'M354,70 C344,150 332,248 324,340', '#eab308', 'Giro postcentral', 25)}
        {band('lobulillo-parietal-superior', 'M398,152 C446,140 494,150 526,186', '#f43f5e', 'Lobulillo parietal superior', 19)}
        {band('giros-parietales', 'M540,298 C576,314 578,354 542,370', '#06b6d4', 'Giro supramarginal y angular', 20)}
        {band('giros-parietales', 'M545,394 C586,404 602,430 586,452', '#06b6d4', 'Giro supramarginal y angular', 20)}
        {band('giros-temporales', 'M232,394 C330,380 432,372 522,370', '#a855f7', 'Giros temporales (superior, medio e inferior)', 21)}
        {band('giros-temporales', 'M262,434 C344,424 436,416 508,412', '#a855f7', 'Giros temporales (superior, medio e inferior)', 21)}
      </g>

      {/* ── SURCOS (líneas oscuras) ── */}
      {/* Central de Rolando */}
      <Region id="surco-central" name="Surco central (de Rolando)" active={is('surco-central')} onSelect={onSelect}>
        <path d="M336,40 C326,130 306,245 296,348" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="22" />
        <path d="M336,40 C326,130 306,245 296,348" fill="none" stroke={is('surco-central') ? '#ffffff' : '#3f3546'} strokeWidth={is('surco-central') ? 8 : 6} strokeLinecap="round" />
      </Region>
      {/* Lateral de Silvio */}
      <Region id="surco-lateral" name="Surco lateral (de Silvio)" active={is('surco-lateral')} onSelect={onSelect}>
        <path d="M170,352 C300,344 430,338 556,330" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="22" />
        <path d="M170,352 C300,344 430,338 556,330" fill="none" stroke={is('surco-lateral') ? '#ffffff' : '#3f3546'} strokeWidth={is('surco-lateral') ? 8 : 6} strokeLinecap="round" />
        <path d="M176,348 C176,330 188,318 205,314" fill="none" stroke={is('surco-lateral') ? '#ffffff' : '#3f3546'} strokeWidth="4.5" strokeLinecap="round" />
      </Region>
      {/* Córtex insular (escondido en el fondo de Silvio) */}
      <Region id="cortex-insular" name="Córtex insular" active={is('cortex-insular')} onSelect={onSelect}>
        <ellipse cx="474" cy="308" rx="34" ry="17" transform="rotate(-4 474 308)" fill="rgba(0,0,0,0)" />
        <ellipse cx="474" cy="308" rx="27" ry="12.5" transform="rotate(-4 474 308)" fill={is('cortex-insular') ? '#ffffff' : '#ec4899'} stroke="#9d174d" strokeWidth="2" />
        <path d="M458,308 C466,305 480,304 490,307" fill="none" stroke="rgba(0,0,0,0.32)" strokeWidth="1.8" strokeLinecap="round" />
      </Region>
      {/* Surco temporal superior (decorativo, asociado a giros temporales) */}
      <path d="M240,410 C330,398 430,390 518,388" fill="none" stroke="rgba(63,53,70,0.55)" strokeWidth="3.5" strokeLinecap="round" pointerEvents="none" />
      {/* Surco intraparietal decorativo */}
      <path d="M356,252 C420,264 478,280 534,298" fill="none" stroke="rgba(63,53,70,0.45)" strokeWidth="3" strokeLinecap="round" pointerEvents="none" />

      {/* ── MINI CORTE SAGITAL (cara medial) esquina inferior izquierda ── */}
      <g>
        <text x="150" y="552" fontSize="11.5" fontWeight={700} fill="#d8d4e0" textAnchor="middle" stroke="#1c1917" strokeWidth={3} style={{ paintOrder: 'stroke' }} pointerEvents="none">
          CORTE MEDIAL
        </text>
        <ellipse cx="150" cy="472" rx="96" ry="56" fill="#d9d0e2" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />

        {/* cisura interhemisférica */}
        <Region id="cisura-longitudinal" name="Cisura interhemisférica" active={is('cisura-longitudinal')} onSelect={onSelect}>
          <path d="M62,442 C108,416 196,414 240,446" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="18" />
          <path d="M62,442 C108,416 196,414 240,446" fill="none" stroke={is('cisura-longitudinal') ? '#ffffff' : '#8b5cf6'} strokeWidth={is('cisura-longitudinal') ? 6 : 4.5} strokeLinecap="round" />
        </Region>

        {/* giro cingulado (mini) */}
        <Region id="giro-cingulado-sg" name="Giro cingulado" active={is('giro-cingulado-sg')} onSelect={onSelect}>
          <path d="M96,486 C92,452 122,434 152,434 C186,434 210,452 212,482" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="16" />
          <path d="M96,486 C92,452 122,434 152,434 C186,434 210,452 212,482" fill="none" stroke={is('giro-cingulado-sg') ? '#ffffff' : '#d946ef'} strokeWidth={is('giro-cingulado-sg') ? 8 : 6.5} strokeLinecap="round" />
        </Region>

        {/* cuerpo calloso decorativo */}
        <path d="M102,490 C100,462 126,448 152,448 C180,448 202,464 204,488" fill="none" stroke="#f3e9d8" strokeWidth="9" strokeLinecap="round" pointerEvents="none" />

        {/* surco parieto-occipital */}
        <Region id="surco-parietooccipital" name="Surco parieto-occipital" active={is('surco-parietooccipital')} onSelect={onSelect}>
          <path d="M196,432 C186,450 176,464 168,476" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="16" />
          <path d="M196,432 C186,450 176,464 168,476" fill="none" stroke={is('surco-parietooccipital') ? '#ffffff' : '#14b8a6'} strokeWidth={is('surco-parietooccipital') ? 6 : 4.5} strokeLinecap="round" />
        </Region>

        {/* surco calcarino */}
        <Region id="surco-calcarino" name="Surco calcarino" active={is('surco-calcarino')} onSelect={onSelect}>
          <path d="M204,496 C222,502 244,502 262,494" fill="none" stroke="rgba(0,0,0,0)" strokeWidth="16" />
          <path d="M204,496 C222,502 244,502 262,494" fill="none" stroke={is('surco-calcarino') ? '#ffffff' : '#ef4444'} strokeWidth={is('surco-calcarino') ? 6 : 4.5} strokeLinecap="round" />
        </Region>
      </g>

      {/* Etiquetas estáticas principales */}
      <PlainText text="Rolando" x={376} y={66} size={12.5} fill="#e7e5e4" />
      <PlainText text="Silvio" x={400} y={322} size={12.5} fill="#e7e5e4" />

      {/* Etiqueta dinámica de la estructura seleccionada */}
      {selectedId && LABELS_SULCI[selectedId] && !['surco-central', 'surco-lateral'].includes(selectedId) && (
        <PlainText
          text={LABELS_SULCI[selectedId].text}
          x={LABELS_SULCI[selectedId].x}
          y={LABELS_SULCI[selectedId].y}
          size={13.5}
          fill="#ffffff"
        />
      )}
    </svg>
  )
}

// nota: las bandas 'band()' usan trazos gruesos; los surcos usan Region dedicada
const LABELS_SULCI: Record<string, { text: string; x: number; y: number }> = {
  concepto: { text: 'Corteza plegada: giros ✚ surcos', x: 380, y: 248 },
  'surco-central': { text: 'Surco central (Rolando)', x: 376, y: 66 },
  'surco-lateral': { text: 'Surco lateral (Silvio)', x: 474, y: 320 },
  'cisura-longitudinal': { text: 'Cisura interhemisférica', x: 150, y: 404 },
  'surco-calcarino': { text: 'Surco calcarino', x: 152, y: 528 },
  'surco-parietooccipital': { text: 'Surco parieto-occipital', x: 108, y: 528 },
  'giro-precentral': { text: 'Giro precentral → MOTOR', x: 240, y: 62 },
  'giro-postcentral': { text: 'Giro postcentral → SENSORIAL', x: 452, y: 84 },
  'giros-frontales': { text: 'Giros frontales', x: 190, y: 190 },
  'giros-temporales': { text: 'Giros temporales', x: 400, y: 352 },
  'giros-parietales': { text: 'Supramarginal · Angular', x: 628, y: 372 },
  'giro-cingulado-sg': { text: 'Giro cingulado', x: 152, y: 420 },
  'lobulillo-parietal-superior': { text: 'Lobulillo parietal superior', x: 448, y: 122 },
  'cortex-insular': { text: 'Córtex insular', x: 462, y: 262 },
}
