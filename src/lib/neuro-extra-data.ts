// ─────────────────────────────────────────────────────────────
//  NeuroAtlas · Temas del EXAMEN PRÁCTICO (Unidades 1 y 2)
//  División del SN · Meninges · Planos · Áreas funcionales
//  Ventrículos y LCR · Tallo cerebral
//  Fuente: guía de estudio "Examen Componente Práctico 1" (neuroanatomía general)
// ─────────────────────────────────────────────────────────────

export type ExtraTopicId =
  | "division"
  | "meninges"
  | "planos"
  | "areas"
  | "ventriculos"
  | "tallo";

export interface ExtraStructure {
  id: string;
  name: string;
  latin: string;
  category: string;
  /** color hex usado en el diagrama y badges */
  color: string;
  /** resumen de 1 línea (para leyenda) */
  short: string;
  /** función principal (párrafo) */
  func: string;
  /** límites / relaciones anatómicas (criterio 2 de la rúbrica) */
  limits: string;
  /** lista de características */
  characteristics: string[];
  /** dato clave para el examen */
  examTip: string;
  /** regla mnemotécnica opcional */
  mnemonic?: string;
  /** sinónimos aceptados en el simulador práctico */
  alt?: string[];
}

export interface ExtraTopic {
  id: ExtraTopicId;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  structures: ExtraStructure[];
}

const C = {
  rose: "#f43f5e",
  amber: "#f59e0b",
  emerald: "#10b981",
  fuchsia: "#d946ef",
  violet: "#8b5cf6",
  orange: "#f97316",
  teal: "#14b8a6",
  pink: "#ec4899",
  yellow: "#eab308",
  red: "#ef4444",
  green: "#22c55e",
  grape: "#a855f7",
  cyan: "#06b6d4",
};

// ─────────── TEMA 1 · DIVISIÓN DEL SISTEMA NERVIOSO ───────────
const division: ExtraStructure[] = [
  {
    id: "snc",
    name: "Sistema Nervioso Central (SNC)",
    latin: "Systema nervosum centrale",
    category: "Integración",
    color: C.violet,
    short: "El centro de mando: encéfalo + médula espinal, protegidos por hueso.",
    func: "Recibe, integra y decide: procesa toda la información sensorial y genera las respuestas motoras y conscientes. Es el cuartel general del cuerpo.",
    limits:
      "Totalmente protegido por hueso: el encéfalo dentro del cráneo y la médula espinal dentro del conducto vertebral. Por fuera están envueltos por las 3 meninges y flotan en LCR.",
    characteristics: [
      "Formado por el encéfalo (cerebro, cerebelo y tronco encefálico) y la médula espinal.",
      "Sustancia gris = cuerpos neuronales; sustancia blanca = axones mielinizados.",
      "La mielinización la hacen los oligodendrocitos (en el SNP lo hace la célula de Schwann).",
      "Sus células: neuronas + glía (astrocitos, oligodendrocitos, microglía, ependimarias).",
    ],
    examTip:
      "Pregunta clásica: '¿qué forma el SNC?' → ENCÉFALO + MÉDULA ESPINAL. Los nervios y ganglios son SNP, nunca SNC.",
    mnemonic: "SNC = Seguro y Central: guardado en hueso, manda sobre todo.",
    alt: ["sistema nervioso central", "snc", "central"],
  },
  {
    id: "encefalo",
    name: "Encéfalo",
    latin: "Encephalon",
    category: "SNC",
    color: C.fuchsia,
    short: "Cerebro + cerebelo + tronco encefálico, dentro del cráneo.",
    func: "Controla percepción, lenguaje, movimiento, emociones, memoria y toda función consciente; el tronco encefálico además gobierna las funciones vitales.",
    limits:
      "Ocupa la cavidad craneal y termina por abajo en el FORAMEN MAGNO, donde el bulbo se continúa con la médula espinal. Flota en LCR (peso real ~1,4 kg, aparente ~50 g).",
    characteristics: [
      "Se divide en: prosencéfalo (telencéfalo + diencéfalo), mesencéfalo y rombencéfalo (puente, bulbo, cerebelo).",
      "Pesa ~1,4 kg y consume ~20% de la energía del cuerpo.",
      "Sus 3 envolturas: meninges (duramadre, aracnoides, piamadre).",
      "Se alimenta casi exclusivamente de glucosa.",
    ],
    examTip:
      "El límite clásico: el encéfalo TERMINA en el foramen magno; desde ahí hacia abajo todo es médula espinal. Ese dato de 'límites' suma en la rúbrica.",
    alt: ["cerebro", "encefalo"],
  },
  {
    id: "medula",
    name: "Médula Espinal",
    latin: "Medulla spinalis",
    category: "SNC",
    color: C.pink,
    short: "Cable de ~45 cm: vía de comunicación y centro de reflejos.",
    func: "Conducto bidireccional: sube la información sensorial al encéfalo y bajan las órdenes motoras. Además es el centro de los reflejos (rodillazo, retiro de la mano) y de reflejos autónomos.",
    limits:
      "Va del foramen magno hasta L1-L2 (cono medular), de donde sigue el filum terminale. Rodeada por meninges y LCR; de ella nacen los 31 pares de nervios espinales.",
    characteristics: [
      "31 pares de nervios espinales: 8 cervicales, 12 torácicos, 5 lumbares, 5 sacros, 1 coccígeo.",
      "Sustancia gris en forma de 'H': cuernos anteriores (motor) y posteriores (sensitivo).",
      "Termina en L1-L2: por eso la punción lumbar se hace en L3-L4 / L4-L5, para no lastimarla.",
      "La cauda equina ('cola de caballo') son las raíces que cuelgan bajo el cono medular.",
    ],
    examTip:
      "Cuernos ANTERIORES = motor; POSTERIORES = sensorial. Y la médula termina en L1-L2, no a la altura de la cintura como se suele creer.",
    mnemonic: "Anterior-Actúa (motor) · Posterior-Percibe (sensorial).",
    alt: ["medula espinal", "medula"],
  },
  {
    id: "snp",
    name: "Sistema Nervioso Periférico (SNP)",
    latin: "Systema nervosum periphericum",
    category: "Comunicación",
    color: C.emerald,
    short: "Nervios y ganglios: las carreteras entre el SNC y el cuerpo.",
    func: "Red de comunicación: lleva la información sensorial de los receptores al SNC (vías aferentes) y transporta las órdenes motoras del SNC a los músculos y glándulas (vías eferentes).",
    limits:
      "Todo lo que está FUERA del cráneo y del conducto vertebral: 12 pares de nervios craneales, 31 pares de nervios espinales, ganglios y plexos (braquial, lumbosacro…).",
    characteristics: [
      "Se divide funcionalmente en somático (voluntario) y autónomo (involuntario).",
      "Sus axones SÍ se regeneran (a diferencia del SNC).",
      "La mielina la produce la célula de Schwann.",
      "Los ganglios = cúmulos de cuerpos neuronales fuera del SNC.",
    ],
    examTip:
      "Si la pregunta dice 'nervios y ganglios' → SNP. Si dice 'encéfalo y médula espinal' → SNC. Distinción que cae todos los años.",
    mnemonic: "SNP = la red de caminos: Sensible Nace, Periférico Pasa.",
    alt: ["sistema nervioso periférico", "sistema nervioso periferico", "snp", "periférico", "periferico"],
  },
  {
    id: "somatico",
    name: "Sistema Somático (voluntario)",
    latin: "Systema nervosum somaticum",
    category: "SNP",
    color: C.amber,
    short: "Movimiento voluntario y sensibilidad del cuerpo y la piel.",
    func: "Gobierna los actos voluntarios: conduce el impulso desde la corteza hasta los músculos esqueléticos y transmite toda la sensibilidad somática (tacto, dolor, temperatura, propiocepción).",
    limits:
      "Va del córtex motor y las vías sensitivas del SNC, por los nervios craneales y espinales, hasta los músculos esqueléticos y la piel.",
    characteristics: [
      "Su diana: músculo esquelético.",
      "Vía motora de UNA sola neurona (sin relevo en ganglio).",
      "Neurotransmisor en la placa motora: acetilcolina.",
      "Controla actos voluntarios y también reflejos espinales.",
    ],
    examTip:
      "Comparación de rúbrica: somático = 1 neurona, sin ganglio, músculo esquelético. Autónomo = 2 neuronas con ganglio, músculo liso/cardíaco y glándulas.",
    alt: ["sistema somático", "sistema somatico", "sistema nervioso somático", "somatico", "somático"],
  },
  {
    id: "autonomo",
    name: "Sistema Autónomo (SNA)",
    latin: "Systema nervosum autonomicum",
    category: "SNP",
    color: C.teal,
    short: "El piloto automático: vísceras, corazón y glándulas.",
    func: "Regula de forma involuntaria el medio interno: corazón, presión, digestión, respiración, pupilas, vejiga, sudoración. Mantiene la homeostasis sin que lo pienses.",
    limits:
      "Sus centros superiores están en el hipotálamo y el tronco encefálico; sus fibras salen del SNC y SIEMPRE hacen relevo en un ganglio (2 neuronas: preganglionar + posganglionar).",
    characteristics: [
      "Se divide en simpático, parasimpático y sistema entérico (del intestino).",
      "Vía de 2 neuronas con ganglio intermedio (por eso el ganglio es su 'sinapsis extra').",
      "Inerva músculo liso, cardíaco y glándulas.",
      "El hipotálamo es su jefe supremo (conexión límbico-visceral).",
    ],
    examTip: "SNA = 2 neuronas + ganglio. Somático = 1 neurona sin ganglio. ¡Pregunta favorita!",
    mnemonic: "Autónomo = Autopilot: corazón, tripas y glándulas funcionan solos.",
    alt: ["sistema autónomo", "sistema autonomo", "sistema nervioso autónomo", "sna", "autonomo", "autónomo"],
  },
  {
    id: "simpatico",
    name: "Simpático",
    latin: "Pars sympathica",
    category: "SNA",
    color: C.red,
    short: "Lucha o huida: acelera el cuerpo ante una amenaza.",
    func: "Prepara el cuerpo para la acción: acelera el corazón, dilata las pupilas, inhibe la digestión, libera adrenalina de la médula suprarrenal, sube la glucosa y activa la sudoración.",
    limits:
      "Nace de la médula espinal en los segmentos T1-L2 (por eso se llama TORACOLUMBAR); sus ganglios forman dos cadenas paravertebrales a los lados de la columna.",
    characteristics: [
      "Fibras preganglionares cortas, posganglionares largas (ganglio cerca de la médula).",
      "Neurotransmisor posganglionar: noradrenalina (excepto sudoríparas = acetilcolina).",
      "Respuesta difusa y global: activa todo el cuerpo a la vez.",
      "Efectos: taquicardia, midriasis, broncodilatación, vasoconstricción cutánea.",
    ],
    examTip:
      "Simpático = TORACOLUMBAR (T1-L2). Si el caso muestra taquicardia + midriasis + sudoración → simpático activado.",
    mnemonic: "Sim-PÁTICO se PÁNICA: lucha o huida.",
    alt: ["sistema simpático", "sistema simpatico", "simpatico", "simpático"],
  },
  {
    id: "parasimpatico",
    name: "Parasimpático",
    latin: "Pars parasympathica",
    category: "SNA",
    color: C.green,
    short: "Descanso y digestión: repara y ahorra energía.",
    func: "Devuelve el cuerpo a la calma: frena el corazón, contrae la pupila, estimula la digestión, las secreciones y vacía la vejiga. Es 'descansar y digerir'.",
    limits:
      "Nace del tronco encefálico (pares craneales III, VII, IX y X) y de los segmentos sacros S2-S4 → por eso se llama CRANEOSACRO. El nervio vago (X) inerva corazón, pulmones y abdomen.",
    characteristics: [
      "Fibras preganglionares largas, posganglionares cortas (ganglio cerca del órgano).",
      "Neurotransmisor en ambas neuronas: acetilcolina.",
      "El vago (X) lleva la mayor parte de sus fibras.",
      "Efectos: miosis, bradicardia, salivación, peristaltismo, contracción de la vejiga.",
    ],
    examTip:
      "Comparación estrella: Parasimpático = CRANEOSACRO (III, VII, IX, X + S2-S4) · Simpático = TORACOLUMBAR (T1-L2). Escribe los dos juntos en el examen.",
    mnemonic: "P de Paella y Paz: parasimpático = digestión y tranquilidad.",
    alt: ["sistema parasimpático", "sistema parasimpatico", "parasimpatico", "parasimpático"],
  },
];

