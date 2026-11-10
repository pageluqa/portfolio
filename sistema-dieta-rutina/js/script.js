/* ============================================================
   SCRIPT.JS
   Generador de dieta y rutina — TODO se calcula acá mismo,
   en el navegador de quien usa la página. No hay servidor,
   no hay base de datos, no se guarda ni se envía nada a
   ningún lado. Al tocar "Generar mi plan" se ejecuta esta
   función y se pinta el resultado al instante.

   Está dividido en funciones chicas y con nombres en español
   para que sea fácil de leer y de modificar. Cada función
   hace UNA sola cosa. Están explicadas paso a paso también
   en el README.md del proyecto.
   ============================================================ */

/* ---------- 1. DATOS DE REFERENCIA ----------
   Como pedimos una FRANJA etaria (no la edad exacta), usamos
   un número "representativo" de esa franja para poder calcular.
   Es una aproximación a propósito simple. */
const EDAD_APROXIMADA = {
  "menor18": 16,
  "18-25": 21,
  "26-35": 30,
  "36-45": 40,
  "46-60": 53,
  "mas60": 65,
};

/* Horas de sueño recomendadas según franja etaria (guía general). */
const SUENO_RECOMENDADO = {
  "menor18": [8, 10],
  "18-25": [7, 9],
  "26-35": [7, 9],
  "36-45": [7, 9],
  "46-60": [7, 8],
  "mas60": [7, 8],
};

/* Factor de actividad física para el cálculo de calorías (fórmula
   estándar de "gasto calórico total" a partir del metabolismo basal). */
const FACTOR_ACTIVIDAD = {
  "sedentario": 1.2,
  "ligera": 1.375,
  "moderada": 1.55,
  "intensa": 1.725,
  "muy-intensa": 1.9,
};

/* ---------- 2. ARRANQUE ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-datos");
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // evita que la página se recargue
    manejarEnvio();
  });

  configurarCheckboxNinguna();
});

/* Si tildan "Ninguna de estas", destildamos el resto (y al revés). */
function configurarCheckboxNinguna() {
  const casillas = Array.from(document.querySelectorAll('input[name="enfermedad"]'));
  const casillaNinguna = casillas.find((c) => c.value === "ninguna");

  casillas.forEach((casilla) => {
    casilla.addEventListener("change", () => {
      if (casilla === casillaNinguna && casilla.checked) {
        casillas.forEach((c) => { if (c !== casillaNinguna) c.checked = false; });
      } else if (casilla !== casillaNinguna && casilla.checked) {
        casillaNinguna.checked = false;
      }
    });
  });
}

