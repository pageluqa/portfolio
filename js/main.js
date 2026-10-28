/* ============================================================
   MAIN.JS
   Lógica del sitio: pinta la info de data.js en el HTML,
   arma los filtros de la galería y maneja el visor de imágenes.
   No hace falta tocar este archivo para cargar contenido nuevo:
   con editar data.js alcanza. Solo tocalo si querés cambiar
   el COMPORTAMIENTO del sitio.
   ============================================================ */

const ICONOS_TIPO = {
  proyecto: "💻",
  charla: "🎤",
  visita: "🏫",
};

const ETIQUETAS_TIPO = {
  proyecto: "Proyecto",
  charla: "Charla",
  visita: "Visita",
};

let filtroPersonaActual = "todos";
let filtroCategoriaActual = "todas";

document.addEventListener("DOMContentLoaded", () => {
  renderEquipo();
  renderMiembros();
  renderHabilidades();
  renderContacto();
  renderFiltrosCategoria();
  renderGaleria();
  setupFiltros();
  setupLightbox();
  setupNavMovil();
});

/* ---------- EQUIPO ---------- */
function renderEquipo() {
  const nombre = document.getElementById("equipo-nombre");
  const marca = document.getElementById("equipo-nombre-marca");
  const footer = document.getElementById("equipo-nombre-footer");
  const escuela = document.getElementById("equipo-escuela");
  const resenia = document.getElementById("equipo-resenia");
  if (nombre) nombre.textContent = equipo.nombre;
  if (marca) marca.textContent = equipo.nombre;
  if (footer) footer.textContent = equipo.nombre;
  if (escuela) escuela.textContent = equipo.escuela;
  if (resenia) resenia.textContent = equipo.reseña;
}

/* ---------- MIEMBROS (presentación personal) ---------- */
function renderMiembros() {
  const cont = document.getElementById("miembros-wrap");
  if (!cont) return;
  cont.innerHTML = "";

  miembros.forEach((m) => {
    const card = document.createElement("article");
    card.className = "miembro-card";

    const foto = document.createElement("div");
    foto.className = "miembro-foto";
    if (m.foto) {
      const img = document.createElement("img");
      img.src = m.foto;
      img.alt = "Foto de " + m.nombre;
      img.loading = "lazy";
      img.addEventListener("error", () => {
        foto.classList.add("sin-foto");
        foto.innerHTML = `<span>${m.iniciales}</span>`;
      });
      foto.appendChild(img);
    } else {
      foto.classList.add("sin-foto");
      foto.innerHTML = `<span>${m.iniciales}</span>`;
    }

    const info = document.createElement("div");
    info.className = "miembro-info";
    info.innerHTML = `
      <h3 class="miembro-nombre">${m.nombre}</h3>
      <p class="miembro-rol">${m.rol}</p>
      <p class="miembro-bio">${m.bio}</p>
    `;

    card.appendChild(foto);
    card.appendChild(info);
    cont.appendChild(card);
  });
}

/* ---------- HABILIDADES (tarjetas con estrellas) ---------- */
function renderHabilidades() {
  const cont = document.getElementById("habilidades-wrap");
  if (!cont) return;
  cont.innerHTML = "";

  miembros.forEach((m) => {
    const grupo = document.createElement("div");
    grupo.className = "habilidades-grupo";

    const titulo = document.createElement("h3");
    titulo.className = "habilidades-grupo-titulo";
    titulo.textContent = m.nombre;
    grupo.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "habilidades-grid";

    m.habilidades.forEach((h) => {
      const card = document.createElement("div");
      card.className = "skill-card";
      const estrellas = renderEstrellas(h.nivel);
      card.innerHTML = `
        <p class="skill-nombre">${h.nombre}</p>
        <div class="skill-estrellas" aria-label="Nivel ${h.nivel} de 5">${estrellas}</div>
      `;
      grid.appendChild(card);
    });

    grupo.appendChild(grid);
    cont.appendChild(grupo);
  });
}