// ─────────────────── TEMA 2 · MENINGES ───────────────────
const meninges: ExtraStructure[] = [
  {
    id: "duramadre",
    name: "Duramadre",
    latin: "Dura mater",
    category: "Meninge externa",
    color: C.orange,
    short: "La más gruesa y externa: escudo fibroso con senos venosos.",
    func: "Barrera protectora más fuerte: envuelve el SNC, forma los senos venosos durales (donde se reabsorbe el LCR) y los tabiques (hoz del cerebro, tentorio) que estabilizan el encéfalo.",
    limits:
      "La más externa: en el cráneo está pegada al periostio (doble capa: periostial + meníngea); por dentro se separa de la aracnoides. En la columna deja espacio epidural y baja hasta S2.",
    characteristics: [
      "Doble capa craneal: periostial (externa) y meníngea (interna).",
      "Forma la hoz del cerebro (falx), el tentorio de la cerebelosa y la hoz del cerebelo.",
      "En su espesor corren los senos venosos (sagital superior, transversos, sigmoideos).",
      "Muy sensible al dolor: origen del dolor en meningitis y migraña.",
    ],
    examTip:
      "Los senos venosos corren EN la duramadre y por ellos el LCR vuelve a la sangre (vía granulaciones aracnoideas). Hematoma EPIDURAL = sangre entre hueso y duramadre (arteria meníngea media rota).",
    mnemonic: "Dura = DURA de romper: la coraza externa.",
    alt: ["dura mater", "dura", "duramadre"],
  },
  {
    id: "aracnoides",
    name: "Aracnoides",
    latin: "Arachnoidea mater",
    category: "Meninge media",
    color: C.cyan,
    short: "Capa delicada de 'telaraña' que salta sobre los surcos.",
    func: "Capa intermedia avascular: sus trabéculas sostienen el encéfalo dentro del baño de LCR y sus granulaciones devuelven el LCR a la sangre venosa.",
    limits:
      "Entre la duramadre (fuera) y la piamadre (dentro); por debajo queda el espacio subaracnoideo con LCR. NO entra en los surcos: los salta.",
    characteristics: [
      "Avascular y translúcida (arachne = araña).",
      "Las granulaciones aracnoideas (Pacchioni) la atraviesan junto a la duramadre hasta el seno sagital superior.",
      "El 'espacio subdural' es solo un plano potencial: el hematoma subdural nace de venas puente desgarradas.",
      "Forma cisternas donde el espacio subaracnoideo se ensancha (cisterna magna).",
    ],
    examTip:
      "Hematoma SUBDURAL = sangrado bajo la duramadre por ruptura de venas puente (típico tras traumatismo en ancianos/alcohólicos). La aracnoides es avascular.",
    mnemonic: "ARAC-NOIDES = telaraña (arachne) sobre el río de LCR.",
    alt: ["aracnoidea", "aracnoid", "aracnoides"],
  },
  {
    id: "piamadre",
    name: "Piamadre",
    latin: "Pia mater",
    category: "Meninge interna",
    color: C.rose,
    short: "La más íntima y vascular: abraza cada surco del córtex.",
    func: "Membrana muy delgada y rica en vasos que se pega a toda la superficie del SNC, entra en todos los surcos y acompaña a los vasos que penetran el tejido nervioso.",
    limits:
      "La más interna: adherida al parénquima. Con la aracnoides delimita el espacio subaracnoideo. Forma el filum terminale y participa en los plexos coroides.",
    characteristics: [
      "La más delgada y la única muy vascularizada.",
      "La ÚNICA que sigue fielmente surcos y circunvoluciones.",
      "Con la ependima forma la tela coroidea de los plexos.",
      "Continúa por la médula como línea terminal y filum terminale.",
    ],
    examTip:
      "Orden de afuera hacia adentro (cae seguro): Duramadre → Aracnoides → Piamadre (DAP). Y la piamadre es la única que entra en los surcos.",
    mnemonic: "DAP: De Afuera Pa'dentro.",
    alt: ["pia mater", "pia", "piamadre"],
  },
  {
    id: "subaracnoideo",
    name: "Espacio Subaracnoideo",
    latin: "Spatium subarachnoideum",
    category: "Espacio meníngeo",
    color: C.emerald,
    short: "Río de LCR entre aracnoides y piamadre, con cisternas.",
    func: "Contiene el LCR que amortigua el encéfalo, nutre y retira desechos. Por él discurren las arterias del polígono de Willis y los nervios craneales antes de salir del cráneo.",
    limits:
      "Entre la aracnoides y la piamadre. Se ensancha en las cisternas de la base (cisterna magna o cerebelomedular, interpeduncular, quiasmática). Recibe el LCR del IV ventrículo por Luschka y Magendie.",
    characteristics: [
      "Lleno de LCR (~150 ml en total en el adulto).",
      "La hemorragia subaracnoidea es sangre en este espacio (aneurisma roto; cefalea en 'trueno').",
      "Las cisternas son ensanchamientos clave en el corte sagital.",
      "Aquí se toma el LCR en la punción lumbar (L3-L4 / L4-L5).",
    ],
    examTip:
      "Hemorragia SUBARACNOIDEA = sangre en este espacio (cefalea súbita 'en trueno'). Es el espacio que recibe el LCR que sale del IV ventrículo.",
    mnemonic: "Sub-ARACNOIDEO: debajo de la aracnoides, lógico.",
    alt: ["espacio subaracnoideo", "subaracnoideo"],
  },
  {
    id: "granulaciones",
    name: "Granulaciones Aracnoideas",
    latin: "Granulationes arachnoideae (Pacchioni)",
    category: "Reabsorción de LCR",
    color: C.yellow,
    short: "Las 'válvulas' que devuelven el LCR a la sangre.",
    func: "Evaginaciones de la aracnoides que atraviesan la duramadre y penetran en el seno sagital superior: por ellas el LCR pasa a la sangre venosa. Equilibran producción y reabsorción.",
    limits:
      "Se sitúan a lo largo del seno sagital superior y de los lagos venosos laterales de la duramadre; dejan 'huellas de dedos' (fositas granulares) en la cara interna del cráneo.",
    characteristics: [
      "Funcionan como válvulas de un solo sentido (de LCR a sangre).",
      "Aumentan en número y tamaño con la edad.",
      "Si se obstruyen (tras meningitis o hemorragia subaracnoidea) → hidrocefalia COMUNICANTE.",
      "El LCR entra a la sangre porque la presión del LCR es mayor que la del seno.",
    ],
    examTip:
      "Ruta completa del LCR (preguntísima): plexos coroides → ventrículos → espacio subaracnoideo → granulaciones aracnoideas → seno sagital superior → sangre.",
    mnemonic: "Pacchioni = las 'pacas' que sacan el LCR usado.",
    alt: ["granulaciones aracnoideas", "granulación aracnoidea", "granulacion aracnoidea", "granulaciones de pacchioni", "pacchioni", "granulaciones"],
  },
];

