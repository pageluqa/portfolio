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
    bio: "¡Hola, soy Luca! me gusta la informatica, me gustaria poder pregramar mis propios sitios webs y poder vivir de lo que me gusta que es la informatica.",
    foto: "assets/img/foto luca.jpg",
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
    bio: "¡Hola, soy lucio! me interesa la informatica y todo lo relacionado con las computadoras, me gustaria aprender mucho mas y poder crear mis propias aplicaciones, juegos, etc.",
    foto: "assets/img/foto lucio.jpg",
    iniciales: "LM",
    habilidades: [
      { nombre: "Python", nivel: 3 },
      { nombre: "HTML & CSS", nivel: 5 },
      { nombre: "JavaScript", nivel: 4 },
      { nombre: "Visual Basic", nivel: 4 },
      { nombre: "Uso de IA", nivel: 5 },
    ],
    redes: {
      instagram: "https://instagram.com/lucio.mnz",
      github: "https://github.com/pageluqa?tab=repositories",
      linkedin: "https://www.linkedin.com/in/lucio-monzon-aa490a449/",
      email: "luciomonzonbie@gmail.com",
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
    titulo: "Pozo de banfield",
    tipo: "visita",
    categoria: "Excursion",
    participantes: ["luca monzón"],
    fecha: "2026-05-13",
    descripcion:
      "Recorrimos las instalaciones y nos hablaron de todo lo que ocurrio ahi.",
    imagen: "assets/img/pozo.jpg",
  },
  {
    id: 3,
    titulo: "Piletas municipales en ministro rivadavia",
    tipo: "visita",
    categoria: "Paseo",
    participantes: ["lucio monzón", "luca monzón"],
    fecha: "2024-08-20",
    descripcion:
      "Visitamos las piletas municipales de ministro rivadavia y realizamos actividades con relacion a la natacion.",
    imagen: "assets/img/Natatorio municipal.jpg",
  },
  {
    id: 4,
    titulo: "Granja municipal de ministro rivadavia",
    tipo: "visita",
    categoria: "Excursion",
    participantes: ["lucio monzon"],
    fecha: "2025-09-11",
    descripcion:
      "Hicimos una excursion a la granja municipal de ministro rivadavia, junto a otras E.P.S y compartimos un almuerzo todos juntos.",
    imagen: "assets/img/granja municipal.jpg",
  },
  {
    id: 5,
    titulo: "Proyecto ONU",
    tipo: "proyecto",
    categoria: "Debates",
    participantes: ["lucio monzón"],
    fecha: "2026-06-02",
    descripcion:
      "Debatimos a favor del pais que nos toco representar junto a otros estudiantes mas que realizaban lo mismo que nosotros",
    imagen: "assets/img/Proyecto ONU.jpg",
  },
  {
    id: 6,
    titulo: "Muestra anual CFPN°401",
    tipo: "charla",
    categoria: "Muestra",
    participantes: ["luca monzón", "lucio monzón"],
    fecha: "2025-11-29",
    descripcion:
      "Nos explicaron varios temas relacionados al trabajo y como manejar algunas situaciones del mundo laboral",
    imagen: "assets/img/tecnica 3 claypole.jpg",
  },
  {
    id: 7,
    titulo: "Filab feria del libro de alte brown",
    tipo: "visita",
    categoria: "paseo",
    participantes: ["lucio monzón"],
    fecha: "2025-10-18",
    descripcion:
      "Visitamos la feria del libro en adrogue y junto a otras escuelas nos enseñaron muchas cosas interesantes relacionadas con los libros, autores, etc.",
    imagen: "assets/img/FILAB feria del libro.jpg",
  },
  {
    id: 8,
    titulo: "Salida UNLA",
    tipo: "visita",
    categoria: "Exposicion",
    participantes: ["lucio monzón", "luca monzón"],
    fecha: "2026-06-25",
    descripcion:
      "Nos dieron un recorrido por la universidad y nos hablaron de las distintas carreras disponibles en esa universidad",
    imagen: "assets/img/Unla.jpg",
  },
];
