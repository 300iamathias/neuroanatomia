# 🧠 NeuroAtlas

Aplicación web interactiva para estudiar **neuroanatomía**: el sistema límbico, los lóbulos cerebrales y los surcos y giros del cerebro. Diseñada como herramienta de repaso para la práctica experimental de anatomía (ubicación e identificación + características y funciones).

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-teal)

## ✨ Funcionalidades

### 🗺️ Modo Explorar
- **Diagramas SVG interactivos dibujados a mano** de las 3 regiones:
  - **Sistema Límbico** (corte sagital): hipocampo, amígdala, tálamo, hipotálamo, **cuerpo calloso**, **ganglios basales**, giro cingulado, fórnix, cuerpos mamilares, núcleo accumbens, septum y más.
  - **Lóbulos Cerebrales** (vista lateral): frontal, parietal, temporal, occipital **e ínsula** (el quinto lóbulo profundo), más cerebelo y tronco encefálico.
  - **Surcos y Giros** (vista lateral + corte medial): surco central (Rolando), surco lateral (Silvio), calcarino, parieto-occipital, giros precentral/postcentral, frontales, temporales, supramarginal, angular, **lobulillo parietal superior** y **córtex insular**.
- Haz clic en cualquier estructura (o navega con el teclado) para ver su **función, características, dato clave para el examen y mnemotecnia**.
- Incluye la **nota clínica** de la lámina: paresia espástica contralateral, hemianopsia, agnosia, afasias de Broca y Wernicke.
- Barra de progreso por tema: marca las estructuras que ya estudiaste.

### 🃏 Modo Tarjetas (Flashcards)
- Tarjetas con volteo 3D: la cara frontal muestra el nombre, la trasera la función.
- Mazos por tema o mezclados, con barajado aleatorio.

### 📝 Modo Examen
- Simulador de 10 preguntas al azar de un banco de **28 preguntas** (filtro por tema disponible).
- Feedback inmediato con explicación de cada respuesta.
- Resultado final con nota motivacional y **mejor puntaje guardado**.

El progreso de estudio se guarda en el navegador (localStorage), no requiere cuenta ni base de datos.

## 🛠️ Tecnologías

- [Next.js 16](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- [Framer Motion](https://www.framer.com/motion/) para animaciones
- [Lucide Icons](https://lucide.dev/)

## 🚀 Correr en local

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## ☁️ Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. Clic en **"Add New... → Project"** y selecciona el repositorio.
4. Vercel detecta Next.js automáticamente. **No necesitas configurar nada** (sin variables de entorno ni base de datos).
5. Clic en **"Deploy"** y espera ~1 minuto. ¡Listo! 🎉

Cada `git push` a la rama principal generará un nuevo despliegue automático.

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx              # Página principal (tabs: Explorar / Tarjetas / Examen)
│   ├── layout.tsx            # Layout raíz y metadata
│   └── globals.css           # Estilos globales
├── components/
│   ├── brain-diagrams.tsx    # Diagramas SVG interactivos del cerebro
│   ├── explore-view.tsx      # Vista de exploración con panel de detalle
│   ├── flashcards-view.tsx   # Flashcards con volteo 3D
│   ├── quiz-view.tsx         # Simulador de examen
│   └── ui/                   # Componentes shadcn/ui
└── lib/
    └── anatomy-data.ts       # Contenido educativo (34 estructuras + 28 preguntas)
```

---

Hecho con 💜 como proyecto de estudio de neuroanatomía.