// ───────────── TEMA 3 · CORTES Y PLANOS ANATÓMICOS ─────────────
const planos: ExtraStructure[] = [
  {
    id: "sagital",
    name: "Plano Sagital",
    latin: "Planum sagittale",
    category: "Plano vertical",
    color: C.violet,
    short: "Divide el cuerpo en derecha e izquierda.",
    func: "Corte vertical anteroposterior que separa derecha de izquierda. El SAGITAL MEDIO (midsagittal) pasa exactamente por la línea media y es el corte 'de perfil' clásico: cuerpo calloso, tálamo, tronco y cerebelo.",
    limits:
      "Perpendicular a los planos coronal y horizontal. El sagital medio contiene la cisura interhemisférica, el cuerpo calloso y la corteza visual (surco calcarino).",
    characteristics: [
      "Sagital medio: único, en la línea media.",
      "Sagitales paramedianos: paralelos, a un lado y otro.",
      "Es EL corte para estudiar sistema límbico y tronco encefálico.",
      "En RM sagital se aprecian bien silla turca, hipófisis y cuerpo calloso.",
    ],
    examTip:
      "Si en la imagen proyectada ves el cuerpo calloso completo, el tronco de perfil y el cerebelo → declara 'corte sagital medio' y suma vocabulario técnico.",
    mnemonic: "Sagitta = flecha: la flecha que atraviesa de frente a nuca.",
    alt: ["plano sagital", "sagital", "sagital medio"],
  },
  {
    id: "coronal",
    name: "Plano Coronal (frontal)",
    latin: "Planum coronale",
    category: "Plano vertical",
    color: C.fuchsia,
    short: "Divide el cuerpo en anterior y posterior.",
    func: "Cortes verticales perpendiculares al sagital: separan lo anterior (frente) de lo posterior (nuca). Vista 'de cara' del encéfalo, ideal para ver ambos hemisferios y los ventrículos simétricos.",
    limits:
      "Perpendicular al sagital y al horizontal. Un coronal a la altura del foramen de Monro muestra los ventrículos laterales en 'mariposa' y los ganglios basales.",
    characteristics: [
      "También llamado plano frontal.",
      "Muestra la simetría derecha-izquierda de un vistazo.",
      "Clásico para ínsula, ganglios basales y ventrículos.",
      "En neuroimagen: 'reconstrucción coronal'.",
    ],
    examTip:
      "Coronal = 'corona': la diadema que rodea la cabeza de oreja a oreja. Divide ANTES / DESPUÉS (anterior-posterior).",
    alt: ["plano coronal", "coronal", "plano frontal", "frontal"],
  },
  {
    id: "horizontal",
    name: "Plano Horizontal (axial)",
    latin: "Planum horizontale",
    category: "Plano horizontal",
    color: C.teal,
    short: "Divide el cuerpo en superior e inferior.",
    func: "Cortes paralelos al suelo: separan arriba de abajo. En neurología se llama AXIAL y es el corte de referencia de la TAC y la RM de rutina.",
    limits:
      "Perpendicular a sagital y coronal. Un corte axial por los ventrículos laterales muestra la clásica 'cabeza de gato/mariposa' ventricular.",
    characteristics: [
      "Sinónimos: axial, transversal.",
      "Es la vista típica de las placas de TAC hospitalarias.",
      "Los cortes se ordenan 'de cabeza a pies' para recorrer el encéfalo.",
      "Ideal para localizar hemorragias y lesiones focales.",
    ],
    examTip:
      "Los 3 planos en una frase: SAGITAL derecha/izquierda · CORONAL anterior/posterior · HORIZONTAL superior/inferior. Dilo completo en el examen.",
    mnemonic: "Horizontal = 'por la cintura': arriba y abajo.",
    alt: ["plano horizontal", "horizontal", "axial", "plano axial", "transversal", "plano transversal"],
  },
  {
    id: "terminos",
    name: "Términos de Orientación",
    latin: "Termini directionales",
    category: "Vocabulario oficial",
    color: C.amber,
    short: "Anterior/posterior, medial/lateral, rostral/caudal, dorsal/ventral.",
    func: "El vocabulario para describir POSICIONES y RELACIONES. Sin ellos no puedes cumplir el criterio 2 de la rúbrica ('identificación de límites o relaciones anatómicas').",
    limits:
      "Rostral = hacia la nariz; caudal = hacia la cola; dorsal = hacia la espalda; ventral = hacia el pecho. En el humano bípedo: rostral ≈ anterior, dorsal ≈ superior, ventral ≈ inferior, caudal ≈ posterior.",
    characteristics: [
      "Anterior (rostral) ↔ Posterior (caudal).",
      "Superior (dorsal/craneal) ↔ Inferior (ventral).",
      "Medial (cerca de la línea media) ↔ Lateral (hacia afuera).",
      "Ipsilateral (mismo lado) ↔ Contralateral (lado opuesto).",
      "Superficial ↔ Profundo; proximal ↔ distal (en miembros).",
    ],
    examTip:
      "Describe SIEMPRE con pares: 'medial al… y lateral al…', 'anterior al cerebelo y posterior al tálamo'. Así demuestras dominar el vocabulario oficial de la rúbrica.",
    mnemonic: "RDC: Rostral-Nariz · Dorsal-Espalda · Caudal-Cola.",
    alt: ["términos de orientación", "terminos de orientacion", "términos direccionales", "terminos direccionales", "términos", "vocabulario"],
  },
  {
    id: "imagen",
    name: "Métodos de Imagen (RM y TAC)",
    latin: "Imagines clinicae",
    category: "Imagen clínica",
    color: C.cyan,
    short: "Cómo se ve el cerebro vivo: resonancia y tomografía.",
    func: "La TAC usa rayos X: rápida, ideal en urgencias (fracturas, sangrado agudo que se ve blanco). La RM usa campos magnéticos: máximo detalle de tejido blando (tumor, médula, tallo, esclerosis).",
    limits:
      "El examen dice literalmente: 'describir la anatomía… empleando métodos de imagen de utilidad clínica' → las imágenes proyectadas serán cortes tipo TAC/RM en algún plano.",
    characteristics: [
      "TAC: hueso blanco brillante; sangrado agudo = hiperdenso (blanco).",
      "RM T1: LCR oscuro · RM T2: LCR blanco brillante.",
      "RM gana en fosa posterior, médula y tallo; TAC gana en hueso y urgencia.",
      "La angiografía (TAC o RM) visualiza vasos y aneurismas.",
    ],
    examTip:
      "Trucos de lectura rápida: TAC = Trauma y hueso (rápida). Sangrado agudo en TAC se ve BLANCO. En RM T2 el LCR brilla blanco.",
    mnemonic: "TAC = Trauma, Accidente, Cráneo. RM = Riqueza de detalle.",
    alt: ["rm", "tac", "resonancia", "resonancia magnética", "tomografía", "tomografia", "métodos de imagen", "metodos de imagen", "imagen"],
  },
];