function renderEstrellas(nivel) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<span class="estrella ${i <= nivel ? "llena" : ""}">★</span>`;
  }
  return html;
}

/* ---------- CONTACTO ---------- */
const ICONOS_RED = {
  instagram: "IG",
  github: "GH",
  linkedin: "in",
  email: "@",
};

function renderContacto() {
  const cont = document.getElementById("contacto-wrap");
  if (!cont) return;
  cont.innerHTML = "";

  miembros.forEach((m) => {
    const card = document.createElement("article");
    card.className = "contacto-card";

    const enlaces = Object.entries(m.redes)
      .filter(([, url]) => url)
      .map(([red, url]) => {
        const href = red === "email" ? `mailto:${url}` : url;
        const texto = red === "email" ? url : "@" + red;
        return `<a href="${href}" target="${red === "email" ? "_self" : "_blank"}" rel="noopener" class="contacto-link">
          <span class="contacto-link-icono">${ICONOS_RED[red] || "•"}</span>
          <span>${red.charAt(0).toUpperCase() + red.slice(1)}</span>
        </a>`;
      })
      .join("");

    card.innerHTML = `
      <h3 class="contacto-nombre">${m.nombre}</h3>
      <p class="contacto-rol">${m.rol}</p>
      <div class="contacto-links">${enlaces}</div>
    `;
    cont.appendChild(card);
  });
}

/* ---------- FILTRO DE CATEGORÍAS (dinámico según data.js) ---------- */
function renderFiltrosCategoria() {
  const select = document.getElementById("filtro-categoria");
  if (!select) return;
  const categorias = [...new Set(items.map((i) => i.categoria))].sort();
  categorias.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

/* ---------- GALERÍA ---------- */
function renderGaleria() {
  const grid = document.getElementById("galeria-grid");
  const vacio = document.getElementById("galeria-vacio");
  if (!grid) return;
  grid.innerHTML = "";

  const filtrados = items.filter((item) => {
    const pasaPersona =
      filtroPersonaActual === "todos" ||
      (filtroPersonaActual === "ambos"
        ? item.participantes.length === 2
        : item.participantes.includes(filtroPersonaActual));
    const pasaCategoria =
      filtroCategoriaActual === "todas" || item.categoria === filtroCategoriaActual;
    return pasaPersona && pasaCategoria;
  });

  if (vacio) vacio.hidden = filtrados.length !== 0;

  filtrados
    .slice()
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .forEach((item) => grid.appendChild(crearTarjetaItem(item)));
}

function crearTarjetaItem(item) {
  const card = document.createElement("article");
  card.className = "item-card";
  card.dataset.tipo = item.tipo;

  const media = document.createElement("div");
  media.className = "item-media";

  if (item.imagen) {
    const img = document.createElement("img");
    img.src = item.imagen;
    img.alt = item.titulo;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      media.classList.add("sin-imagen");
      media.innerHTML = `<span class="item-media-icono">${ICONOS_TIPO[item.tipo]}</span>`;
    });
    media.appendChild(img);
    media.addEventListener("click", () => abrirLightbox(item));
    media.tabIndex = 0;
    media.setAttribute("role", "button");
    media.setAttribute("aria-label", "Ver imagen de " + item.titulo);
    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") abrirLightbox(item);
    });
  } else {
    media.classList.add("sin-imagen");
    media.innerHTML = `<span class="item-media-icono">${ICONOS_TIPO[item.tipo]}</span>`;
  }

  const fecha = new Date(item.fecha + "T00:00:00");
  const fechaTexto = fecha.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const cuerpo = document.createElement("div");
  cuerpo.className = "item-cuerpo";
  cuerpo.innerHTML = `
    <div class="item-etiquetas">
      <span class="etiqueta etiqueta-tipo tipo-${item.tipo}">${ICONOS_TIPO[item.tipo]} ${ETIQUETAS_TIPO[item.tipo]}</span>
      <span class="etiqueta etiqueta-categoria">${item.categoria}</span>
    </div>
    <h3 class="item-titulo">${item.titulo}</h3>
    <p class="item-descripcion">${item.descripcion}</p>
    <div class="item-pie">
      <span class="item-fecha">${fechaTexto}</span>
      <span class="item-participantes">${participantesTexto(item.participantes)}</span>
    </div>
  `;

  card.appendChild(media);
  card.appendChild(cuerpo);
  return card;
}

function participantesTexto(participantes) {
  if (participantes.length === 2) return "👥 " + miembros.map((m) => m.nombre.split(" ")[0]).join(" & ");
  const m = miembros.find((mm) => mm.id === participantes[0]);
  return m ? "👤 " + m.nombre.split(" ")[0] : "";
}

/* ---------- FILTROS (botones + select) ---------- */
function setupFiltros() {
  const botonesPersona = document.querySelectorAll("[data-filtro-persona]");
  botonesPersona.forEach((btn) => {
    btn.addEventListener("click", () => {
      botonesPersona.forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
      filtroPersonaActual = btn.dataset.filtroPersona;
      renderGaleria();
    });
  });

  const selectCategoria = document.getElementById("filtro-categoria");
  if (selectCategoria) {
    selectCategoria.addEventListener("change", () => {
      filtroCategoriaActual = selectCategoria.value;
      renderGaleria();
    });
  }
}

/* ---------- LIGHTBOX (visor de imagen ampliada) ---------- */
function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  const cerrar = document.getElementById("lightbox-cerrar");
  cerrar.addEventListener("click", cerrarLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) cerrarLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarLightbox();
  });
}

function abrirLightbox(item) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  document.getElementById("lightbox-img").src = item.imagen;
  document.getElementById("lightbox-img").alt = item.titulo;
  document.getElementById("lightbox-caption").textContent = item.titulo;
  lightbox.classList.add("abierto");
  lightbox.setAttribute("aria-hidden", "false");
}

function cerrarLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("abierto");
  lightbox.setAttribute("aria-hidden", "true");
}

/* ---------- NAV MÓVIL ---------- */
function setupNavMovil() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-links");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("abierto");
    toggle.classList.toggle("abierto");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("abierto");
      toggle.classList.remove("abierto");
    })
  );
}
