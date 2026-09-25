// ─────────────────────────────────────────────────────────────
//  NeuroAtlas · Base de contenido de neuroanatomía
//  Tópicos: Sistema Límbico · Lóbulos Cerebrales · Surcos y Giros
// ─────────────────────────────────────────────────────────────

export type TopicId = "limbico" | "lobulos" | "surcos";

export interface Structure {
  id: string;
  name: string;
  latin: string;
  category: string;
  /** color hex usado en el diagrama y badges */
  color: string;
  /** resumen de 1 línea (para leyenda y tarjetas) */
  short: string;
  /** función principal (párrafo) */
  func: string;
  /** lista de características */
  characteristics: string[];
  /** dato clave para el examen */
  examTip: string;
  /** regla mnemotécnica opcional */
  mnemonic?: string;
}

export interface Topic {
  id: TopicId;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  structures: Structure[];
}

// ─────────────────────────── COLORES ──────────────────────────
export const C = {
  rose: "#f43f5e",
  amber: "#f59e0b",
  emerald: "#10b981",
  fuchsia: "#d946ef",
  violet: "#8b5cf6",
  orange: "#f97316",
  lime: "#84cc16",
  teal: "#14b8a6",
  pink: "#ec4899",
  yellow: "#eab308",
  red: "#ef4444",
  green: "#22c55e",
  grape: "#a855f7",
  cyan: "#06b6d4",
  sand: "#f3e9d8",
};