// ───────── TEMA 4 · ÁREAS FUNCIONALES DE LA CORTEZA ─────────
const areas: ExtraStructure[] = [
  {
    id: "m1",
    name: "Corteza Motora Primaria (M1)",
    latin: "Area 4 Brodmann · Gyrus precentralis",
    category: "Motor",
    color: C.red,
    short: "Giro precentral: dispara el movimiento voluntario del lado opuesto.",
    func: "Es el 'teclado' que ejecuta los movimientos voluntarios del lado opuesto del cuerpo. Cada zona mueve un grupo muscular concreto (somatotopía): el homúnculo motor, con manos y lengua gigantes.",
    limits:
      "Ocupa el giro PREcentral, justo ANTERIOR al surco central (de Rolando). Por delante limita con el área premotora; por detrás, con la corteza somatosensorial (giro postcentral).",
    characteristics: [
      "Área 4 de Brodmann; contiene las células de Betz gigantes.",
      "Homúnculo motor: piernas en la cara medial (arriba), cara y lengua abajo/lateral.",
      "Sus fibras forman el tracto corticoespinal que cruza en el bulbo (decusación de pirámides).",
      "Lesión → parálisis/paresia del lado CONTRALATERAL.",
    ],
    examTip:
      "Lesión del giro precentral → PARESIA ESPÁSTICA CONTRALATERAL (dato clásico de examen). En el homúnculo, el cuerpo se dibuja invertido.",
    mnemonic: "PREcentral = PREpara y mueve.",
    alt: ["corteza motora primaria", "cortex motora primaria", "área motora primaria", "area motora primaria", "giro precentral", "m1", "área 4", "area 4", "precentral"],
  },
  {
    id: "s1",
    name: "Corteza Somatosensorial (S1)",
    latin: "Areas 3, 1, 2 · Gyrus postcentralis",
    category: "Sensitiva",
    color: C.amber,
    short: "Giro postcentral: siente tacto, temperatura y posición.",
    func: "Recibe y localiza las sensaciones del cuerpo: tacto fino, dolor, temperatura, vibración y propiocepción (posición de articulaciones). Tiene su propio homúnculo sensitivo invertido.",
    limits:
      "Ocupa el giro POSTcentral, inmediatamente POSTERIOR al surco central (de Rolando). Por detrás limita con la corteza de asociación parietal; recibe el relevo del tálamo (núcleos VP).",
    characteristics: [
      "Áreas 3, 1 y 2 de Brodmann.",
      "Tercera neurona de la vía sensitiva: tálamo → S1.",
      "Somatotopía según sensibilidad: manos y labios enormes.",
      "Lesión → hipoestesia contralateral y astereognosis (no reconoce objetos al tacto).",
    ],
    examTip: "Regla de Rolando: PRE-mueve, POST-siente. La banda justo detrás del surco central es S1.",
    mnemonic: "POSTcentral = POSTerior a Rolando y POSTera las sensaciones.",
    alt: ["corteza somatosensorial primaria", "somatosensorial", "giro postcentral", "s1", "áreas 3 1 2", "postcentral"],
  },
  {
    id: "broca",
    name: "Área de Broca",
    latin: "Areas 44 y 45",
    category: "Lenguaje · salida",
    color: C.pink,
    short: "Producción del habla: la 'salida' de las palabras.",
    func: "Programa y coordina los movimientos del habla (labios, lengua, laringe). Es la salida motora del lenguaje.",
    limits:
      "En el giro frontal INFERIOR (pars opercularis y triangular) del hemisferio DOMINANTE (casi siempre el izquierdo), justo encima del surco de Silvio y por delante de la corteza motora de boca y lengua.",
    characteristics: [
      "Hemisferio dominante (izquierdo en ~95% de los diestros).",
      "Conecta con Wernicke por el fascículo arqueado.",
      "Lesión → AFASIA DE BROCA (motora/expresiva): entiende, pero habla con esfuerzo, telegráfico, sin gramática.",
      "El paciente ES consciente del error y se frustra.",
    ],
    examTip:
      "Comparación estrella: Broca = 'entiende pero no puede hablar' (telegráfico). Wernicke = 'habla mucho pero sin sentido'. Aprende las dos juntas.",
    mnemonic: "Broca = boca rota (Broca-Boca).",
    alt: ["área de broca", "area de broca", "broca", "área broca"],
  },
  {
    id: "wernicke",
    name: "Área de Wernicke",
    latin: "Area 22",
    category: "Lenguaje · entrada",
    color: C.fuchsia,
    short: "Comprensión del lenguaje: el 'diccionario' del cerebro.",
    func: "Comprende el lenguaje hablado y escrito: decodifica sonidos en significados. Es la puerta de entrada del lenguaje.",
    limits:
      "Tercio posterior del giro temporal SUPERIOR del hemisferio dominante (a menudo se extiende al giro angular del parietal). Por detrás del área auditiva primaria.",
    characteristics: [
      "Recibe información de la corteza auditiva y visual (palabra escrita).",
      "Proyecta a Broca por el fascículo arqueado.",
      "Lesión → AFASIA DE WERNICKE (sensorial): habla fluida, rápida, sin sentido ('ensalada de palabras', neologismos).",
      "El paciente NO es consciente del error.",
    ],
    examTip:
      "Si el paciente habla fluido pero sin sentido y no se da cuenta → WERNICKE. Si entiende pero no puede hablar → BROCA.",
    mnemonic: "Wernicke = el diccionario; Broca = el micrófono.",
    alt: ["área de wernicke", "area de wernicke", "wernicke", "área wernicke"],
  },
  {
    id: "v1",
    name: "Corteza Visual Primaria (V1)",
    latin: "Area 17 · Sulcus calcarinus",
    category: "Visual",
    color: C.emerald,
    short: "Surco calcarino: donde nace la visión consciente.",
    func: "Recibe la información de la retina (vía quiasma y radiación óptica) y construye la percepción visual básica: bordes, orientación, color y movimiento.",
    limits:
      "En la cara MEDIAL del lóbulo occipital, a lo largo del SURCO CALCARINO (se ve en el corte sagital). Por delante limita con las áreas visuales de asociación (18-19).",
    characteristics: [
      "Área 17 o corteza estriada (línea de Gennari).",
      "Retinotopía: el campo visual se mapea punto por punto.",
      "La mácula (visión central fina) ocupa una zona desproporcionada.",
      "Lesión unilateral → HEMIANOPSIA contralateral homónima (pierde la mitad del campo visual opuesto).",
    ],
    examTip:
      "Lesión del surco calcarino → hemianopsia contralateral (dato clásico de examen). En el corte sagital medio se ve claramente el calcarino.",
    mnemonic: "Calcarino = la 'cámara' del cerebro.",
    alt: ["corteza visual primaria", "cortex visual primaria", "visual primaria", "v1", "área 17", "area 17", "surco calcarino", "calcarino"],
  },
  {
    id: "a1",
    name: "Corteza Auditiva Primaria (A1)",
    latin: "Areas 41 y 42 · Giros de Heschl",
    category: "Auditiva",
    color: C.orange,
    short: "Giros de Heschl: percibe tono, volumen y ritmo.",
    func: "Recibe la información del oído vía tálamo (cuerpo geniculado medial) y procesa tono, volumen y ritmo. Primer escalón cortical del oído.",
    limits:
      "En la cara superior del giro temporal SUPERIOR, escondida hacia adentro del surco de Silvio (giros transversos de Heschl). Wernicke la rodea por detrás.",
    characteristics: [
      "Tonotopía: cada zona responde a un tono distinto.",
      "Recibe de ambos oídos (con predominio contralateral).",
      "Lesión UNILATERAL → apenas dificultad para localizar sonidos (NO sordera).",
      "Lesión BILATERAL → sordera cortical: el oído funciona, el córtex no percibe.",
    ],
    examTip:
      "Trampa clásica: lesión UNILATERAL de la corteza auditiva NO causa sordera (las vías van a ambos lados). Sordera cortical solo si la lesión es bilateral.",
    mnemonic: "41-42: dos altavoces escondidos en el surco de Silvio.",
    alt: ["corteza auditiva primaria", "auditiva primaria", "a1", "áreas 41 y 42", "area 41", "giros de heschl", "heschl"],
  },
  {
    id: "prefrontal",
    name: "Corteza Prefrontal",
    latin: "Areas 9-12, 46",
    category: "Ejecutiva",
    color: C.grape,
    short: "Planificación, personalidad y control de impulsos.",
    func: "Funciones ejecutivas: planificar, decidir, frenar impulsos, memoria de trabajo y personalidad social. Es el 'director de orquesta' del comportamiento.",
    limits:
      "La región más ANTERIOR del lóbulo frontal, por delante de las áreas premotoras. Conecta con todas las cortezas y con el sistema límbico (vía el tálamo dorsomedial).",
    characteristics: [
      "Madura hasta los ~25 años: por eso el adolescente es más impulsivo.",
      "Lesión bilateral (caso Phineas Gage) → cambio de personalidad, impulsividad, metas sin rumbo.",
      "Base de la memoria de trabajo y la toma de decisiones.",
      "Regula las emociones que le llegan del sistema límbico.",
    ],
    examTip:
      "Caso Phineas Gage (barra de hierro a través de la prefrontal): sobrevivió pero cambió de personalidad. Si la pregunta dice 'personalidad e impulsividad' → corteza prefrontal.",
    mnemonic: "Prefrontal = el gerente: planifica, decide y modera.",
    alt: ["corteza prefrontal", "cortex prefrontal", "prefrontal", "córtex prefrontal"],
  },
];

