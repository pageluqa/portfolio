# Generador de Dieta y Rutina

Sistema simple que, a partir de unos datos personales, genera **en tiempo real**
(sin recargar la página) una dieta sugerida, una rutina de ejercicios y
recomendaciones de sueño. Todo el cálculo ocurre **en el navegador**: no hay
servidor, no hay base de datos, no se guarda ni se envía ningún dato a
ningún lado.

Está pensado para conectarse más adelante como un link desde el portfolio
del equipo (ese link se agrega después; por ahora el sistema funciona solo,
abriendo `index.html`).

---

## 1. Tecnologías utilizadas (a propósito, muy pocas)

| Tecnología | Para qué se usa |
|---|---|
| **HTML** | Estructura de la página: el formulario y los lugares donde va a aparecer el resultado |
| **CSS** | Los estilos: colores, tipografías, espaciados |
| **JavaScript** (sin librerías ni frameworks) | Toda la lógica: leer el formulario, calcular, y mostrar el resultado en pantalla |

No se usa React, ni Node, ni ningún framework, ni npm, ni una base de datos.
Es la combinación más básica posible de HTML + CSS + JS, ideal para ir
entendiendo cómo se conectan estas tres partes.

---

## 2. Cómo correrlo

Como es 100% estático (no necesita servidor), alcanza con:

1. Abrir la carpeta `sistema-dieta-rutina/`.
2. Hacer doble click en `index.html`.
3. Se abre en el navegador y ya se puede usar.

Si prefieren verlo con un mini servidor local (no es obligatorio, pero
algunos navegadores se comportan mejor así):

```bash
cd sistema-dieta-rutina
python -m http.server 8000
```
y después abrir `http://localhost:8000` en el navegador.

---

## 3. Estructura de archivos

```
sistema-dieta-rutina/
├── index.html        → el formulario y los contenedores donde se pinta el resultado
├── css/
│   └── estilos.css    → todo el diseño visual
└── js/
    └── script.js        → toda la lógica: cálculos y generación del plan
```

---

## 4. Cómo funciona, paso a paso

### 4.1. El formulario (`index.html`)
Es un `<form>` común con `<input>` y `<select>` para cada dato pedido:
franja etaria, sexo (necesario para el cálculo, ver más abajo), peso,
altura, horas de sueño, horas de estudio/trabajo, nivel de actividad
física, tipo de alimentación, y checkboxes de enfermedades hereditarias.

Al enviarlo, en vez de dejar que el navegador recargue la página (que es lo
que pasa por defecto con un formulario), el JavaScript **intercepta** ese
envío con `event.preventDefault()` y hace todo el cálculo ahí mismo. Por
eso el resultado aparece "en tiempo real", sin ir a ningún servidor.

### 4.2. La lógica (`js/script.js`)
El archivo está dividido en bloques numerados con comentarios, en este
orden:

1. **Datos de referencia**: tablas fijas que usa el sistema (por ejemplo,
   a qué edad "representativa" corresponde cada franja etaria, cuántas
   horas de sueño se recomiendan según la edad, y el "factor de actividad"
   para el cálculo de calorías).
2. **Arranque**: engancha el formulario al evento `submit`.
3. **Función principal** `manejarEnvio()`: es la que se ejecuta al tocar el
   botón. Llama, en orden, a todas las funciones de cálculo y de
   generación, y al final llama a las funciones que pintan el resultado.
4. **Lectura y validación del formulario**: junta todos los valores
   ingresados en un solo objeto de datos, y revisa que estén completos.
5. **Cálculos numéricos**: acá están las fórmulas (explicadas abajo).
6. **Generador de dieta**: arma la sugerencia de menú y las notas según el
   tipo de alimentación y las enfermedades marcadas.
7. **Generador de rutina**: arma los días de entrenamiento sugeridos y un
   ejemplo de semana.
8. **Recomendación de sueño**: compara las horas declaradas contra lo
   recomendado para la franja etaria.
9. **Notas de salud**: arma una lista de avisos generales según lo que se
   haya marcado en "enfermedades hereditarias".