// ─────────────────── TEMA 1 · SISTEMA LÍMBICO ─────────────────
const limbico: Structure[] = [
  {
    id: "hipocampo",
    name: "Hipocampo",
    latin: "Hippocampus",
    category: "Memoria",
    color: C.emerald,
    short: "Consolida la memoria a largo plazo y el aprendizaje espacial.",
    func: "Es el cerebro de la memoria: convierte la información nueva (memoria a corto plazo) en memoria a largo plazo. Además construye mapas cognitivos que permiten orientarnos en el espacio (sus 'células de lugar' actúan como GPS interno).",
    characteristics: [
      "Tiene forma de caballito de mar (de ahí su nombre griego).",
      "Hay uno en cada hemisferio cerebral.",
      "Es una de las pocas zonas donde se producen neuronas nuevas en el adulto (neurogénesis).",
      "Muy sensible al estrés crónico: el cortisol daña sus neuronas.",
      "Es de las primeras estructuras dañadas en el Alzheimer.",
    ],
    examTip:
      "Lesión del hipocampo → amnesia anterógrada: el paciente no puede formar NUEVOS recuerdos (caso famoso: paciente H.M.). Los recuerdos antiguos se conservan.",
    mnemonic: "Hipo-CAMPO = el 'campo' donde se guardan los recuerdos nuevos.",
  },
  {
    id: "amigdala",
    name: "Amígdala",
    latin: "Amygdala",
    category: "Emociones",
    color: C.rose,
    short: "Procesa el miedo, la ira y las emociones intensas; activa la lucha o huida.",
    func: "Es el centro de alarma emocional del cerebro: detecta amenazas y desencadena la respuesta de lucha o huida antes de que la corteza 'piense'. También le carga el valor emocional a los recuerdos: lo que vive con emoción fuerte se recuerda mejor.",
    characteristics: [
      "Forma de almendra (amygdala = almendra en griego).",
      "Se conecta con el hipotálamo para producir respuestas corporales automáticas (corazón acelerado, sudoración).",
      "Participa en el condicionamiento del miedo y la agresión.",
      "Activa el eje hipotálamo-hipófisis-adrenal (cortisol, adrenalina).",
    ],
    examTip:
      "Paciente S.M. (lesión bilateral de la amígdala): no experimenta miedo ni reconoce expresiones de miedo en otras personas.",
    mnemonic: "AMÍGDALA = la 'alarma' del cerebro.",
  },
  {
    id: "hipotalamo",
    name: "Hipotálamo",
    latin: "Hypothalamus",
    category: "Homeostasis",
    color: C.amber,
    short: "Regula la homeostasis: hambre, sed, temperatura, sueño y hormonas.",
    func: "Es el termostato y centro de control del cuerpo: mantiene la homeostasis (temperatura, hambre, sed, sueño/ritmo circadiano) y gobierna el sistema endocrino al dirigir la hipófisis. Es el puente entre el sistema límbico (emociones) y el sistema nervioso autónomo y hormonal.",
    characteristics: [
      "Pequeño: pesa apenas ~4 g, pero controla funciones vitales.",
      "Controla la hipófisis (glándula maestra del sistema hormonal).",
      "Núcleo lateral → centro del hambre; núcleo ventromedial → centro de la saciedad.",
      "Regula temperatura corporal, sed, presión arterial y ritmo sueño-vigilia.",
      "Participa en la respuesta sexual y el comportamiento emocional.",
    ],
    examTip:
      "Hipotálamo = homeostasis + hipófisis. Si el examen pregunta '¿quién conecta el sistema nervioso con el endocrino?' → HIPOTÁLAMO.",
    mnemonic: "HIPO-TÁLAMO está DEBAJO del TÁLAMO (hipo = debajo).",
  },
  {
    id: "talamo",
    name: "Tálamo",
    latin: "Thalamus",
    category: "Relevo sensorial",
    color: C.violet,
    short: "Estación de relevo: filtra y dirige toda la información sensorial a la corteza.",
    func: "Actúa como central de intercambio sensorial: casi toda la información sensorial (tacto, vista, oído, gusto) llega al tálamo, que la filtra y la reenvía al área correspondiente de la corteza. También participa en la regulación del sueño, la alerta y la consciencia.",
    characteristics: [
      "Dos masas ovales de sustancia gris en el centro del diencéfalo.",
      "Filtra información: decide qué merece llegar a la consciencia.",
      "Participa en la activación cortical y el sueño.",
      "Conecta con el sistema límbico y la corteza motora.",
    ],
    examTip:
      "¡PREGUNTA CLÁSICA! El OLFATO es el único sentido que NO pasa por el tálamo: va directo a la corteza olfatoria y al sistema límbico. Por eso un olor revive recuerdos y emociones al instante.",
    mnemonic: "TÁLAMO = la 'Torre de control' sensorial (tolos los sentidos, menos el olfato).",
  },
  {
    id: "giro-cingulado",
    name: "Giro cingulado",
    latin: "Gyrus cinguli",
    category: "Emoción + atención",
    color: C.fuchsia,
    short: "Integra emociones con atención y detecta errores y conflicto.",
    func: "Banda de corteza que envuelve el cuerpo calloso. Participa en la parte emocional de la atención, la motivación, la detección de errores y el control de conflictos. Procesa el 'dolor emocional': el rechazo social activa las mismas zonas que el dolor físico.",
    characteristics: [
      "Forma un anillo (cingulum = cinturón) alrededor del cuerpo calloso.",
      "Forma parte del circuito de Papez (circuito de las emociones).",
      "Dividido en región anterior (emocional, control) y posterior (memoria, aprendizaje).",
      "Su hiperactividad se relaciona con la obsesión (TOC).",
    ],
    examTip:
      "El giro cingulado pertenece A LA VEZ al sistema límbico y a la corteza: es el 'traductor' entre emoción y cognición.",
  },
  {
    id: "cuerpos-mamilares",
    name: "Cuerpos mamilares",
    latin: "Corpora mammillaria",
    category: "Memoria",
    color: C.orange,
    short: "Guardan recuerdos de eventos; parte del circuito de Papez.",
    func: "Dos estructuras redondeadas en la base del hipotálamo que actúan como estación de relevo en el circuito de la memoria (circuito de Papez): reciben información del hipocampo a través del fórnix y la envían al tálamo.",
    characteristics: [
      "Son dos núcleos gemelos con forma de pecho (de ahí 'mamilares').",
      "Forman parte del hipotálamo posterior.",
      "Relevan información del hipocampo hacia el tálamo anterior.",
    ],
    examTip:
      "Daño de los cuerpos mamilares por déficit de tiamina (vitamina B1) en alcohólicos → síndrome de Korsakoff (amnesia severa).",
  },
  {
    id: "nucleo-accumbens",
    name: "Núcleo accumbens",
    latin: "Nucleus accumbens",
    category: "Recompensa",
    color: C.yellow,
    short: "Centro de la recompensa y el placer; motor de la motivación.",
    func: "Es el núcleo del circuito de recompensa: libera DOPAMINA cuando hacemos algo placentero o que conviene a la supervivencia (comer, socializar, lograr metas). Impulsa la motivación y el refuerzo de conductas.",
    characteristics: [
      "Ubicado en la zona anterior del estriado (ganglios basales).",
      "Recibe dopamina de la vía mesolímbica (área tegmental ventral).",
      "Clave en la adicción: todas las drogas adictivas elevan la dopamina aquí.",
    ],
    examTip:
      "PREGUNTA FRECUENTE: '¿Dónde actúa la dopamina de la recompensa?' → Núcleo accumbens (vía mesolímbica).",
  },
  {
    id: "septum",
    name: "Núcleos septales (Septum)",
    latin: "Nuclei septales",
    category: "Placer / refuerzo",
    color: C.lime,
    short: "Zona de placer y refuerzo; modera la ira y la ansiedad.",
    func: "Zona situada delante del tálamo que forma parte del circuito de recompensa. Participa en la sensación de placer, el refuerzo de conductas y la inhibición de la agresividad y la ansiedad. Conecta el hipocampo con el hipotálamo.",
    characteristics: [
      "Están en la pared medial de los hemisferios, junto al fórnix.",
      "Forman el circuito del hipocampo (circuito de Papez) con el fórnix.",
      "Su estimulación produce sensaciones agradables.",
    ],
    examTip:
      "Experimento de Olds y Milner (1954): ratones con electrodos en el septum se autoestimulaban hasta el agotamiento → se descubrió el circuito de recompensa.",
  },
  {
    id: "parahipocampal",
    name: "Circunvolución parahipocampal",
    latin: "Gyrus parahippocampalis",
    category: "Memoria",
    color: C.teal,
    short: "Conecta la corteza con el hipocampo; memoria espacial.",
    func: "Banda de corteza que rodea al hipocampo en el lóbulo temporal. Actúa como 'puerta de entrada' de la información de la corteza hacia el hipocampo. Esencial para la memoria espacial y el reconocimiento de lugares y escenas.",
    characteristics: [
      "Contiene la corteza entorrinal, principal conexión cortico-hipocampal.",
      "Interviene en el reconocimiento de contextos y escenas.",
      "Forma el 'borde límbico' del lóbulo temporal.",
    ],
    examTip:
      "Su lesión afecta la memoria espacial: la persona se pierde en lugares conocidos.",
  },
  {
    id: "fornix",
    name: "Fórnix",
    latin: "Fornix",
    category: "Vía de conexión",
    color: C.pink,
    short: "Cable que une el hipocampo con los cuerpos mamilares.",
    func: "Es el 'cable' del sistema límbico: un haz de fibras en forma de arco que lleva la información desde el hipocampo hasta los cuerpos mamilares y el hipotálamo, cerrando el circuito de Papez.",
    characteristics: [
      "Forma de arco o cúpula bajo el cuerpo calloso (fornix = arco en latín).",
      "Es la principal vía de salida del hipocampo.",
      "Conecta hipocampo → cuerpos mamilares → tálamo → corteza cingulada.",
    ],
    examTip:
      "ORDEN DEL CIRCUITO DE PAPEZ (memorízalo): Hipocampo → Fórnix → Cuerpos mamilares → Tálamo anterior → Giro cingulado → de vuelta al hipocampo.",
    mnemonic: "«Héctor Fuma Cola Toda la Cena» = Hipocampo, Fórnix, Cuerpos mamilares, Tálamo, Cingulado.",
  },
  {
    id: "cuerpo-calloso",
    name: "Cuerpo calloso",
    latin: "Corpus callosum",
    category: "Conexión interhemisférica",
    color: C.sand,
    short: "Puente de fibras que conecta los dos hemisferios y les permite intercambiar información.",
    func: "Es la mayor comisura del cerebro: un grosísimo haz de unos 200 millones de fibras nerviosas que conecta el hemisferio derecho con el izquierdo y permite que intercambien información de forma constante. Gracias a él, ambas mitades del cerebro trabajan como un solo equipo: lo que sabe un hemisferio lo comparte con el otro.",
    characteristics: [
      "Es el puente de sustancia blanca más grande del cerebro.",
      "Conecta los hemisferios derecho e izquierdo y permite que intercambien información.",
      "Se ve en TODO corte sagital (cara medial) como un gran arco claro en el centro.",
      "Partes (de adelante hacia atrás): rostrum, genu (rodilla), cuerpo y esplenio.",
      "El giro cingulado lo envuelve por arriba y el fórnix cuelga por debajo.",
    ],
    examTip:
      "PREGUNTA DIRECTA DE EXAMEN: '¿Qué conecta los hemisferios derecho e izquierdo?' → CUERPO CALLOSO. En el corte sagital es el gran arco claro del centro, SIEMPRE debajo del giro cingulado.",
    mnemonic: "Cuerpo CALLOSO = el 'call-center' que conecta las dos oficinas (hemisferios) para que intercambien información.",
  },
  {
    id: "ganglios-basales",
    name: "Ganglios basales",
    latin: "Nuclei basales",
    category: "Control motor",
    color: C.cyan,
    short: "Controlan y coordinan el movimiento; aprenden hábitos y participan en la motivación y recompensa.",
    func: "Conjunto de núcleos de sustancia gris situados alrededor del tálamo (núcleo caudado, putamen, globo pálido, sustancia negra y núcleo accumbens). Participan en el control y la coordinación del movimiento voluntario y intervienen en el aprendizaje de hábitos, la motivación y la recompensa: convierten las repeticiones en rutinas automáticas.",
    characteristics: [
      "Los forman: núcleo caudado, putamen y globo pálido (más sustancia negra y núcleo subtalámico).",
      "Caudado + putamen = estriado; el núcleo accumbens pertenece a este sistema.",
      "Aprenden HÁBITOS y rutinas motoras (atar los zapatos, fumar, tocar guitarra).",
      "Modulan el movimiento: lo inician y lo suavizan, pero no lo ordenan (eso lo hace la corteza motora).",
      "Trabajan con dopamina: de ahí su papel en la motivación y la recompensa.",
    ],
    examTip:
      "Su lesión NO causa parálisis: causa trastornos del movimiento. PARKINSON = daño de la sustancia negra (temblor en reposo, rigidez, lentitud). HUNTINGTON = daño del caudado (corea, movimientos involuntarios).",
    mnemonic: "Ganglios basales = el 'piloto automático' de tus hábitos y movimientos aprendidos.",
  },
  {
    id: "tronco-limbico",
    name: "Formación reticular",
    latin: "Formatio reticularis",
    category: "Vigilia (relacionada)",
    color: C.grape,
    short: "Red del tronco encefálico que mantiene la alerta y la consciencia.",
    func: "Red de neuronas del tronco encefálico (sistema reticular activador ascendente) que mantiene el estado de alerta y la consciencia. Filtra estímulos y permite dormir o despertar. Trabaja junto al sistema límbico para dar 'urgencia' a los estímulos importantes.",
    characteristics: [
      "Se extiende por todo el tronco encefálico.",
      "Daña sus vías → coma.",
      "Modula el sueño, la vigilia y la atención.",
    ],
    examTip:
      "Lesión de la formación reticular → COMA. Es el 'interruptor de la consciencia'.",
  },
];