/* ---------- 3. FUNCIÓN PRINCIPAL (se dispara al enviar el formulario) ---------- */
function manejarEnvio() {
  const datos = leerFormulario();
  const error = validarDatos(datos);
  const mensajeError = document.getElementById("mensaje-error");

  if (error) {
    mensajeError.textContent = error;
    mensajeError.hidden = false;
    return;
  }
  mensajeError.hidden = true;

  // Cálculos base
  const alturaMetros = datos.altura / 100;
  const imc = calcularIMC(datos.peso, alturaMetros);
  const categoriaImc = categorizarIMC(imc);
  const edadAprox = EDAD_APROXIMADA[datos.franjaEtaria];
  const tmb = calcularTMB(datos.sexo, datos.peso, datos.altura, edadAprox);
  const tdee = calcularTDEE(tmb, datos.actividadFisica);

  // Generación de cada bloque del plan
  const dieta = generarDieta(tdee, datos.tipoDieta, datos.enfermedades);
  const rutina = generarRutina(datos.actividadFisica, datos.franjaEtaria, datos.horasEstudio, datos.enfermedades);
  const sueno = generarRecomendacionSueno(datos.franjaEtaria, datos.horasSueno);
  const notasSalud = generarNotasSalud(datos.enfermedades);

  // Pintar todo en la página
  mostrarResumen({ imc, categoriaImc, tdee, tmb });
  mostrarDieta(dieta);
  mostrarRutina(rutina);
  mostrarSueno(sueno);
  mostrarNotasSalud(notasSalud);

  const resultado = document.getElementById("resultado");
  resultado.hidden = false;
  resultado.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- 4. LEER Y VALIDAR EL FORMULARIO ---------- */
function leerFormulario() {
  const enfermedadesMarcadas = Array.from(
    document.querySelectorAll('input[name="enfermedad"]:checked')
  ).map((casilla) => casilla.value);

  return {
    franjaEtaria: document.getElementById("franja-etaria").value,
    sexo: document.getElementById("sexo").value,
    peso: parseFloat(document.getElementById("peso").value),
    altura: parseFloat(document.getElementById("altura").value),
    horasSueno: parseFloat(document.getElementById("horas-sueno").value),
    horasEstudio: parseFloat(document.getElementById("horas-estudio").value),
    actividadFisica: document.getElementById("actividad-fisica").value,
    tipoDieta: document.getElementById("tipo-dieta").value,
    enfermedades: enfermedadesMarcadas,
  };
}

function validarDatos(datos) {
  if (!datos.franjaEtaria || !datos.sexo || !datos.actividadFisica || !datos.tipoDieta) {
    return "Completá todos los campos con lista desplegable antes de generar el plan.";
  }
  if (!datos.peso || datos.peso <= 0) return "Ingresá un peso válido.";
  if (!datos.altura || datos.altura <= 0) return "Ingresá una altura válida.";
  if (datos.horasSueno === "" || isNaN(datos.horasSueno) || datos.horasSueno < 0) {
    return "Ingresá las horas de sueño.";
  }
  if (datos.horasEstudio === "" || isNaN(datos.horasEstudio) || datos.horasEstudio < 0) {
    return "Ingresá las horas de estudio o trabajo.";
  }
  return null; // sin errores
}

/* ---------- 5. CÁLCULOS NUMÉRICOS ---------- */

// IMC = peso (kg) / altura (m) al cuadrado
function calcularIMC(pesoKg, alturaM) {
  return pesoKg / (alturaM * alturaM);
}

function categorizarIMC(imc) {
  if (imc < 18.5) return "Bajo peso";
  if (imc < 25) return "Peso saludable";
  if (imc < 30) return "Sobrepeso";
  return "Obesidad";
}

// Metabolismo basal con la fórmula de Mifflin-St Jeor (muy usada y simple)
function calcularTMB(sexo, pesoKg, alturaCm, edad) {
  const base = 10 * pesoKg + 6.25 * alturaCm - 5 * edad;
  if (sexo === "masculino") return base + 5;
  if (sexo === "femenino") return base - 161;
  return base - 78; // promedio aproximado si no se especifica
}

// Gasto calórico diario total = metabolismo basal x nivel de actividad
function calcularTDEE(tmb, actividad) {
  const factor = FACTOR_ACTIVIDAD[actividad] || 1.2;
  return Math.round(tmb * factor);
}

/* ---------- 6. GENERADOR DE DIETA ---------- */
function generarDieta(tdee, tipoDieta, enfermedades) {
  // Distribución general de macronutrientes (guía estándar y equilibrada)
  const gramosProteina = Math.round((tdee * 0.25) / 4); // 4 kcal por gramo
  const gramosCarbohidratos = Math.round((tdee * 0.45) / 4);
  const gramosGrasas = Math.round((tdee * 0.3) / 9); // 9 kcal por gramo

  // Fuentes de proteína según el tipo de alimentación
  const fuentesProteina = {
    "omnivora": ["pollo", "carne magra", "huevo", "pescado", "yogur/queso"],
    "vegetariana": ["huevo", "yogur/queso", "legumbres (lentejas, garbanzos)", "tofu"],
    "vegana": ["legumbres (lentejas, garbanzos, porotos)", "tofu", "seitán", "frutos secos"],
    "sin-gluten": ["pollo", "carne magra", "huevo", "pescado", "legumbres"],
    "sin-lactosa": ["pollo", "carne magra", "huevo", "pescado", "legumbres"],
  };

  const notasDieta = [];
  if (tipoDieta === "vegana") notasDieta.push("Sumá una fuente de vitamina B12 (fortificados o suplemento indicado por un profesional), ya que es difícil de cubrir solo con alimentos vegetales.");
  if (tipoDieta === "sin-gluten") notasDieta.push("Evitá trigo, avena común, cebada y centeno; elegí arroz, maíz, papa, quinoa y productos rotulados 'sin TACC'.");
  if (tipoDieta === "sin-lactosa") notasDieta.push("Reemplazá lácteos por versiones sin lactosa o bebidas vegetales fortificadas con calcio.");

  // Ajustes según enfermedades hereditarias marcadas
  if (enfermedades.includes("diabetes")) notasDieta.push("Antecedentes de diabetes: priorizá carbohidratos de bajo índice glucémico (legumbres, avena, verduras) y reducí azúcares simples y harinas refinadas.");
  if (enfermedades.includes("hipertension")) notasDieta.push("Antecedentes de hipertensión: reducí la sal agregada y los alimentos ultraprocesados; usá especias y hierbas para dar sabor.");
  if (enfermedades.includes("colesterol")) notasDieta.push("Antecedentes de colesterol alto: limitá frituras y grasas saturadas (fiambres, snacks); sumá pescado, aceite de oliva, frutos secos y fibra (avena, legumbres).");
  if (enfermedades.includes("cardiaca")) notasDieta.push("Antecedentes cardíacos: cuidá el consumo de sodio y grasas saturadas, y priorizá cocciones al horno, plancha o vapor por sobre las frituras.");
  if (enfermedades.includes("celiaquia")) notasDieta.push("Celiaquía: la alimentación debe ser 100% libre de gluten (sin TACC), verificando siempre el rotulado de los productos.");

  const menuEjemplo = [
    { comida: "Desayuno", sugerencia: `Lácteo o alternativa + fruta + cereal integral (ej: avena, pan integral). Fuente de proteína: ${fuentesProteina[tipoDieta][0]}.` },
    { comida: "Almuerzo", sugerencia: `Vegetales (mitad del plato) + fuente de proteína (${fuentesProteina[tipoDieta].join(", ")}) + carbohidrato complejo (arroz, papa, quinoa).` },
    { comida: "Merienda", sugerencia: "Fruta + frutos secos o yogur/alternativa vegetal." },
    { comida: "Cena", sugerencia: `Similar al almuerzo, en porción algo más liviana. Fuente de proteína: ${fuentesProteina[tipoDieta][1] || fuentesProteina[tipoDieta][0]}.` },
    { comida: "Hidratación", sugerencia: "Al menos 1.5 a 2 litros de agua repartidos durante el día." },
  ];

  return {
    calorias: tdee,
    proteina: gramosProteina,
    carbohidratos: gramosCarbohidratos,
    grasas: gramosGrasas,
    menuEjemplo,
    notas: notasDieta,
  };
}

/* ---------- 7. GENERADOR DE RUTINA ---------- */
function generarRutina(actividad, franjaEtaria, horasEstudio, enfermedades) {
  // Días de entrenamiento sugeridos según el nivel de actividad actual
  const diasPorNivel = {
    "sedentario": 3,
    "ligera": 3,
    "moderada": 4,
    "intensa": 5,
    "muy-intensa": 5,
  };
  let dias = diasPorNivel[actividad] || 3;

  // Si estudia/trabaja muchas horas, priorizamos rutinas más cortas y eficientes
  const minutosPorSesion = horasEstudio >= 9 ? 30 : horasEstudio >= 6 ? 40 : 50;

  // Tipo de ejercicio sugerido según franja etaria
  let enfoque = [];
  if (franjaEtaria === "menor18") {
    enfoque = ["Actividades variadas y recreativas (deportes de equipo, natación, bici)", "Ejercicios con el propio peso corporal, técnica antes que carga", "Juegos que impliquen correr, saltar y coordinación"];
  } else if (franjaEtaria === "mas60") {
    enfoque = ["Caminatas y ejercicio aeróbico de bajo impacto", "Ejercicios de fuerza livianos para mantener masa muscular y huesos fuertes", "Trabajo de equilibrio y flexibilidad (yoga suave, estiramientos)"];
  } else {
    enfoque = ["Combinación de ejercicio cardiovascular (caminar rápido, correr, bici) y fuerza (peso corporal o pesas)", "Movilidad y estiramiento al finalizar cada sesión"];
  }

  if (actividad === "sedentario") {
    enfoque.unshift("Empezar de forma gradual: caminatas diarias de 20-30 minutos las primeras semanas.");
  }

  const notasRutina = [];
  if (enfermedades.includes("cardiaca")) notasRutina.push("Antecedentes cardíacos: antes de empezar cualquier rutina de intensidad moderada o alta, es importante el visto bueno de un cardiólogo.");
  if (enfermedades.includes("hipertension")) notasRutina.push("Hipertensión: evitá esfuerzos máximos repentinos; preferí subir la intensidad de forma progresiva.");
  if (enfermedades.includes("diabetes")) notasRutina.push("Diabetes: prestá atención a señales de baja de energía durante el ejercicio y mantené a mano algo para hidratarte.");

  const ejemploSemana = construirEjemploSemana(dias, enfoque);

  return {
    diasPorSemana: dias,
    minutosPorSesion,
    enfoque,
    ejemploSemana,
    notas: notasRutina,
  };
}

// Arma una distribución simple de la semana (cuáles días entrenar y de qué tipo)
function construirEjemploSemana(dias, enfoque) {
  const nombresDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const tipos = ["Cardio + fuerza tren superior", "Descanso activo (caminata/estiramientos)", "Fuerza tren inferior", "Cardio", "Fuerza full body", "Actividad libre / deporte", "Descanso"];

  const plan = [];
  let entrenamientosAsignados = 0;
  for (let i = 0; i < 7 && entrenamientosAsignados < dias; i++) {
    // Alternamos día sí, día no cuando es posible, para dejar descanso entre medio
    if (i % 2 === 0 || dias >= 5) {
      plan.push({ dia: nombresDias[i], actividad: tipos[i % tipos.length] });
      entrenamientosAsignados++;
    } else {
      plan.push({ dia: nombresDias[i], actividad: "Descanso" });
    }
  }
  // Completar los días restantes de la semana como descanso
  for (let i = plan.length; i < 7; i++) {
    plan.push({ dia: nombresDias[i], actividad: "Descanso" });
  }
  return plan;
}

/* ---------- 8. RECOMENDACIÓN DE SUEÑO ---------- */
function generarRecomendacionSueno(franjaEtaria, horasSueno) {
  const [minimo, maximo] = SUENO_RECOMENDADO[franjaEtaria];
  let estado;
  let consejo;

  if (horasSueno < minimo) {
    estado = "Por debajo de lo recomendado";
    consejo = `Para tu franja etaria se recomiendan entre ${minimo} y ${maximo} horas por noche. Intentá adelantar la hora de dormir de a poco (15-20 minutos por semana) y mantener horarios fijos, incluso los fines de semana.`;
  } else if (horasSueno > maximo) {
    estado = "Por encima de lo habitual";
    consejo = `Dormís más de lo que sugiere la guía general (${minimo} a ${maximo} horas). Si igualmente te levantás cansado/a, puede ser señal de mala calidad de sueño; probá reducir pantallas antes de dormir.`;
  } else {
    estado = "Dentro del rango recomendado";
    consejo = `Estás durmiendo dentro del rango sugerido para tu franja etaria (${minimo} a ${maximo} horas). ¡Mantené esa rutina!`;
  }

  return { minimo, maximo, estado, consejo };
}

/* ---------- 9. NOTAS GENERALES POR ANTECEDENTES DE SALUD ---------- */
function generarNotasSalud(enfermedades) {
  if (enfermedades.length === 0 || (enfermedades.length === 1 && enfermedades[0] === "ninguna")) {
    return [];
  }
  const notas = [];
  const nombres = {
    diabetes: "Diabetes",
    hipertension: "Hipertensión",
    colesterol: "Colesterol alto",
    cardiaca: "Problemas cardíacos",
    celiaquia: "Celiaquía",
  };
  enfermedades.forEach((clave) => {
    if (clave === "ninguna") return;
    notas.push(`${nombres[clave]}: las sugerencias de dieta y rutina de arriba ya fueron ajustadas teniendo esto en cuenta, pero es importante un seguimiento con un profesional de la salud.`);
  });
  return notas;
}

/* ---------- 10. FUNCIONES QUE PINTAN LOS RESULTADOS EN PANTALLA ---------- */

function mostrarResumen({ imc, categoriaImc, tdee, tmb }) {
  const contenedor = document.getElementById("grilla-resumen");
  contenedor.innerHTML = `
    <div class="dato-resumen">
      <span class="etiqueta">IMC</span>
      <span class="valor">${imc.toFixed(1)}</span>
    </div>
    <div class="dato-resumen">
      <span class="etiqueta">Categoría</span>
      <span class="valor">${categoriaImc}</span>
    </div>
    <div class="dato-resumen">
      <span class="etiqueta">Metabolismo basal</span>
      <span class="valor">${Math.round(tmb)} kcal</span>
    </div>
    <div class="dato-resumen">
      <span class="etiqueta">Gasto calórico diario</span>
      <span class="valor">${tdee} kcal</span>
    </div>
  `;
}

function mostrarDieta(dieta) {
  const contenedor = document.getElementById("bloque-dieta");

  const filasMenu = dieta.menuEjemplo
    .map((m) => `<tr><td><strong>${m.comida}</strong></td><td>${m.sugerencia}</td></tr>`)
    .join("");

  const notasHtml = dieta.notas.length
    ? `<p class="bloque-titulo">Notas para tu caso</p><ul class="lista-simple">${dieta.notas.map((n) => `<li>${n}</li>`).join("")}</ul>`
    : "";

  contenedor.innerHTML = `
    <p><span class="etiqueta-pill">${dieta.calorias} kcal/día aprox.</span>
       <span class="etiqueta-pill">Proteínas: ${dieta.proteina} g</span>
       <span class="etiqueta-pill">Carbohidratos: ${dieta.carbohidratos} g</span>
       <span class="etiqueta-pill">Grasas: ${dieta.grasas} g</span></p>
    <p class="bloque-titulo">Menú de ejemplo para un día</p>
    <table class="tabla-comidas">
      <thead><tr><th>Comida</th><th>Sugerencia</th></tr></thead>
      <tbody>${filasMenu}</tbody>
    </table>
    ${notasHtml}
  `;
}

function mostrarRutina(rutina) {
  const contenedor = document.getElementById("bloque-rutina");

  const filasSemana = rutina.ejemploSemana
    .map((d) => `<tr><td><strong>${d.dia}</strong></td><td>${d.actividad}</td></tr>`)
    .join("");

  const enfoqueHtml = `<ul class="lista-simple">${rutina.enfoque.map((e) => `<li>${e}</li>`).join("")}</ul>`;

  const notasHtml = rutina.notas.length
    ? `<p class="bloque-titulo">Notas para tu caso</p><ul class="lista-simple">${rutina.notas.map((n) => `<li>${n}</li>`).join("")}</ul>`
    : "";

  contenedor.innerHTML = `
    <p><span class="etiqueta-pill">${rutina.diasPorSemana} días por semana</span>
       <span class="etiqueta-pill">~${rutina.minutosPorSesion} min por sesión</span></p>
    <p class="bloque-titulo">Enfoque sugerido</p>
    ${enfoqueHtml}
    <p class="bloque-titulo">Ejemplo de semana</p>
    <table class="tabla-comidas">
      <thead><tr><th>Día</th><th>Actividad</th></tr></thead>
      <tbody>${filasSemana}</tbody>
    </table>
    ${notasHtml}
  `;
}

function mostrarSueno(sueno) {
  const contenedor = document.getElementById("bloque-sueno");
  contenedor.innerHTML = `
    <p><span class="etiqueta-pill">${sueno.estado}</span></p>
    <p>${sueno.consejo}</p>
  `;
}

function mostrarNotasSalud(notas) {
  const tarjeta = document.getElementById("tarjeta-salud");
  const contenedor = document.getElementById("bloque-salud");
  if (notas.length === 0) {
    tarjeta.hidden = true;
    contenedor.innerHTML = "";
    return;
  }
  tarjeta.hidden = false;
  contenedor.innerHTML = `<ul class="lista-simple">${notas.map((n) => `<li>${n}</li>`).join("")}</ul>`;
}