// ─────────── TEMA 5 · VENTRÍCULOS Y LCR ───────────
const ventriculos: ExtraStructure[] = [
  {
    id: "laterales",
    name: "Ventrículos Laterales (I y II)",
    latin: "Ventriculi laterales",
    category: "Ventrículo",
    color: C.cyan,
    short: "Los dos más grandes: una 'C' dentro de cada hemisferio.",
    func: "Cavidades internas de cada hemisferio donde el plexo coroide produce la mayor parte del LCR. Son el punto de partida de la circulación del líquido.",
    limits:
      "Uno por hemisferio, rodeando el tálamo y los ganglios basales. Comunican con el III ventrículo por los AGUJEROS DE MONRO. Tienen 4 partes: corno frontal, cuerpo, corno occipital y corno temporal.",
    characteristics: [
      "El ventrículo más grande; hay dos, simétricos.",
      "Forma de 'C' con cuatro cornos (frontal, occipital, temporal) y cuerpo.",
      "Plexo coroide en su techo (cuerpo y corno temporal).",
      "En el corte axial se ven como la 'cabeza de gato/mariposa'.",
    ],
    examTip:
      "Comunican con el III ventrículo por los agujeros de MONRO. Si se obstruyen → hidrocefalia obstructiva con dilatación de los laterales.",
    mnemonic: "Laterales = el par de cuernos (cornos) del cerebro.",
    alt: ["ventrículos laterales", "ventriculos laterales", "ventrículo lateral", "ventriculo lateral", "ventriculos 1 y 2", "primer y segundo ventrículo"],
  },
  {
    id: "tercero",
    name: "Ventrículo III (tercero)",
    latin: "Ventriculus tertius",
    category: "Ventrículo",
    color: C.emerald,
    short: "Cavidad estrecha y MEDIANA entre los dos tálamos.",
    func: "Recibe el LCR de ambos ventrículos laterales por los Monro y lo envía al IV por el acueducto de Silvio. Su techo también tiene plexo coroide.",
    limits:
      "Cavidad MEDIANA (única, no par) ENTRE los tálamos (adhesión intertalámica). Sus paredes: tálamo e hipotálamo; en su suelo: quiasma óptico, infundíbulo y cuerpos mamilares.",
    characteristics: [
      "Es único y estrecho, en plena línea media.",
      "Pared lateral: tálamo (arriba) e hipotálamo (abajo).",
      "Comunica arriba con los laterales (Monro) y abajo con el IV (acueducto).",
      "Su plexo coroide continúa con el de los laterales.",
    ],
    examTip:
      "El III ventrículo está ENTRE los tálamos. Cadena para el examen: laterales → Monro → III → Silvio → IV.",
    mnemonic: "Tercero = el pasillo central entre los dos tálamos.",
    alt: ["tercer ventrículo", "tercer ventriculo", "ventrículo tercero", "ventriculo tercero", "ventrículo 3", "ventriculo 3", "3er ventrículo"],
  },
  {
    id: "acueducto",
    name: "Acueducto de Silvio",
    latin: "Aqueductus mesencephali",
    category: "Conducto",
    color: C.amber,
    short: "El túnel finísimo del mesencéfalo: une el III con el IV.",
    func: "Canal estrecho que atraviesa el mesencéfalo permitiendo que el LCR baje del III al IV ventrículo. Es el punto más angosto de toda la ruta.",
    limits:
      "Recorre TODO el MESENCÉFALO: por detrás de los pedúnculos y la sustancia negra, por delante de los colículos. Alrededor está la sustancia gris periacueductal.",
    characteristics: [
      "El conducto más estrecho del sistema (1-2 mm).",
      "No tiene plexo coroide propio.",
      "La sustancia gris periacueductal (que lo rodea) modula el dolor.",
      "Su obstrucción (estenosis, tumores) → hidrocefalia obstructiva.",
    ],
    examTip:
      "Estenosis del acueducto de Silvio = causa clásica de hidrocefalia OBSTRUCTIVA: se dilatan los ventrículos de ARRIBA (laterales y III) y el IV queda normal. Diferencial de examen.",
    mnemonic: "Silvio = el caño más finito: si se tapa, inunda todo arriba.",
    alt: ["acueducto de silvio", "acueducto", "acueducto mesencefálico", "acueducto mesencefalico", "acueducto cerebral", "acueducto de sylvius"],
  },
  {
    id: "cuarto",
    name: "Ventrículo IV (cuarto)",
    latin: "Ventriculus quartus",
    category: "Ventrículo",
    color: C.violet,
    short: "Tienda de campaña entre el tallo y el cerebelo.",
    func: "Última estación interna del LCR: desde aquí sale al espacio subaracnoideo por los foramina de Luschka (2, laterales) y Magendie (1, medio). En su suelo está el centro del vómito (área postrema).",
    limits:
      "Entre el tallo encefálico (protuberancia y bulbo, por delante) y el cerebelo (por detrás). Arriba conecta con el acueducto; abajo con el canal central de la médula.",
    characteristics: [
      "Forma de carpa/tienda con fondo romboidal (fosa romboidal).",
      "3 salidas: 2 de LUSCHKA + 1 de MAGENDIE → ÚNICA salida del sistema ventricular.",
      "En su suelo están los núcleos de los pares craneales V-XII.",
      "El área postrema (suelo) dispara el vómito.",
    ],
    examTip:
      "Salidas del LCR: LUSCHKA-Lados (2) + MAGENDIE-Medio (1). Si se tapan → hidrocefalia obstructiva. 'Límites': cerebelo atrás, protuberancia/bulbo adelante.",
    mnemonic: "L-M: Luschka-Lados · Magendie-Medio.",
    alt: ["cuarto ventrículo", "cuarto ventriculo", "ventrículo cuarto", "ventriculo cuarto", "ventrículo 4", "ventriculo 4", "4to ventrículo"],
  },
  {
    id: "plexos",
    name: "Plexos Coroides",
    latin: "Plexus choroidei",
    category: "Producción de LCR",
    color: C.rose,
    short: "Las 'llaves de agua' que fabrican el LCR.",
    func: "Redes vasculares cubiertas por ependimocitos especializados que filtran sangre y secretan LCR de forma continua: ~500 ml al día (aunque solo hay ~150 ml circulando: se renueva ~3 veces al día).",
    limits:
      "Están en los ventrículos LATERALES (cuerpo y corno temporal), en el TECHO del III y del IV. NO hay plexo en el acueducto ni en los cornos frontal y occipital.",
    characteristics: [
      "Producen ~0,35-0,4 ml/min → ~500 ml/día.",
      "Volumen total de LCR: ~150 ml (se renueva 3 veces al día).",
      "El LCR es claro: pocas proteínas y pocas células ( plasma filtrado).",
      "Producción constante: si no se reabsorbe, la presión sube → hidrocefalia.",
    ],
    examTip:
      "Datos que caen: producción ~500 ml/día, volumen ~150 ml, renovación x3 al día. La punción lumbar toma LCR del espacio subaracnoideo en L3-L4.",
    mnemonic: "Coroide = 'corriente' de líquido nueva cada día.",
    alt: ["plexo coroide", "plexos coroideos", "plexo coroides", "coroides"],
  },
  {
    id: "circulacion",
    name: "Circulación del LCR (e hidrocefalia)",
    latin: "Circulatio liquoris cerebrospinalis",
    category: "Ruta del LCR",
    color: C.fuchsia,
    short: "Fabricar → circular → reabsorber… y qué pasa si se tapa.",
    func: "El LCR amortigua los golpes, hace flotar el encéfalo (de 1,4 kg a ~50 g efectivos), nutre y limpia desechos. Circula en una sola dirección y regresa a la sangre.",
    limits:
      "Ruta completa: plexos coroides → ventrículos laterales → agujeros de Monro → III ventrículo → acueducto de Silvio → IV ventrículo → Luschka y Magendie → espacio subaracnoideo y cisternas → granulaciones aracnoideas → seno sagital superior → sangre.",
    characteristics: [
      "También baja por el canal espinal alrededor de la médula.",
      "Hidrocefalia OBSTRUCTIVA (no comunicante): bloqueo DENTRO del sistema (estenosis de Silvio, tumores).",
      "Hidrocefalia COMUNICANTE: falla la REABSORCIÓN (granulaciones tapadas tras meningitis o hemorragia subaracnoidea).",
      "En el bebé (fontanelas abiertas) la cabeza crece; en el adulto sube la presión intracraneal.",
    ],
    examTip:
      "Aprende la ruta COMPLETA de memoria: es un clásico de 'describa'. Y diferencia obstructiva (dentro del sistema) vs comunicante (en la reabsorción).",
    mnemonic:
      "Ruta: 'Monro me lleva al Tres, Silvio me baja al Cuatro, Luschka y Magendie me echan al río'.",
    alt: ["circulación del lcr", "circulacion del lcr", "lcr", "líquido cefalorraquídeo", "liquido cefalorraquideo", "circulación", "circulacion"],
  },
];