// ─────────────────── TEMA 2 · LÓBULOS CEREBRALES ──────────────
const lobulos: Structure[] = [
  {
    id: "frontal",
    name: "Lóbulo frontal",
    latin: "Lobus frontalis",
    category: "Ejecución y movimiento",
    color: C.emerald,
    short: "Planificación, decisiones, personalidad y movimiento voluntario.",
    func: "El 'director de orquesta': se encarga de las funciones ejecutivas (planificar, razonar, tomar decisiones, controlar impulsos), de la personalidad y del movimiento voluntario (corteza motora primaria en el giro precentral). Contiene el área de Broca (producción del habla, en el hemisferio dominante).",
    characteristics: [
      "Es el lóbulo más grande (≈ 1/3 de la corteza).",
      "Contiene la corteza motora primaria (giro precentral).",
      "Área de Broca: habla y lenguaje expresivo.",
      "Control de impulsos, empatía y conducta social.",
      "No madura por completo hasta los ~25 años.",
    ],
    examTip:
      "CASO CLÁSICO: Phineas Gage (barra de hierro atravesó su lóbulo frontal) cambió de personalidad → prueba de que aquí reside la personalidad y el juicio. Lesión del área de Broca → afasia motora (entiende pero no puede hablar bien).",
    mnemonic: "FRONTAL → 'F' de Formular planes y 'F' de Forzar el movimiento.",
  },
  {
    id: "parietal",
    name: "Lóbulo parietal",
    latin: "Lobus parietalis",
    category: "Sensación y espacio",
    color: C.violet,
    short: "Procesa el tacto, la temperatura, el dolor y el espacio.",
    func: "El 'panel sensorial': integra las sensaciones corporales (tacto, presión, temperatura, dolor y propiocepción) a través de la corteza somatosensorial (giro postcentral). Además maneja la percepción espacial, la orientación del cuerpo y funciones como leer, escribir y calcular.",
    characteristics: [
      "Corteza somatosensorial primaria en el giro postcentral.",
      "Organiza el 'homúnculo sensitivo': mapa del cuerpo en la corteza.",
      "Integra vista + tacto + oído para ubicarnos en el espacio.",
      "Participa en la atención espacial (ignorar la mitad del cuerpo si se lesiona → heminegligencia).",
    ],
    examTip:
      "Truco para no confundir: GIRO PRECENTRAL (frontal) = MOTOR; GIRO POSTCENTRAL (parietal) = SENSORIAL. El surco central de Rolando los separa.",
    mnemonic: "PARIETAL → 'P' de Palpar y 'P' de Percepción espacial.",
  },
  {
    id: "temporal",
    name: "Lóbulo temporal",
    latin: "Lobus temporalis",
    category: "Audición y memoria",
    color: C.orange,
    short: "Audición, comprensión del lenguaje, olfato y memoria.",
    func: "El 'intérprete': procesa los sonidos (corteza auditiva primaria) y el significado del lenguaje (área de Wernicke, hemisferio dominante). También interviene en el olfato, el reconocimiento de caras y aloja al hipocampo y la amígdala (por eso es clave en la memoria y las emociones).",
    characteristics: [
      "Corteza auditiva primaria en el giro temporal superior.",
      "Área de Wernicke: comprensión del lenguaje.",
      "Contiene hipocampo y amígdala (memoria y emoción).",
      "Procesa el olfato junto con el sistema límbico.",
    ],
    examTip:
      "Lesión del área de Wernicke → afasia sensorial: la persona habla fluido pero SIN sentido ('ensalada de palabras') y no entiende lo que escucha. NOTA CLÍNICA: lesión del temporal → AGNOSIA: falla el reconocimiento (no puede reconocer rostros u objetos y diferenciar animados de inanimados).",
    mnemonic: "TEMPORAL suena a 'tiempo' → guarda la memoria; y a 'templo' → aquí resuena el sonido.",
  },
  {
    id: "occipital",
    name: "Lóbulo occipital",
    latin: "Lobus occipitalis",
    category: "Visión",
    color: C.red,
    short: "El centro de la visión: interpreta formas, colores y movimiento.",
    func: "El 'cine del cerebro': recibe y procesa toda la información visual en la corteza visual primaria (V1, área 17 de Brodmann, a ambos lados del surco calcarino). Interpreta formas, colores, movimiento y profundidad.",
    characteristics: [
      "Es el lóbulo más pequeño de los cuatro.",
      "Corteza visual primaria V1 en el surco calcarino.",
      "Organización retinotópica: el mundo se 'proyecta' aquí como un mapa.",
      "Trabaja con los lóbulos parietal y temporal para reconocer lo que vemos ('¿dónde está?' y '¿qué es?').",
    ],
    examTip:
      "Un golpe fuerte en la nuca hace 'ver estrellas': se estimula la corteza visual del lóbulo occipital. Su destrucción total → ceguera cortical (los ojos sanos, el cerebro no procesa).",
  },
  {
    id: "insula",
    name: "Ínsula (quinto lóbulo)",
    latin: "Lobus insularis",
    category: "Lóbulo profundo",
    color: C.teal,
    short: "El lóbulo escondido: percepción interna del cuerpo, gusto, dolor y emociones.",
    func: "El lóbulo 'oculto': está profundo, cubierto por los otros lóbulos, en el fondo del surco lateral (de Silvio). Es la corteza de la percepción interna del cuerpo (interocepción): detecta el latido, la sed, la náusea. Procesa el gusto y el dolor, participa en las emociones y en la regulación de algunas respuestas corporales (corazón, respiración, digestión).",
    characteristics: [
      "Ubicación: profunda, cubierta por otros lóbulos (opérculos frontal y temporal).",
      "Solo se ve si se separan los labios del surco de Silvio.",
      "Percepción interna del cuerpo: latido, respiración, sensación visceral.",
      "Gusto: contiene la corteza gustatoria primaria.",
      "Dolor y emociones (disgusto, empatía, conciencia del cuerpo).",
      "Regulación de algunas respuestas corporales autónomas.",
    ],
    examTip:
      "RESUMEN DE LA PROFE: Frontal→pensar y actuar · Parietal→sentir · Temporal→oír y recordar · Occipital→ver · ÍNSULA→sentir el estado interno del cuerpo. Recuerda: el surco de Silvio la esconde.",
    mnemonic: "ÍNSULA = una 'islita' de corteza escondida dentro del cerebro, como una isla dentro del mar de lóbulos.",
  },
  {
    id: "cerebelo",
    name: "Cerebelo",
    latin: "Cerebellum",
    category: "Coordinación motora",
    color: C.fuchsia,
    short: "Coordina el movimiento fino, el equilibrio y la postura.",
    func: "El 'coreógrafo': ajusta y afina los movimientos voluntarios para que sean precisos y fluidos. Mantiene el equilibrio y la postura, y guarda la memoria procedural (aprender a andar en bici, bailar, escribir).",
    characteristics: [
      "Apenas 10% del volumen del encéfalo pero contiene MÁS DE LA MITAD de sus neuronas.",
      "Su superficie tiene pliegues finos llamados folia.",
      "Comparador: contrasta lo que querías hacer con lo que estás haciendo y corrige.",
      "Su lesión produce ataxia (movimientos tambaleantes), dismetría y temblor intencional.",
    ],
    examTip:
      "Prueba típica de lesión cerebelosa: dedo-nariz con temblor intencional y marcha tambaleante (como borracho).",
  },
  {
    id: "tronco",
    name: "Tronco encefálico",
    latin: "Truncus encephali",
    category: "Funciones vitales",
    color: C.amber,
    short: "Controla la respiración, el ritmo cardíaco y los reflejos vitales.",
    func: "El 'centro de la vida': controla las funciones involuntarias esenciales — respiración, frecuencia cardíaca, presión arterial, deglución, tos, vómito y reflejos. Además es el paso de todas las vías entre el cerebro y la médula espinal. Se divide en: mesencéfalo, protuberancia (puente) y bulbo raquídeo (médula oblonga).",
    characteristics: [
      "Tres partes: mesencéfalo (arriba), protuberancia (medio, con el abultamiento) y bulbo (abajo).",
      "Contiene la formación reticular (alerta y consciencia).",
      "De allí salen casi todos los nervios craneales.",
      "Cruce de las vías motoras (decusación): el hemisferio derecho controla el lado izquierdo del cuerpo.",
    ],
    examTip:
      "El bulbo controla respiración y ritmo cardíaco: una lesión allí es MORTAL. Por eso en una autopsia el 'signo de la médula oblonga' marca la muerte cerebral.",
    mnemonic: "Mesencéfalo-Protuberancia-Bulbo: «Mi Perro Bostezó» (de arriba hacia abajo).",
  },
];

