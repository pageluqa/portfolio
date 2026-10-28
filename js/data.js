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
  nombre: "Dúo Monzón.",
  escuela: "Escuela Secundaria N° 14 — Orientación en Informática",
  reseña:
    "Somos dos estudiantes en la orientación en Informática de la Secundaria N°14.",
};

const miembros = [
  {
    id: "Luca Monzón",
    nombre: "Luca Monzón",
    rol: "Desarrollo & Lógica",
    bio: "Escribí acá tu presentación: ¡Hola, soy Luca! me gusta la informatica, me gustaria poder pregramar mis propios sitios webs y poder vivir de lo que me gusta que es la informatica.",
    foto: "",
    iniciales: "LM",
    habilidades: [
      { nombre: "Python", nivel: 4 },
      { nombre: "HTML & CSS", nivel: 5 },
      { nombre: "JavaScript", nivel: 3 },
      { nombre: "Visual Basic", nivel: 4 },
      { nombre: "Uso de IA", nivel: 5 },
    ],
    redes: {
      instagram: "https://instagram.com/rikiinshmra?igsi=OHdidtc5YTc2d3V1",
      github: "https://github.com/pageluqa?tab=repositories",
      linkedin: "https://www.linkedin.com/in/luca-monzon-43a04b438/",
      email: "lucamonzon012@gmail.com",
    },
  },
  {
    id: "Lucio",
    nombre: "Lucio Monzón",
    rol: "Diseño & Documentación",
    bio: "Escribí acá tu presentación: qué te gusta de la informática, en qué te gustaría especializarte y qué fuiste aprendiendo en la escuela. Dos o tres oraciones alcanzan.",
    foto: "",
    iniciales: "LM",
    habilidades: [
      { nombre: "Python", nivel: 3 },
      { nombre: "HTML & CSS", nivel: 5 },
      { nombre: "JavaScript", nivel: 4 },
      { nombre: "Visual Basic", nivel: 4 },
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
    titulo: "Proyecto  Portfolio",
    tipo: "visita",
    categoria: "Empresas",
    participantes: ["Luca Monzón", "Lucio Monzón"],
    fecha: "2026-09-17",
    descripcion:
      "realizamos un proyecto sobre esta pagina web con los profesores de la Secundaria N°14 en base a lo que nos enseñaron.",
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
