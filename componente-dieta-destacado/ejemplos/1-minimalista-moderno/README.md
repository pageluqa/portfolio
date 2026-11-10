# 📚 PORTFOLIO - Minimalista Moderno

## 🎨 Descripción del Diseño

Un portfolio profesional y limpio con una estética minimalista. Perfecto para un equipo que busca verse **formal, profesional y elegante**.

**Colores Principales:**
- 🖤 Negro (#000000)
- ⚪ Blanco (#FFFFFF)
- 🔵 Azul (#2563eb)
- 🩶 Gris (#F5F5F5)

**Características Visuales:**
- Diseño limpio sin distracciones
- Tipografía clara y legible
- Navegación intuitiva
- Transiciones suaves

---

## 🚀 Cómo Levantarlo

### Paso 1: Coloca las imágenes
```
images/team/
├── person1.jpg
└── person2.jpg

images/projects/
├── project1.jpg
├── project2.jpg
└── (las demás imágenes de proyectos)
```

### Paso 2: Edita `data/data.json`
Reemplaza los datos de ejemplo con los tuyos:
- Nombres de personas
- Títulos de proyectos
- Descripciones
- Fechas
- Participantes (Persona 1, Persona 2 o Ambos)

### Paso 3: Personaliza `index.html`
Busca y reemplaza:
- "Persona 1" → tu nombre
- "Persona 2" → tu nombre
- Emails de contacto
- URLs de redes sociales

### Paso 4: Sirve el proyecto
```bash
# Con VSCode Live Server: Click derecho en index.html → Open with Live Server
# Con Python: python -m http.server 8000
# Con Node: http-server
```

---

## 📊 Estructura de Datos

### Objeto Proyecto:
```json
{
  "id": 1,
  "title": "Nombre del Proyecto",
  "description": "Descripción detallada...",
  "category": "Charla",  // Charla | Visita Técnica | Proyecto | Evento
  "participants": "Persona 1",  // Persona 1 | Persona 2 | Ambos
  "date": "15/03/2024",
  "image": "images/projects/project1.jpg"
}
```

### Objeto Habilidad:
```json
{
  "name": "Python",
  "description": "Descripción corta",
  "level": 5  // 1-5 estrellas
}
```

---

## 🎯 Secciones Principales

### 1. **NAVEGACIÓN**
Menú fijo que lleva a cada sección del portfolio

### 2. **HERO**
Portada con mensaje de bienvenida y call-to-action

### 3. **EQUIPO**
Tarjetas con fotos, bios y redes sociales de ambas personas

### 4. **PROYECTOS**
Grid de proyectos con:
- Filtrado por persona (Persona 1, Persona 2, Ambos)
- Filtrado por categoría
- Modal al hacer click en cada proyecto

### 5. **HABILIDADES**
Tarjetas de habilidades con sistema de estrellas (1-5)

### 6. **CONTACTO**
Información de contacto e integración de redes sociales

---

## 🔧 Personalización

### Cambiar Colores

Edita `css/styles.css`, sección `:root`:

```css
:root {
    --primary: #000000;      /* Color principal (cambiar a tu color) */
    --secondary: #f5f5f5;    /* Color secundario */
    --accent: #2563eb;       /* Color de énfasis (botones, links) */
    --text: #333333;         /* Color de texto */
    --light-gray: #e5e5e5;   /* Gris claro */
    --white: #ffffff;        /* Blanco */
}
```

### Ejemplos de Paletas Alternativas:

**Opción Verde (Tech):**
```css
--primary: #1a3a2a;
--accent: #10b981;
--secondary: #ecfdf5;
```

**Opción Rojo (Energético):**
```css
--primary: #7f1d1d;
--accent: #dc2626;
--secondary: #fee2e2;
```

---

## 📱 Responsividad

El diseño es completamente responsivo:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

Los puntos de quiebre están configurados en CSS media queries.

---

## 🎬 Animaciones

Las animaciones incluidas son sutiles:
- Hover en botones (cambio de color)
- Hover en tarjetas (elevación)
- Transiciones suaves entre secciones

Para deshabilitar animaciones, edita `css/styles.css` y busca `transition` o `animation`.

---

## 💾 Cargar Datos Externos

El archivo `js/data-loader.js` carga `data/data.json` automáticamente:

```javascript
async function loadData() {
    const response = await fetch('data/data.json');
    const data = await response.json();
    // ...procesa datos
}
```

Si quieres cambiar esto:
1. Edita la URL en la función `fetch()`
2. Asegúrate que el servidor CORS está configurado (si es externa)

---

## 🌐 Desplegar

### GitHub Pages
1. Crea repo en GitHub
2. Sube los archivos
3. Settings → Pages → Selecciona rama main
4. Tu sitio estará en: `https://usuario.github.io/nombre-repo`

### Netlify
1. Arrastra la carpeta a [netlify.com](https://netlify.com)
2. Listo en minutos

### Servidor Traditional
Sube vía FTP a tu hosting

---

## 🐛 Debugging

Abre la consola del navegador (F12) para ver:
- Errores al cargar `data.json`
- Advertencias de JavaScript
- Estado de la red

### Errores Comunes:

**"Failed to load data.json"**
- Verifica que el archivo exista
- Verifica la ruta exacta

**Imágenes rotas (broken)**
- Verifica que las imágenes estén en `images/team/` y `images/projects/`
- Verifica que los nombres coincidan exactamente

**Filtrado no funciona**
- Abre consola (F12) → pestaña Network
- Verifica que `data.json` se carga correctamente
- Verifica que los participantes sean exactamente: "Persona 1", "Persona 2" o "Ambos"

---

## 📚 Archivos Importantes

| Archivo | Función |
|---------|---------|
| `index.html` | Estructura HTML principal |
| `css/styles.css` | Todos los estilos (cambiar aquí para personalizar) |
| `js/data-loader.js` | Carga datos de JSON |
| `js/filters.js` | Lógica de filtrado |
| `js/modal.js` | Funcionamiento del modal de proyectos |
| `data/data.json` | **TUS DATOS** (editar aquí) |

---

## ✅ Checklist Final

Antes de publicar tu portfolio:

- [ ] Cambiaste los nombres de las personas
- [ ] Agregaste los emails y teléfonos correctos
- [ ] Colocaste las fotos de ambas personas en `images/team/`
- [ ] Agregaste las imágenes de proyectos en `images/projects/`
- [ ] Actualizaste `data.json` con tus proyectos y habilidades
- [ ] Cambiaste los URLs de redes sociales
- [ ] Probaste el filtrado (por persona y por categoría)
- [ ] Probaste el modal de proyectos
- [ ] Verificaste en mobile que se vea bien
- [ ] Subiste a Internet (GitHub Pages, Netlify, etc.)

---

## 📞 Tips

1. **Usa fotos profesionales** - Iluminación clara, fondo limpio
2. **Descripciones concisas** - Máximo 3 líneas por proyecto
3. **Actualiza regularmente** - Agrega nuevos eventos conforme ocurran
4. **Prueba en móvil** - La mayoría verá tu portfolio en teléfono
5. **Verifica links** - Que todos los enlaces de redes funcionen

---

**¡Tu portfolio está listo para brillar! ✨**