// ─────────────────── TEMA 3 · SURCOS Y GIROS ──────────────────
const surcos: Structure[] = [
  {
    id: "concepto",
    name: "¿Por qué existen?",
    latin: "Circunvoluciones cerebrales",
    category: "Concepto clave",
    color: C.pink,
    short: "Los pliegues multiplican el área de la corteza dentro del cráneo.",
    func: "Durante el desarrollo, la corteza cerebral crece más rápido que el cráneo y se PLIEGA, formando giros (crestas) y surcos (hendiduras). Así cabe mucha más superficie neuronal: la corteza extendida mide unos 2.200 cm² y contiene ~16.000 millones de neuronas.",
    characteristics: [
      "GIRO (circunvolución) = repliegue o cresta elevada.",
      "SURCO (sulcus) = hendidura entre dos giros.",
      "FISURA o CISURA = surco profundo y grande (p. ej., la cisura de Silvio).",
      "Los surcos dividen los hemisferios en lóbulos y sirven de referencias anatómicas.",
    ],
    examTip:
      "DEFINICIÓN PARA EL EXAMEN: 'Los giros y surcos aumentan la superficie de la corteza cerebral permitiendo más neuronas en el espacio reducido del cráneo.'",
    mnemonic: "«SURCO es el Surco de la calle (bajada), GIRO es la Gincha que sube».",
  },
  {
    id: "surco-central",
    name: "Surco central (de Rolando)",
    latin: "Sulcus centralis",
    category: "Surco",
    color: C.emerald,
    short: "Separa el lóbulo frontal del parietal.",
    func: "Es LA frontera más importante de la corteza: separa el lóbulo frontal del lóbulo parietal. Delante de él está la corteza motora (giro precentral); detrás, la somatosensorial (giro postcentral).",
    characteristics: [
      "Corre de arriba hacia abajo y adelante sobre la cara lateral del hemisferio.",
      "Límite entre corteza MOTORA (anterior) y SENSORIAL (posterior).",
      "También llamado cisura central o surco de Rolando.",
    ],
    examTip:
      "Rolando = 'la raya entre lo que MANDA (motor) y lo que SIENTE (sensitivo)'. ¡Se pregunta muchísimo!",
    mnemonic: "«Antes de Rolando muevo, después de Rolando siento».",
  },
  {
    id: "surco-lateral",
    name: "Surco lateral (de Silvio)",
    latin: "Sulcus lateralis",
    category: "Surco",
    color: C.orange,
    short: "Separa el lóbulo temporal de los lóbulos frontal y parietal.",
    func: "Gran hendidura que corre en diagonal por la cara lateral: separa el lóbulo temporal (abajo) de los lóbulos frontal y parietal (arriba). Es uno de los primeros surcos en formarse en el embrión. En su interior se oculta la ínsula (quinto lóbulo 'escondido').",
    characteristics: [
      "También llamado cisura de Silvio o fisura lateral.",
      "Tiene una rama anterior y una posterior en forma de 'Y'.",
      "Debajo corre el giro temporal superior (corteza auditiva).",
      "Esconde la ínsula de Reil.",
    ],
    examTip:
      "Silvio 'baña' al lóbulo temporal: es su techo. El área de Wernicke queda cerca de su extremo posterior.",
  },
  {
    id: "cisura-longitudinal",
    name: "Cisura interhemisférica",
    latin: "Fissura longitudinalis",
    category: "Cisura",
    color: C.violet,
    short: "Divide el cerebro en los dos hemisferios.",
    func: "Surco profundo y mediano que separa el cerebro en los hemisferios derecho e izquierdo. En su fondo se encuentra el cuerpo calloso, el gran puente de fibras que comunica ambos hemisferios.",
    characteristics: [
      "Es la cisura más visible vista desde arriba.",
      "Entre sus labios pasan las arterias cerebrales anteriores.",
      "En el fondo está el cuerpo calloso (comisura interhemisférica).",
    ],
    examTip:
      "PREGUNTA DIRECTA: '¿Qué separa la cisura interhemisférica?' → los DOS HEMISFERIOS. Y '¿qué los une?' → el CUERPO CALLOSO.",
  },
  {
    id: "surco-calcarino",
    name: "Surco calcarino",
    latin: "Sulcus calcarinus",
    category: "Surco",
    color: C.red,
    short: "En el lóbulo occipital: aquí vive la corteza visual primaria.",
    func: "Surco profundo en la cara medial del lóbulo occipital. A sus lados se encuentra la corteza visual primaria (V1, área 17 de Brodmann), donde llega la información proveniente de la retina a través del tálamo.",
    characteristics: [
      "Visto solo en la cara medial (corte sagital), no en la vista lateral.",
      "Forma un ángulo con el surco parieto-occipital ('espurio espolón calcarino').",
      "Define la zona donde se proyecta el campo visual.",
    ],
    examTip:
      "Si el examen pregunta '¿dónde está la corteza visual primaria?' → A LOS LADOS DEL SURCO CALCARINO (lóbulo occipital). NOTA CLÍNICA: el infarto de la arteria cerebral posterior (territorio calcarino) → HEMIANOPSIA CONTRALATERAL: pierdes la mitad del campo visual de ambos ojos.",
  },
  {
    id: "surco-parietooccipital",
    name: "Surco parieto-occipital",
    latin: "Sulcus parietooccipitalis",
    category: "Surco",
    color: C.teal,
    short: "Separa el lóbulo parietal del occipital (cara medial).",
    func: "Surco que marca el límite entre el lóbulo parietal y el occipital. En la cara lateral el límite es una línea imaginaria; en la cara medial es este surco bien visible.",
    characteristics: [
      "Muy visible en el corte sagital (cara medial).",
      "Sirve de referencia para delimitar el lóbulo occipital.",
      "Junto al surco calcarino forma una 'Y' invertida.",
    ],
    examTip:
      "En la vista LATERAL, el límite parieto-occipital es IMAGINARIO; en la MEDIAL es el surco parieto-occipital real.",
  },
  {
    id: "giro-precentral",
    name: "Giro precentral",
    latin: "Gyrus precentralis",
    category: "Giro",
    color: C.green,
    short: "Corteza motora primaria: ordena los movimientos voluntarios.",
    func: "Está justo DELANTE del surco central (en el lóbulo frontal). Es la corteza motora primaria (área 4 de Brodmann): envía las órdenes que producen los movimientos voluntarios del cuerpo. Tiene el mapa del cuerpo llamado homúnculo motor: las manos y la lengua ocupan enormes extensiones.",
    characteristics: [
      "Área 4 de Brodmann.",
      "Sus neuronas (células de Betz) viajan por la vía corticoespinal (piramidal).",
      "Homúnculo motor: mapa invertido del cuerpo (piernas arriba, lengua abajo).",
      "Su lesión causa parálisis del lado opuesto del cuerpo.",
    ],
    examTip:
      "«PRECENTRAL = MOTOR». Si el examen muestra un giro inmediatamente delante del surco de Rolando → corteza motora primaria. NOTA CLÍNICA: el infarto de la arteria cerebral media en este giro produce PARESIA ESPÁSTICA CONTRALATERAL (parálisis del lado opuesto).",
  },
  {
    id: "giro-postcentral",
    name: "Giro postcentral",
    latin: "Gyrus postcentralis",
    category: "Giro",
    color: C.amber,
    short: "Corteza somatosensorial: recibe las sensaciones del cuerpo.",
    func: "Está justo DETRÁS del surco central (en el lóbulo parietal). Es la corteza somatosensorial primaria (áreas 1, 2 y 3 de Brodmann): recibe tacto, presión, temperatura, dolor y posición de las articulaciones de todo el cuerpo. También tiene su homúnculo sensitivo.",
    characteristics: [
      "Áreas 1, 2 y 3 de Brodmann.",
      "Recibe los impulsos sensoriales que releva el tálamo.",
      "Homúnculo sensitivo: las zonas más sensibles (labios, manos) tienen más corteza.",
      "Su lesión produce pérdida de sensibilidad del lado opuesto.",
    ],
    examTip:
      "PAREJA CLÁSICA: Giro PREcentral (motor, frontal) ↔ Giro POSTcentral (sensorial, parietal), separados por el surco central.",
  },
  {
    id: "giros-frontales",
    name: "Giros frontales (superior, medio e inferior)",
    latin: "Gyri frontales",
    category: "Giro",
    color: C.lime,
    short: "Planificación motora avanzada; el inferior alberga el área de Broca.",
    func: "Las tres bandas horizontales del lóbulo frontal. El superior y el medio participan en la planificación del movimiento y las funciones ejecutivas. El giro frontal inferior contiene el área de Broca (hemisferio dominante), esencial para producir el habla.",
    characteristics: [
      "Ordenados de arriba hacia abajo: superior → medio → inferior.",
      "El inferior contiene el opérculo y las zonas triangular y orbitaria.",
      "Área de Broca (áreas 44 y 45) en el frontal inferior del hemisferio dominante (izquierdo en ~95%).",
    ],
    examTip:
      "Broca está en el GIRO FRONTAL INFERIOR. Lesión → sabe lo que quiere decir pero no puede articarlo (afasia expresiva).",
  },
  {
    id: "giros-temporales",
    name: "Giros temporales (superior, medio e inferior)",
    latin: "Gyri temporales",
    category: "Giro",
    color: C.grape,
    short: "Audición y lenguaje comprensivo; el superior alberga Wernicke.",
    func: "Tres bandas paralelas del lóbulo temporal, paralelas al surco de Silvio. En el giro temporal superior está la corteza auditiva primaria (áreas 41 y 42) y, hacia atrás, el área de Wernicke (comprensión del lenguaje, hemisferio dominante).",
    characteristics: [
      "Corren paralelos al surco lateral (de Silvio).",
      "Superior: audición + comprensión del lenguaje (Wernicke).",
      "Medio e inferior: reconocimiento de objetos y caras, memoria visual.",
    ],
    examTip:
      "Wernicke está en el GIRO TEMPORAL SUPERIOR POSTERIOR. Lesión → habla fluida sin sentido (afasia receptiva).",
  },
  {
    id: "giros-parietales",
    name: "Giro supramarginal y angular",
    latin: "Gyrus supramarginalis et angularis",
    category: "Giro",
    color: C.cyan,
    short: "Integran lenguaje, lectura, escritura y cálculo (parietal).",
    func: "Dos giros del lóbulo parietal que rodean el final del surco de Silvio. El supramarginal y el angular integran la información auditiva, visual y táctil del lenguaje: son esenciales para leer, escribir y calcular.",
    characteristics: [
      "El supramarginal 'abraza' el extremo posterior del surco lateral.",
      "El angular rodea el surco temporal superior.",
      "Zonas polisensoriales de asociación (áreas 39 y 40).",
    ],
    examTip:
      "Lesión del giro ANGULAR (hemisferio dominante) → alexia y agrafia (no lee ni escribe) y acalculia. ¡Combinación de examen!",
  },
  {
    id: "lobulillo-parietal-superior",
    name: "Lobulillo parietal superior",
    latin: "Lobulus parietalis superior",
    category: "Lobulillo parietal",
    color: C.rose,
    short: "Orientación espacial y percepción de la imagen corporal.",
    func: "Zona posterior del lóbulo parietal, entre el giro postcentral y el surco parieto-occipital, por encima del surco intraparietal. Interviene en la orientación espacial y en la percepción de la imagen corporal (esquema corporal): sabe dónde está tu cuerpo, qué tamaño ocupa y qué relación tiene con los objetos alrededor.",
    characteristics: [
      "Separado del lobulillo parietal inferior por el surco intraparietal.",
      "Integra vista + tacto + propiocepción para ubicar el cuerpo en el espacio.",
      "Contiene áreas de asociación somatosensoriales secundarias.",
      "Su cara medial contiene el precúneo.",
    ],
    examTip:
      "FRASE DE LA LÁMINA: 'El lóbulo (lobulillo) parietal superior interviene en la orientación espacial y en la percepción de la imagen corporal.' Su lesión (lado derecho) → heminegligencia: ignoras la mitad izquierda del cuerpo y del espacio.",
  },
  {
    id: "cortex-insular",
    name: "Córtex insular",
    latin: "Cortex insularis",
    category: "Corteza profunda",
    color: C.pink,
    short: "Corteza oculta en el fondo del surco de Silvio; múltiples funciones viscerales.",
    func: "Región profunda de la corteza cerebral, oculta en el fondo del surco lateral (de Silvio) y cubierta por los opérculos frontal y temporal. Interviene en múltiples funciones viscerales: el gusto, la sensibilidad interna del cuerpo, el dolor y las emociones. Es la superficie visible del lóbulo de la ínsula.",
    characteristics: [
      "Elemento 10 de la lámina 2.2 (Córtex insular).",
      "Para verla hay que separar los labios del surco de Silvio.",
      "Interviene en múltiples funciones viscerales (gusto, estado interno, dolor).",
      "Es la superficie de la ínsula, el quinto lóbulo 'escondido'.",
    ],
    examTip:
      "Si el examen pide una 'región profunda del córtex que interviene en múltiples funciones viscerales' → CÓRTEX INSULAR, escondida en el surco lateral (de Silvio).",
  },
  {
    id: "giro-cingulado-sg",
    name: "Giro cingulado",
    latin: "Gyrus cinguli",
    category: "Giro (cara medial)",
    color: C.fuchsia,
    short: "Anillo límbico sobre el cuerpo calloso; emoción + atención.",
    func: "Giro de la cara medial que forma un cinturón sobre el cuerpo calloso. Es la gran estación de paso del sistema límbico: conecta la corteza con las emociones, participa en la atención, la motivación y la percepción del dolor emocional.",
    characteristics: [
      "Visto en el corte sagital, no en la vista lateral.",
      "Forma parte del circuito de Papez.",
      "Limita por abajo con el surco del cuerpo calloso y por arriba con el surco cingulado.",
    ],
    examTip:
      "En un corte sagital, el anillo que envuelve al cuerpo calloso SIEMPRE es el giro cingulado. Regla de oro del examen.",
  },
];

