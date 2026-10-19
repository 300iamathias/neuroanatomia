# 🧠 NeuroAtlas

Aplicación web interactiva para estudiar **neuroanatomía**: sistema límbico, lóbulos cerebrales, surcos y giros, **los 6 temas del Examen Práctico (Unidades 1 y 2)** con su simulador de rúbrica real, y un sistema completo de **gamificación** (XP, niveles, racha diaria y logros). Diseñada como herramienta de repaso para la práctica experimental de anatomía (ubicación e identificación + límites/relaciones + características y funciones).

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-teal)

## ✨ Funcionalidades

### 🗺️ Modo Explorar
- **Diagramas SVG interactivos dibujados a mano** de las 3 regiones:
  - **Sistema Límbico** (corte sagital): hipocampo, amígdala, tálamo, hipotálamo, cuerpo calloso, ganglios basales, giro cingulado, fórnix, cuerpos mamilares, núcleo accumbens, septum y más.
  - **Lóbulos Cerebrales** (vista lateral): frontal, parietal, temporal, occipital e ínsula, más cerebelo y tronco encefálico.
  - **Surcos y Giros** (vista lateral + corte medial): Rolando, Silvio, calcarino, parieto-occipital, giros precentral/postcentral, frontales, temporales, supramarginal, angular, lobulillo parietal superior y córtex insular.
- Clic en cualquier estructura para ver su **función, características, dato clave para el examen y mnemotecnia**.

### 🩺 Modo Práctico (nuevo · Unidades 1 y 2)
Los **6 temas oficiales del componente práctico**, con una sección exclusiva de **Límites y relaciones anatómicas** (criterio 2 de la rúbrica):
- **División del Sistema Nervioso**: árbol SNC → SNP → somático/autónomo → simpático/parasimpático.
- **Meninges y LCR**: duramadre, aracnoides, piamadre, espacio subaracnoideo y granulaciones (corte interactivo con seno sagital).
- **Cortes y Planos Anatómicos**: sagital, coronal, horizontal/axial, vocabulario de orientación y lectura de RM/TAC.
- **Áreas Funcionales de la Corteza**: M1, S1, Broca, Wernicke, visual, auditiva y prefrontal (con sus lesiones clásicas).
- **Ventrículos y LCR**: laterales, III, IV, acueducto de Silvio, plexos coroides y la ruta completa del LCR.
- **Tallo Cerebral**: mesencéfalo, protuberancia, bulbo, formación reticular y los 12 pares craneales.

#### 🎯 Simulador del Examen Práctico
Réplica del formato real del examen:
- Se proyecta una **imagen con 5 estructuras numeradas** (pines pulsantes 1-5, sin nombres).
- **Cronómetro de 15 minutos** como el examen real.
- Escribes el nombre y se revela la respuesta correcta con **límites/relaciones + funciones**.
- **Autoevaluación con la rúbrica oficial**: 3.0 Excelente / 2.0 Regular / 1.0 Básico / 0.0 Insuficiente (nota sobre **15 puntos**).
- Temas individuales o **mezcla aleatoria**; revisión final estructura por estructura y mejor nota guardada.

### 🃏 Modo Tarjetas (Flashcards)
- Tarjetas con volteo 3D: la cara frontal muestra el nombre, la trasera la función.
- Mazos por tema o mezclados, con barajado aleatorio.

### 📝 Modo Examen (test)
- Simulador de 10 preguntas al azar de un banco de **44 preguntas** (con filtro para los temas del práctico).
- Feedback inmediato con explicación de cada respuesta.

### 🎮 Gamificación (nuevo)
- **XP y 10 niveles neuro-temáticos**: de 🌱 *Neurona novata* a 👑 *Neuroanatomista legendario*.
- **Racha diaria 🔥**: estudia cada día para mantenerla viva (estilo Duolingo).
- **12 logros desbloqueables** con notificaciones animadas: desde *Primer destello* hasta *Nota legendaria* (15/15 en el práctico).
- **🎉 Confetti** al aprobar, sacar 10/10 o 15/15.
- **Fondo neuronal animado**: neuronas y sinapsis vivas que reaccionan a tu cursor (respeta `prefers-reduced-motion`).
- **Botón compartir 📤**: comparte tu progreso en WhatsApp en un clic (+10 XP).
- **Instalable como app**: manifest PWA + íconos, se puede agregar a la pantalla de inicio del celular.
- Todo persiste en el navegador (localStorage), sin cuenta ni base de datos.

El progreso (71 estructuras estudiables) se guarda en el navegador (localStorage), no requiere cuenta ni base de datos.

## 🛠️ Tecnologías

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** + shadcn/ui (New York)
- **Framer Motion** para animaciones + **canvas-confetti**
- Canvas 2D para el fondo neuronal
- SVG interactivo (accesible con teclado y ARIA)
- PWA manifest (instalable en el celular)

## 🚀 Ejecutar en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## ☁️ Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo.
3. Vercel detecta Next.js automáticamente: no necesita variables de entorno.
4. **Deploy** y listo.

## 📁 Estructura

```
src/
├── app/                  # Página principal (4 pestañas + header gamificado)
├── components/
│   ├── achievements-dialog.tsx  # Grid de logros (12 medallas)
│   ├── brain-diagrams.tsx    # Diagramas SVG (límbico, lóbulos, surcos/giros)
│   ├── extra-diagrams.tsx    # Diagramas SVG de los 6 temas del práctico + pines de examen
│   ├── explore-view.tsx      # Modo explorar
│   ├── flashcards-view.tsx   # Modo tarjetas
│   ├── neural-background.tsx # Fondo animado de neuronas y sinapsis
│   ├── quiz-view.tsx         # Modo examen (test)
│   └── units-view.tsx        # Modo práctico (estudiar + simulador)
└── lib/
    ├── anatomy-data.ts       # Contenido: 34 estructuras + 28 preguntas
    ├── confetti.ts           # Presets de confetti (burst / party)
    ├── gamification.ts       # Motor: XP, niveles, racha, logros
    └── neuro-extra-data.ts   # Contenido: 37 estructuras de unidades 1-2 + 16 preguntas
```

---

Hecho con 🧠 y ❤️ por Mathias · acceso para compañeros: **1 dólar** 😄 (por ahora paguen con estudio).