10. **Funciones que pintan el resultado**: tan solo arman texto en HTML
    (con *template strings*, es decir texto entre backticks `` ` `` que
    permite insertar variables con `${...}`) y lo insertan en la página con
    `elemento.innerHTML = ...`.

### 4.3. Las fórmulas que usa (explicadas para quien esté aprendiendo)

**IMC (Índice de Masa Corporal)**
```
IMC = peso (kg) / altura (m)²
```
Es la cuenta clásica para tener una primera idea de si el peso está dentro
de un rango esperado para la altura. Se categoriza en: bajo peso, peso
saludable, sobrepeso u obesidad, según rangos estándar.

**Metabolismo basal (TMB)** — fórmula de *Mifflin-St Jeor*, una de las más
usadas por ser simple y bastante precisa:
```
Hombres:  TMB = 10 × peso(kg) + 6.25 × altura(cm) − 5 × edad + 5
Mujeres:  TMB = 10 × peso(kg) + 6.25 × altura(cm) − 5 × edad − 161
```
Es la cantidad de calorías que el cuerpo gasta en reposo, solo para
mantenerse funcionando. Por eso el formulario pide el sexo biológico: esta
fórmula distingue entre hombres y mujeres porque, en promedio, tienen
composiciones corporales distintas. Si alguien elige "prefiero no decirlo",
se usa un promedio entre ambas fórmulas.

Como el formulario pide una **franja etaria** (no la edad exacta, para
simplificar), el sistema usa un número representativo de esa franja (por
ejemplo, 21 años para "18 a 25"). Es una aproximación, no un dato exacto —
está aclarado en este documento a propósito.

**Gasto calórico diario total (TDEE)**
```
TDEE = TMB × factor de actividad
```
El factor de actividad multiplica el metabolismo basal según cuánto se
mueve la persona en su día a día (desde 1.2 para alguien sedentario, hasta
1.9 para alguien con actividad física muy intensa). Ese resultado es la
cantidad aproximada de calorías diarias que la dieta sugerida usa como
base.

**Macronutrientes**
Se reparten las calorías totales en un porcentaje general y equilibrado:
25% proteínas, 45% carbohidratos, 30% grasas. Cada gramo de proteína o
carbohidrato equivale a 4 calorías, y cada gramo de grasa a 9 calorías —
por eso se dividen así en `generarDieta()`.

### 4.4. Cómo se ajustan las recomendaciones

El sistema no usa inteligencia artificial ni conexión a internet: son
**reglas simples tipo `if`** escritas a mano. Por ejemplo:

```js
if (enfermedades.includes("hipertension")) {
  notasDieta.push("Antecedentes de hipertensión: reducí la sal agregada...");
}
```

Esto es a propósito: como es un proyecto para aprender programación, toda
la "inteligencia" del sistema es lógica condicional común (`if`, arrays,
objetos) — nada mágico ni difícil de seguir leyendo el código.

---

## 5. Importante: qué es y qué NO es este sistema

Este generador da una **guía general**, no un diagnóstico ni un plan
médico o nutricional profesional. Las fórmulas que usa (IMC, Mifflin-St
Jeor) son ampliamente conocidas y públicas, pero no reemplazan una consulta
con un profesional de la salud — sobre todo si hay antecedentes de
enfermedades hereditarias o alguna condición médica. Esto está aclarado
también dentro de la propia página, en el resultado.

---

## 6. Ideas para seguir aprendiendo / extender el sistema

- **Agregar un campo nuevo**: agregar el `<input>` en `index.html`, leerlo
  en `leerFormulario()`, y usarlo en alguna de las funciones `generar...()`.
- **Cambiar las fórmulas o los porcentajes**: están todas juntas y
  comentadas en la sección 5 de `script.js`.
- **Guardar el último resultado en el navegador** (sin backend): se podría
  usar `localStorage`, que guarda datos en el propio navegador de quien usa
  la página (a diferencia de una base de datos, no es compartido ni
  accesible desde otra computadora). No está implementado a propósito, para
  mantener el ejemplo lo más simple posible.
- **Conectarlo con el portfolio**: cuando el portfolio esté listo, alcanza
  con agregar un `<a href="ruta/a/sistema-dieta-rutina/index.html">` (o la
  URL pública, una vez publicado) desde donde quieran del portfolio.

---

## 7. Publicarlo en la web

Al ser estático, se puede subir igual que el portfolio: a GitHub Pages,
Netlify o Vercel, subiendo la carpeta `sistema-dieta-rutina/` completa. No
necesita configuración adicional ni variables de entorno.