// ─────────── TEMA 6 · TALLO CEREBRAL ───────────
const tallo: ExtraStructure[] = [
  {
    id: "tallo",
    name: "Tallo Cerebral (tronco encefálico)",
    latin: "Truncus encephali",
    category: "Vía y centro vital",
    color: C.orange,
    short: "El cable vital que conecta el cerebro con la médula.",
    func: "Conduce TODAS las vías ascendentes (sensitivas) y descendentes (motoras) entre encéfalo y médula; alberga los núcleos de los pares craneales, los centros vitales (respiración, cardiovascular) y la formación reticular (consciencia).",
    limits:
      "De arriba abajo: mesencéfalo → protuberancia → bulbo raquídeo. Termina en el foramen magno, donde se continúa con la médula espinal. Por detrás lo abraza el cerebelo.",
    characteristics: [
      "3 pisos: mesencéfalo, protuberancia (puente) y bulbo raquídeo.",
      "Es cruzado: las vías motoras cambian de lado (decusación).",
      "Por él salen 10 de los 12 pares craneales (todos menos I y II).",
      "Lesión = emergencia vital: respiración, ritmo cardíaco y consciencia en juego.",
    ],
    examTip:
      "Los 3 pisos de arriba abajo: MESENCÉFALO - PROTUBERANCIA - BULBO. Aprende a señalarlos en el corte sagital: es casi seguro que caen señalados.",
    mnemonic: "Mi Pequeño Bolo: Mesencéfalo - Protuberancia - Bulbo (de arriba abajo).",
    alt: ["tallo cerebral", "tronco encefálico", "tronco encefalico", "tallo encefálico", "tronco cerebral", "tallo"],
  },
  {
    id: "mesencefalo",
    name: "Mesencéfalo (cerebro medio)",
    latin: "Mesencephalon",
    category: "Piso superior",
    color: C.red,
    short: "Colículos, sustancia negra y el acueducto de Silvio.",
    func: "Reflejos visuales y auditivos (colículos), control del movimiento (sustancia negra, núcleo rojo) y paso del LCR por el acueducto de Silvio. Conecta el diencéfalo con la protuberancia.",
    limits:
      "Piso más alto del tallo: por arriba limita con el diencéfalo (tálamo). Por detrás (dorsal) la lámina cuadrigémina con los colículos; por delante (ventral) los pedúnculos cerebrales. Lo atraviesa el acueducto.",
    characteristics: [
      "Techo (lámina cuadrigémina): colículos SUPERIORES (reflejos visuales) e INFERIORES (reflejos auditivos).",
      "Sustancia negra: produce dopamina; su degeneración → ENFERMEDAD DE PARKINSON.",
      "Núcleo rojo: coordinación motora.",
      "Por él salen los pares III (oculomotor) y IV (troclear).",
    ],
    examTip:
      "Colículos superiores = VISTA; inferiores = OÍDO. Sustancia negra dañada = Parkinson (temblor en reposo, rigidez, bradicinesia).",
    mnemonic: "De arriba a abajo: primero VES (superior), luego OYES (inferior).",
    alt: ["mesencéfalo", "mesencefalo", "cerebro medio"],
  },
  {
    id: "protuberancia",
    name: "Protuberancia (puente)",
    latin: "Pons",
    category: "Piso medio",
    color: C.amber,
    short: "La 'barriga' del tallo: puente hacia el cerebelo.",
    func: "Estación de relevo entre córtex y cerebelo (vía córtico-ponto-cerebelosa → coordinación fina), centro respiratorio superior (neumotáxico y apnéusico) y núcleos de los pares V, VI, VII y VIII.",
    limits:
      "Segmento medio y abultado del tallo. Por delante su cara basilar (por donde pasa la arteria basilar); por detrás se une al cerebelo por los pedúnculos cerebelosos medios y delimita el IV ventrículo.",
    characteristics: [
      "'Pons' = puente: une ambos hemisferios cerebelosos.",
      "Núcleos de los pares V (trigémino), VI (abducens), VII (facial), VIII (vestibulococlear).",
      "Centros neumotáxico y apnéusico: afinan el ritmo respiratorio.",
      "Lesión típica: parálisis facial; lesión extensa → síndrome 'locked-in'.",
    ],
    examTip:
      "Pares craneales de la protuberancia: V, VI, VII, VIII (5-8 seguidos). Si la pregunta dice 'puente hacia el cerebelo' → protuberancia.",
    mnemonic: "Pons = Puente = Pares V-VIII.",
    alt: ["protuberancia", "puente", "pons", "protuberancia anular"],
  },
  {
    id: "bulbo",
    name: "Bulbo Raquídeo (médula oblonga)",
    latin: "Medulla oblongata",
    category: "Piso inferior",
    color: C.emerald,
    short: "El centro vital: respiración, corazón y decusación.",
    func: "Alberga los CENTROS VITALES: cardiovascular (ritmo y presión), respiratorio (ritmo basal) y los centros del vómito, tos y deglución. Aquí se cruzan las vías motoras (decusación de pirámides) y están los núcleos de IX, X, XI, XII.",
    limits:
      "Piso más bajo: desde el borde inferior de la protuberancia hasta el foramen magno, donde se continúa con la médula espinal. Por detrás forma el suelo del IV ventrículo; por delante las pirámides y olivas.",
    characteristics: [
      "Pirámides bulbares: haces corticoespinales; 85-90% se cruzan aquí (decusación).",
      "Centros cardiovascular y respiratorio: lesión = paro (por eso un golpe fuerte al cuello puede ser letal).",
      "Núcleos de IX (glosofaríngeo), X (vago), XI (accesorio), XII (hipogloso).",
      "Por él pasan todas las vías sensitivas ascendentes.",
    ],
    examTip:
      "Decusación de pirámides EN el bulbo: por eso el córtex de un lado controla el cuerpo del lado OPUESTO. Lesión del bulbo = riesgo vital inmediato.",
    mnemonic: "Bulbo = el botón de apagado: ahí están las llaves de la vida.",
    alt: ["bulbo raquídeo", "bulbo raquideo", "médula oblonga", "medula oblonga", "bulbo"],
  },
  {
    id: "reticular",
    name: "Formación Reticular (SARA)",
    latin: "Formatio reticularis",
    category: "Consciencia",
    color: C.fuchsia,
    short: "La red del despertar: sueño, vigilia y consciencia.",
    func: "Red difusa de neuronas a lo largo de todo el tallo. Su porción ascendente (SARA: sistema de activación reticular ascendente) mantiene la vigilia y la consciencia; la descendente modula el tono muscular y el dolor.",
    limits:
      "Núcleos dispersos en el centro (tegmento) de mesencéfalo, protuberancia y bulbo. Proyecta al tálamo (que difunde la alerta a toda la corteza) y hacia abajo a la médula.",
    characteristics: [
      "Filtro sueño/vigilia: se apaga al dormir; los anestésicos la bloquean.",
      "Lesión bilateral extensa → coma.",
      "Modula el tono postural y el reflejo de sobresalto.",
      "Recibe colaterales de casi todas las vías: 'espolvorea' alerta ante lo importante.",
    ],
    examTip:
      "SARA = el despertador del cerebro: coma = formación reticular apagada. '¿Qué estructura mantiene la consciencia?' → formación reticular (vía tálamo).",
    mnemonic: "SARA = Suena la Alarma Reticular Ascendente.",
    alt: ["formación reticular", "formacion reticular", "sara", "sistema de activación reticular", "reticular"],
  },
  {
    id: "pares",
    name: "Pares Craneales (12 pares)",
    latin: "Nervi craniales",
    category: "SNP desde el tallo",
    color: C.cyan,
    short: "Los 12 'cables' que salen del encéfalo hacia cabeza y cuello.",
    func: "Inervan la sensibilidad y motricidad de cara, ojos, lengua, garganta y vísceras: visión (II), movimientos oculares (III, IV, VI), masticación (V), expresión facial (VII), audición y equilibrio (VIII), deglución y vísceras (IX, X)…",
    limits:
      "Nacen del encéfalo: I (olfatorio) y II (óptico) NO salen del tallo; III y IV del mesencéfalo; V, VI, VII, VIII de la protuberancia; IX, X, XI, XII del bulbo. El X (vago) baja hasta el abdomen.",
    characteristics: [
      "I Olfatorio, II Óptico, III Oculomotor, IV Troclear, V Trigémino, VI Abducens, VII Facial, VIII Vestibulococlear, IX Glosofaríngeo, X Vago, XI Accesorio, XII Hipogloso.",
      "10 de los 12 salen del tallo (todos menos I y II).",
      "Motores puros: III, IV, VI, XI, XII · Sensitivos puros: I, II, VIII · Mixtos: V, VII, IX, X.",
      "El XII mueve la lengua; el XI mueve trapecio y esternocleidomastoideo.",
    ],
    examTip:
      "Aprende la lista 1-12 con nombre exacto (cae seguro) y agrupa: I-II sentidos · III-IV-VI ojos · V cara · VII expresión · VIII oído · IX-X garganta · XI hombros · XII lengua.",
    mnemonic:
      "Frase clásica: 'Ooh Oh Oh To Touch And Feel Very Good Velvet, Such Heaven' (I→XII).",
    alt: ["pares craneales", "nervios craneales", "12 pares craneales", "pares", "nervios"],
  },
];