// ───────────────────────── TÓPICOS ────────────────────────────
export const TOPICS: Topic[] = [
  {
    id: "limbico",
    title: "Sistema Límbico",
    subtitle: "El cerebro emocional",
    icon: "HeartPulse",
    description:
      "Red de estructuras que gestiona emociones, memoria, motivación y homeostasis. Toca cada estructura para descubrir su función.",
    structures: limbico,
  },
  {
    id: "lobulos",
    title: "Lóbulos Cerebrales",
    subtitle: "Los 5 departamentos del cerebro",
    icon: "Brain",
    description:
      "Frontal, parietal, temporal, occipital e ínsula (el lóbulo profundo), más el cerebelo y el tronco encefálico. Toca cada zona del diagrama.",
    structures: lobulos,
  },
  {
    id: "surcos",
    title: "Surcos y Giros",
    subtitle: "El mapa plegado de la corteza",
    icon: "Route",
    description:
      "Las hendiduras (surcos) y crestas (giros) que organizan la corteza y sirven de frontera entre áreas funcionales.",
    structures: surcos,
  },
];

// ─────────────────── BANCO DE PREGUNTAS ───────────────────────
export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // índice
  explanation: string;
  topic: TopicId;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    question: "¿Qué estructura del sistema límbico consolida la memoria a largo plazo?",
    options: ["Amígdala", "Hipocampo", "Tálamo", "Núcleo accumbens"],
    correct: 1,
    explanation:
      "El hipocampo convierte la memoria a corto plazo en memoria a largo plazo. Su lesión causa amnesia anterógrada (paciente H.M.).",
    topic: "limbico",
  },
  {
    question: "¿Cuál es el ÚNICO sentido que NO pasa por el tálamo antes de llegar a la corteza?",
    options: ["La vista", "El oído", "El olfato", "El tacto"],
    correct: 2,
    explanation:
      "El olfato va directo a la corteza olfatoria y al sistema límbico, sin relevo talámico. ¡Pregunta clásica de examen!",
    topic: "limbico",
  },
  {
    question: "La amígdala se especializa principalmente en…",
    options: [
      "Regular la temperatura corporal",
      "Procesar el miedo y las emociones intensas",
      "Coordinar el equilibrio",
      "Filtrar la información visual",
    ],
    correct: 1,
    explanation:
      "La amígdala es la 'alarma' emocional: detecta amenazas y activa la respuesta de lucha o huida.",
    topic: "limbico",
  },
  {
    question: "¿Qué estructura es el principal centro de recompensa y placer del cerebro?",
    options: ["Fórnix", "Cuerpos mamilares", "Núcleo accumbens", "Giro cingulado"],
    correct: 2,
    explanation:
      "El núcleo accumbens libera dopamina en el circuito de recompensa. Todas las drogas adictivas actúan sobre él.",
    topic: "limbico",
  },
  {
    question: "El hipotálamo se encarga fundamentalmente de…",
    options: [
      "La homeostasis: hambre, sed, temperatura y hormonas",
      "El procesamiento del lenguaje",
      "La memoria espacial",
      "La visión en color",
    ],
    correct: 0,
    explanation:
      "El hipotálamo mantiene el equilibrio interno (homeostasis) y controla la hipófisis: es el puente entre sistema nervioso y endocrino.",
    topic: "limbico",
  },
  {
    question: "¿Cuál es el orden correcto del circuito de Papez?",
    options: [
      "Hipocampo → Fórnix → Cuerpos mamilares → Tálamo anterior → Giro cingulado",
      "Hipocampo → Tálamo → Amígdala → Fórnix → Hipotálamo",
      "Amígdala → Hipocampo → Cerebelo → Tálamo → Corteza",
      "Fórnix → Hipocampo → Giro cingulado → Hipotálamo → Tálamo",
    ],
    correct: 0,
    explanation:
      "«Héctor Fuma Cola Toda la Cena»: Hipocampo, Fórnix, Cuerpos mamilares, Tálamo anterior, Giro cingulado.",
    topic: "limbico",
  },
  {
    question: "¿Qué lóbulo contiene la corteza visual primaria?",
    options: ["Frontal", "Parietal", "Temporal", "Occipital"],
    correct: 3,
    explanation:
      "El lóbulo occipital aloja la corteza visual primaria (V1), a ambos lados del surco calcarino.",
    topic: "lobulos",
  },
  {
    question: "El área de Broca, encargada de PRODUCIR el habla, se encuentra en…",
    options: [
      "El lóbulo frontal (giro frontal inferior)",
      "El lóbulo temporal (giro temporal superior)",
      "El lóbulo parietal (giro postcentral)",
      "El lóbulo occipital",
    ],
    correct: 0,
    explanation:
      "El área de Broca está en el giro frontal inferior. Su lesión causa afasia motora: entiende, pero no puede hablar bien.",
    topic: "lobulos",
  },
  {
    question: "El área de Wernicke, clave para COMPRENDER el lenguaje, está en…",
    options: ["El lóbulo occipital", "El lóbulo temporal (giro temporal superior)", "El giro precentral", "El cerebelo"],
    correct: 1,
    explanation:
      "Wernicke está en el giro temporal superior posterior. Su lesión produce habla fluida pero sin sentido (afasia receptiva).",
    topic: "lobulos",
  },
  {
    question: "¿Qué lóbulo procesa el tacto, la temperatura y la posición del cuerpo?",
    options: ["Parietal", "Frontal", "Temporal", "Occipital"],
    correct: 0,
    explanation:
      "El lóbulo parietal contiene la corteza somatosensorial (giro postcentral), que recibe las sensaciones corporales.",
    topic: "lobulos",
  },
  {
    question: "El cerebelo se encarga principalmente de…",
    options: [
      "La memoria a largo plazo",
      "Coordinar el movimiento fino, el equilibrio y la postura",
      "Producir las emociones",
      "Regular las hormonas",
    ],
    correct: 1,
    explanation:
      "El cerebelo afina los movimientos voluntarios y guarda la memoria procedural (andar en bici, bailar).",
    topic: "lobulos",
  },
  {
    question: "¿Qué parte del tronco encefálico controla la respiración y el ritmo cardíaco?",
    options: ["El mesencéfalo", "La protuberancia", "El bulbo raquídeo", "El tálamo"],
    correct: 2,
    explanation:
      "El bulbo raquídeo (médula oblonga) alberga los centros respiratorio y cardiovascular. Su lesión es mortal.",
    topic: "lobulos",
  },
  {
    question: "El surco central (de Rolando) separa…",
    options: [
      "El lóbulo frontal del parietal",
      "El lóbulo temporal del frontal",
      "Los dos hemisferios cerebrales",
      "El parietal del occipital",
    ],
    correct: 0,
    explanation:
      "El surco de Rolando es la frontera entre frontal (motor, adelante) y parietal (sensitivo, atrás).",
    topic: "surcos",
  },
  {
    question: "El giro PREcentral es la corteza…",
    options: ["Somatosensorial primaria", "Motora primaria", "Visual primaria", "Auditiva primaria"],
    correct: 1,
    explanation:
      "«Antes de Rolando muevo»: el giro precentral (frontal) es la corteza motora primaria (área 4).",
    topic: "surcos",
  },
  {
    question: "El giro POSTcentral es la corteza…",
    options: ["Motora primaria", "Somatosensorial primaria", "Olfatoria", "De Broca"],
    correct: 1,
    explanation:
      "«Después de Rolando siento»: el giro postcentral (parietal) es la corteza somatosensorial primaria (áreas 1-3).",
    topic: "surcos",
  },
  {
    question: "El surco lateral (de Silvio) separa el lóbulo temporal de…",
    options: [
      "El cerebelo",
      "Los lóbulos frontal y parietal",
      "El lóbulo occipital",
      "La médula espinal",
    ],
    correct: 1,
    explanation:
      "La cisura de Silvio corre diagonal y es el 'techo' del lóbulo temporal, separándolo de frontal y parietal.",
    topic: "surcos",
  },
  {
    question: "¿Cuál es la función de los pliegues (giros y surcos) de la corteza?",
    options: [
      "Producir líquido cefalorraquídeo",
      "Aumentar el área de corteza para más neuronas",
      "Enfriar el cerebro",
      "Conectar los dos hemisferios",
    ],
    correct: 1,
    explanation:
      "El plegamiento permite que quepan unos 2.200 cm² de corteza y ~16.000 millones de neuronas dentro del cráneo.",
    topic: "surcos",
  },
  {
    question: "¿Qué separa la cisura interhemisférica y qué los une?",
    options: [
      "Separa los hemisferios; los une el cuerpo calloso",
      "Separa los lóbulos; los une el tálamo",
      "Separa el cerebelo; lo une el bulbo",
      "Separa la corteza; la une el fórnix",
    ],
    correct: 0,
    explanation:
      "La cisura interhemisférica divide los dos hemisferios y en su fondo el cuerpo calloso los comunica.",
    topic: "surcos",
  },
  {
    question: "¿Dónde se ubica la corteza visual primaria respecto al surco calcarino?",
    options: [
      "Encima del surco",
      "A los lados del surco calcarino (occipital medial)",
      "Debajo del surco lateral",
      "En el giro precentral",
    ],
    correct: 1,
    explanation:
      "La corteza visual primaria (V1, área 17) se encuentra a ambos lados del surco calcarino, en la cara medial del occipital.",
    topic: "surcos",
  },
  {
    question: "El fórnix conecta…",
    options: [
      "El hipocampo con los cuerpos mamilares",
      "El tálamo con el cerebelo",
      "La retina con el occipital",
      "Los dos hemisferios",
    ],
    correct: 0,
    explanation:
      "El fórnix es el 'cable' en arco que lleva la información del hipocampo a los cuerpos mamilares, cerrando el circuito de Papez.",
    topic: "limbico",
  },
  {
    question: "¿Qué estructura conecta los hemisferios derecho e izquierdo y permite que intercambien información?",
    options: ["El fórnix", "El cuerpo calloso", "El giro cingulado", "El tálamo"],
    correct: 1,
    explanation:
      "El cuerpo calloso es la mayor comisura del cerebro: un puente de ~200 millones de fibras que une ambos hemisferios. En el corte sagital es el arco claro central, debajo del giro cingulado.",
    topic: "limbico",
  },
  {
    question: "Los ganglios basales participan principalmente en…",
    options: [
      "El control y coordinación del movimiento y el aprendizaje de hábitos",
      "Formar y consolidar recuerdos nuevos",
      "Distribuir la información sensorial hacia la corteza",
      "Procesar el miedo y la amenaza",
    ],
    correct: 0,
    explanation:
      "Los ganglios basales (caudado, putamen, globo pálido…) controlan y coordinan el movimiento e intervienen en el aprendizaje de hábitos, la motivación y la recompensa. Su lesión no causa parálisis: causa Parkinson o Huntington.",
    topic: "limbico",
  },
  {
    question: "¿Cuál es el lóbulo PROFUNDO, cubierto por los otros lóbulos, que se esconde en el surco de Silvio?",
    options: ["La ínsula", "El lóbulo occipital", "El lóbulo temporal", "El lóbulo parietal"],
    correct: 0,
    explanation:
      "La ínsula (quinto lóbulo) está profunda, cubierta por los demás. Procesa el gusto, el dolor, las emociones y la percepción interna del cuerpo.",
    topic: "lobulos",
  },
  {
    question: "La ínsula participa en…",
    options: [
      "La percepción interna del cuerpo, el gusto, el dolor y las emociones",
      "La visión de formas y colores",
      "La producción del habla",
      "El control de la respiración y el ritmo cardíaco",
    ],
    correct: 0,
    explanation:
      "Resumen de la profe: Frontal→pensar y actuar, Parietal→sentir, Temporal→oír y recordar, Occipital→ver, ÍNSULA→sentir el estado interno del cuerpo (gusto, dolor, emociones, respuestas corporales).",
    topic: "lobulos",
  },
  {
    question: "¿Qué estructura interviene en la orientación espacial y en la percepción de la imagen corporal?",
    options: [
      "El lobulillo parietal superior",
      "El giro frontal inferior",
      "El giro temporal medio",
      "El polo occipital",
    ],
    correct: 0,
    explanation:
      "El lobulillo parietal superior (encima del surco intraparietal) maneja la orientación espacial y el esquema corporal. Su lesión derecha causa heminegligencia.",
    topic: "surcos",
  },
  {
    question: "El infarto de la arteria cerebral posterior que afecta el surco calcarino produce…",
    options: [
      "Hemianopsia contralateral (pierde la mitad del campo visual)",
      "Paresia espástica contralateral",
      "Afasia de Broca",
      "Amnesia anterógrada",
    ],
    correct: 0,
    explanation:
      "A los lados del surco calcarino está la corteza visual primaria (V1). Su lesión → hemianopsia contralateral: ceguera de la mitad del campo visual de ambos ojos.",
    topic: "surcos",
  },
  {
    question: "El infarto de la arteria cerebral media que daña el giro precentral produce…",
    options: [
      "Paresia espástica contralateral",
      "Hemianopsia contralateral",
      "Pérdida de la audición",
      "Agnosia visual",
    ],
    correct: 0,
    explanation:
      "El giro precentral es la corteza motora primaria. Su lesión vascular (arteria cerebral media) produce paresia espástica del lado OPUESTO del cuerpo.",
    topic: "surcos",
  },
  {
    question: "El córtex insular se encuentra…",
    options: [
      "En el fondo del surco lateral (de Silvio) e interviene en funciones viscerales",
      "En la cara medial del lóbulo occipital",
      "Justo delante del surco central de Rolando",
      "En el fondo de la cisura interhemisférica",
    ],
    correct: 0,
    explanation:
      "El córtex insular es una región profunda oculta en el surco de Silvio; interviene en múltiples funciones viscerales (gusto, estado interno del cuerpo, dolor).",
    topic: "surcos",
  },
];

// ───────────────────────── UTILIDADES ─────────────────────────
export function getTopic(id: TopicId): Topic {
  return TOPICS.find((t) => t.id === id) ?? TOPICS[0];
}

export function findStructure(topicId: TopicId, structureId: string): Structure | undefined {
  return getTopic(topicId).structures.find((s) => s.id === structureId);
}

export const TOTAL_STRUCTURES = TOPICS.reduce((acc, t) => acc + t.structures.length, 0);
