/* ============================================================
   DATA.JS
   Acá cargan toda la información del equipo: quiénes son,
   qué saben hacer, y el registro de proyectos / charlas / visitas.

   NO hay base de datos: todo vive en este archivo.
   Para sumar una salida nueva, copiá un bloque del array "items"
   y completá los datos. Para las fotos, guardá la imagen adentro
   de la carpeta "assets/img/" y poné ese nombre de archivo en
   la propiedad "imagen". Si no tenés foto todavía, dejá
   imagen: "" y el sitio va a mostrar un cartel de reemplazo
   automáticamente (no rompe nada).
   ============================================================ */

const equipo = {
  nombre: "Equipo Byte & Co.",
  escuela: "Escuela Técnica N° 1 — Orientación en Informática",
  reseña:
    "Somos dos estudiantes de la orientación en Informática. Durante estos años pasamos por charlas, visitas a empresas y encaramos proyectos propios que fuimos documentando en el camino. Este portfolio reúne todo eso: lo que aprendimos, dónde estuvimos, y en qué trabajamos cada uno y en qué trabajamos juntos.",
};

const miembros = [
  {
    id: "persona1",
    nombre: "Nombre Apellido",
    rol: "Desarrollo & Lógica",
    bio: "Escribí acá tu presentación: qué te gusta de la informática, en qué te gustaría especializarte y qué fuiste aprendiendo en la escuela. Dos o tres oraciones alcanzan.",
    foto: "",
    iniciales: "NA",
    habilidades: [
      { nombre: "Python", nivel: 4 },
      { nombre: "HTML & CSS", nivel: 5 },
      { nombre: "JavaScript", nivel: 3 },
      { nombre: "Visual Basic", nivel: 3 },
      { nombre: "Uso de IA", nivel: 4 },
    ],
    redes: {
      instagram: "https://instagram.com/",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      email: "persona1@ejemplo.com",
    },
  },
  {
    id: "persona2",
    nombre: "Nombre Apellido",
    rol: "Diseño & Documentación",
    bio: "Escribí acá tu presentación: qué te gusta de la informática, en qué te gustaría especializarte y qué fuiste aprendiendo en la escuela. Dos o tres oraciones alcanzan.",
    foto: "",
    iniciales: "NA",
    habilidades: [
      { nombre: "Python", nivel: 3 },
      { nombre: "HTML & CSS", nivel: 4 },
      { nombre: "JavaScript", nivel: 4 },
      { nombre: "Visual Basic", nivel: 2 },
      { nombre: "Uso de IA", nivel: 5 },
    ],
    redes: {
      instagram: "https://instagram.com/",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      email: "persona2@ejemplo.com",
    },
  },
];

/* tipo: "proyecto" | "charla" | "visita"
   participantes: ["persona1"] | ["persona2"] | ["persona1","persona2"] */
const items = [
  {
    id: 1,
    titulo: "Visita a empresa de desarrollo de software",
    tipo: "visita",
    categoria: "Empresas",
    participantes: ["persona1", "persona2"],
    fecha: "2024-05-14",
    descripcion:
      "Recorrimos las oficinas y hablamos con desarrolladores sobre cómo es el día a día en un equipo de trabajo real, metodologías ágiles y primeros pasos en el mundo laboral.",
    imagen: "",
  },
  {
    id: 2,
    titulo: "Charla: Introducción a la Inteligencia Artificial",
    tipo: "charla",
    categoria: "Inteligencia Artificial",
    participantes: ["persona1"],
    fecha: "2024-06-03",
    descripcion:
      "Charla a cargo de un ingeniero en sistemas sobre modelos de lenguaje, usos responsables de la IA y su impacto en el mercado laboral actual.",
    imagen: "",
  },
  {
    id: 3,
    titulo: "Proyecto: Sistema de gestión de biblioteca escolar",
    tipo: "proyecto",
    categoria: "Programación",
    participantes: ["persona1", "persona2"],
    fecha: "2024-08-20",
    descripcion:
      "Desarrollamos en Python una aplicación de escritorio para registrar préstamos de libros de la biblioteca del colegio, con base de datos local y reportes en PDF.",
    imagen: "",
  },
  {
    id: 4,
    titulo: "Visita a data center regional",
    tipo: "visita",
    categoria: "Infraestructura",
    participantes: ["persona2"],
    fecha: "2024-09-11",
    descripcion:
      "Conocimos cómo funciona un centro de datos: refrigeración, seguridad física, redundancia y el trabajo de los equipos de infraestructura.",
    imagen: "",
  },
  {
    id: 5,
    titulo: "Proyecto: Página web para comercio del barrio",
    tipo: "proyecto",
    categoria: "Diseño Web",
    participantes: ["persona2"],
    fecha: "2024-10-02",
    descripcion:
      "Diseño y maquetado con HTML, CSS y JavaScript de un sitio institucional para un comercio local, incluyendo catálogo y formulario de contacto.",
    imagen: "",
  },
  {
    id: 6,
    titulo: "Charla: Ciberseguridad para principiantes",
    tipo: "charla",
    categoria: "Seguridad",
    participantes: ["persona1", "persona2"],
    fecha: "2024-10-29",
    descripcion:
      "Un especialista en seguridad informática nos contó sobre buenas prácticas, contraseñas seguras, phishing y cómo cuidar la identidad digital.",
    imagen: "",
  },
  {
    id: 7,
    titulo: "Proyecto: Automatización de planillas con Visual Basic",
    tipo: "proyecto",
    categoria: "Automatización",
    participantes: ["persona1"],
    fecha: "2025-03-18",
    descripcion:
      "Macro en Visual Basic para Excel que automatiza la carga de notas y genera boletines individuales en segundos.",
    imagen: "",
  },
  {
    id: 8,
    titulo: "Visita a incubadora de startups",
    tipo: "visita",
    categoria: "Emprendimiento",
    participantes: ["persona1", "persona2"],
    fecha: "2025-04-25",
    descripcion:
      "Conocimos distintos proyectos en etapa temprana y hablamos con sus fundadores sobre cómo pasar de una idea a un producto real.",
    imagen: "",
  },
];