// ───────────────────────── TÓPICOS ────────────────────────────
export const EXTRA_TOPICS: ExtraTopic[] = [
  {
    id: "division",
    title: "División del Sistema Nervioso",
    subtitle: "SNC, SNP y sus ramas",
    icon: "Network",
    description:
      "El mapa general: qué es central, qué es periférico, quién mueve lo voluntario y quién maneja las vísceras (simpático vs parasimpático).",
    structures: division,
  },
  {
    id: "meninges",
    title: "Meninges y LCR",
    subtitle: "Duramadre · Aracnoides · Piamadre",
    icon: "Shield",
    description:
      "Las 3 membranas que envuelven el SNC, sus espacios y la ruta del líquido cefalorraquídeo hasta la sangre.",
    structures: meninges,
  },
  {
    id: "planos",
    title: "Cortes y Planos Anatómicos",
    subtitle: "Sagital · Coronal · Horizontal",
    icon: "Scissors",
    description:
      "Los 3 planos del espacio, el vocabulario de orientación y cómo leer una RM o TAC como un profesional.",
    structures: planos,
  },
  {
    id: "areas",
    title: "Áreas Funcionales de la Corteza",
    subtitle: "Brodmann y el homúnculo",
    icon: "MapPin",
    description:
      "El mapa funcional del córtex: quién mueve, quién siente, quién habla y quién ve, con sus lesiones clásicas.",
    structures: areas,
  },
  {
    id: "ventriculos",
    title: "Ventrículos y LCR",
    subtitle: "La ruta del líquido cefalorraquídeo",
    icon: "Droplets",
    description:
      "Las cavernas internas del cerebro: laterales, III, IV, el acueducto de Silvio y la fabricación del LCR.",
    structures: ventriculos,
  },
  {
    id: "tallo",
    title: "Tallo Cerebral",
    subtitle: "Mesencéfalo · Protuberancia · Bulbo",
    icon: "Waypoints",
    description:
      "El pasillo vital: sus 3 pisos, los pares craneales, la decusación de pirámides y la formación reticular.",
    structures: tallo,
  },
];

export function getExtraTopic(id: ExtraTopicId): ExtraTopic {
  return EXTRA_TOPICS.find((t) => t.id === id) ?? EXTRA_TOPICS[0];
}

export const EXTRA_TOTAL_STRUCTURES = EXTRA_TOPICS.reduce(
  (acc, t) => acc + t.structures.length,
  0
);

// ───────── PREGUNTAS EXTRA PARA EL SIMULADOR DE EXAMEN ─────────
export interface ExtraQuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: ExtraTopicId;
}

export const EXTRA_QUESTIONS: ExtraQuizQuestion[] = [
  {
    question: "¿Qué estructuras forman el sistema nervioso central (SNC)?",
    options: [
      "Encéfalo y médula espinal",
      "Encéfalo y nervios craneales",
      "Médula espinal y ganglios",
      "Cerebelo y nervios espinales",
    ],
    correct: 0,
    explanation:
      "SNC = encéfalo (dentro del cráneo) + médula espinal (dentro del conducto vertebral). Los nervios y ganglios pertenecen al SNP.",
    topic: "division",
  },
  {
    question: "El sistema nervioso simpático nace de la médula espinal a la altura de…",
    options: ["T1-L2 (toracolumbar)", "S2-S4 (sacro)", "C1-C8 (cervical)", "Los pares craneales"],
    correct: 0,
    explanation:
      "Simpático = TORACOLUMBAR (T1-L2). Parasimpático = CRANEOSACRO (III, VII, IX, X + S2-S4).",
    topic: "division",
  },
  {
    question: "¿Cuántos pares de nervios espinales y craneales existen?",
    options: ["12 espinales y 31 craneales", "31 espinales y 12 craneales", "24 y 24", "30 y 10"],
    correct: 1,
    explanation:
      "31 pares de nervios ESPINALES (8C, 12T, 5L, 5S, 1Co) y 12 pares de nervios CRANEALES.",
    topic: "division",
  },
  {
    question: "¿Cuál es el orden correcto de las meninges de afuera hacia adentro?",
    options: [
      "Piamadre, aracnoides, duramadre",
      "Duramadre, aracnoides, piamadre",
      "Duramadre, piamadre, aracnoides",
      "Aracnoides, duramadre, piamadre",
    ],
    correct: 1,
    explanation: "De afuera hacia adentro: Duramadre → Aracnoides → Piamadre (DAP).",
    topic: "meninges",
  },
  {
    question: "El LCR regresa a la sangre venosa a través de…",
    options: [
      "Las granulaciones aracnoideas hacia el seno sagital superior",
      "El acueducto de Silvio",
      "El canal central de la médula",
      "Los agujeros de Monro",
    ],
    correct: 0,
    explanation:
      "Ruta final del LCR: espacio subaracnoideo → granulaciones aracnoideas (Pacchioni) → seno sagital superior → sangre.",
    topic: "meninges",
  },
  {
    question: "Un hematoma epidural se produce entre…",
    options: [
      "La aracnoides y la piamadre",
      "El hueso y la duramadre",
      "La duramadre y la aracnoides",
      "Dentro del parénquima cerebral",
    ],
    correct: 1,
    explanation:
      "Epidural = entre el hueso y la duramadre (rotura de la arteria meníngea media). Subdural = bajo la duramadre (venas puente). Subaracnoideo = en el espacio del LCR.",
    topic: "meninges",
  },
  {
    question: "El plano que divide el cuerpo en anterior y posterior es el…",
    options: ["Sagital", "Coronal (frontal)", "Horizontal (axial)", "Medial"],
    correct: 1,
    explanation:
      "Coronal = anterior/posterior. Sagital = derecha/izquierda. Horizontal o axial = superior/inferior.",
    topic: "planos",
  },
  {
    question: "En una TAC de urgencia, un sangrado agudo se observa como…",
    options: ["Zona negra (hipodensa)", "Zona blanca (hiperdensa)", "Igual que el tejido normal", "No se ve en TAC"],
    correct: 1,
    explanation:
      "La sangre aguda es HIPERDENSA (blanca) en la TAC. Por eso la TAC es el examen de primera línea en trauma.",
    topic: "planos",
  },
  {
    question: "El área de Broca se localiza en el…",
    options: [
      "Giro precentral del hemisferio derecho",
      "Giro frontal inferior del hemisferio dominante",
      "Giro temporal superior posterior",
      "Surco calcarino",
    ],
    correct: 1,
    explanation:
      "Broca (áreas 44-45) está en el giro frontal inferior del hemisferio dominante, encima del surco de Silvio.",
    topic: "areas",
  },
  {
    question:
      "Un paciente habla con fluidez pero sus frases no tienen sentido y no es consciente del error. ¿Qué afasia es?",
    options: ["Afasia de Broca", "Afasia de Wernicke", "Disartria", "Mutismo"],
    correct: 1,
    explanation:
      "Afasia de WERNICKE (área 22, temporal superior posterior): habla fluida sin sentido ('ensalada de palabras') sin consciencia del error. En Broca el paciente entiende pero habla telegráfico y se frustra.",
    topic: "areas",
  },
  {
    question: "La degeneración de la sustancia negra del mesencéfalo produce…",
    options: ["Enfermedad de Alzheimer", "Enfermedad de Parkinson", "Epilepsia", "Esclerosis múltiple"],
    correct: 1,
    explanation:
      "La sustancia negra (mesencéfalo) produce dopamina; su degeneración causa Parkinson: temblor en reposo, rigidez y bradicinesia.",
    topic: "tallo",
  },
  {
    question: "¿Por dónde sale el LCR del IV ventrículo hacia el espacio subaracnoideo?",
    options: [
      "Por los agujeros de Monro",
      "Por los foramina de Luschka y Magendie",
      "Por el acueducto de Silvio",
      "Por el canal central",
    ],
    correct: 1,
    explanation:
      "El IV ventrículo drena por 2 foramina de LUSCHKA (laterales) y 1 de MAGENDIE (medio). Es la única salida del sistema ventricular.",
    topic: "ventriculos",
  },
  {
    question: "La estenosis del acueducto de Silvio dilata…",
    options: [
      "Solo el IV ventrículo",
      "Los ventrículos laterales y el III",
      "Todos los ventrículos por igual",
      "Ningún ventrículo",
    ],
    correct: 1,
    explanation:
      "Si el acueducto se tapa, el LCR se acumula ARRIBA del bloqueo: laterales + III se dilatan y el IV queda normal (hidrocefalia obstructiva).",
    topic: "ventriculos",
  },
  {
    question: "¿Cuánto LCR produce el organismo aproximadamente al día?",
    options: ["~50 ml", "~150 ml", "~500 ml", "~2000 ml"],
    correct: 2,
    explanation:
      "Se producen ~500 ml/día, pero solo hay ~150 ml circulando: el LCR se renueva unas 3 veces al día.",
    topic: "ventriculos",
  },
  {
    question: "Los centros vitales de respiración y función cardiovascular están en el…",
    options: ["Mesencéfalo", "Protuberancia", "Bulbo raquídeo", "Cerebelo"],
    correct: 2,
    explanation:
      "El bulbo raquídeo contiene los centros cardiovascular y respiratorio: por eso su lesión es potencialmente letal.",
    topic: "tallo",
  },
  {
    question: "¿Por qué una lesión del córtex motor izquierdo afecta el lado derecho del cuerpo?",
    options: [
      "Porque las vías no se cruzan",
      "Por la decusación de pirámides en el bulbo",
      "Porque el tálamo invierte la señal",
      "Porque el cerebelo corrige el lado",
    ],
    correct: 1,
    explanation:
      "En el bulbo, 85-90% de las fibras corticoespinales se cruzan (decusación de pirámides): cada hemisferio controla el lado opuesto.",
    topic: "tallo",
  },
];
