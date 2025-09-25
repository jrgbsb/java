// ----------------------------
// VARIABLES
// ----------------------------
const lugares = ["cocina", "jardín", "dormitorio", "baño", "sala"];
let intentosMax = 5;
let intentosRestantes = intentosMax;

// Lista de desafíos
const desafios = [
  { objeto: "croqueta", lugar: "" },
  { objeto: "pelota", lugar: "" },
  { objeto: "ratón de juguete", lugar: "" },
  { objeto: "manta favorita", lugar: "" },
  { objeto: "plumero", lugar: "" }
];
let desafioActual = 0;

let victorias = 0;
let derrotas = 0;
let racha = 0;
let record = localStorage.getItem("recordRacha") || 0;

// ----------------------------
// FUNCIONES PRINCIPALES
// ----------------------------
function esconderObjeto() {
  desafios[desafioActual].lugar = lugares[Math.floor(Math.random() * lugares.length)];
}

function mostrarMensaje(msj) {
  document.getElementById("mensaje").textContent = msj;
}

function intentar() {
  const inputLugar = document.getElementById("inputLugar").value.toLowerCase();

  // Validación: si no es un lugar válido, no gasta intento
  if (!lugares.includes(inputLugar)) {
    alert(`⚠️ Lugar inválido. Usa uno de estos: ${lugares.join(", ")}`);
    return;
  }

  if (inputLugar === desafios[desafioActual].lugar) {
    victorias++;
    racha++;
    if (racha > record) {
      record = racha;
      localStorage.setItem("recordRacha", record);
    }

    mostrarMensaje(`🎉 ¡Correcto! Aragón encontró su ${desafios[desafioActual].objeto} en la ${inputLugar}.`);
    avanzarDesafio();
  } else {
    intentosRestantes--;
    if (intentosRestantes > 0) {
      mostrarMensaje(`❌ No está en la ${inputLugar}. Intentos restantes: ${intentosRestantes}`);
    } else {
      derrotas++;
      racha = 0;
      mostrarMensaje(`😿 Aragón no encontró su ${desafios[desafioActual].objeto}. Estaba en la ${desafios[desafioActual].lugar}.`);
      avanzarDesafio();
    }
  }
  actualizarEstadisticas();
}

function avanzarDesafio() {
  desafioActual++;
  intentosRestantes = intentosMax;

  if (desafioActual < desafios.length) {
    esconderObjeto();
    mostrarMensaje(`Nuevo desafío: encuentra la ${desafios[desafioActual].objeto}. Intentos: ${intentosRestantes}`);
  } else {
    mostrarMensaje("🎊 ¡Has completado todos los desafíos de Aragón!");
  }
  actualizarEstadisticas();
}

function reiniciarJuego() {
  desafioActual = 0;
  intentosRestantes = intentosMax;
  esconderObjeto();
  mostrarMensaje(`Juego reiniciado. Encuentra la ${desafios[desafioActual].objeto}.`);
  actualizarEstadisticas();
}

// ----------------------------
// ESTADÍSTICAS Y PROGRESO
// ----------------------------
function actualizarEstadisticas() {
  document.getElementById("estadisticas").textContent = 
    `Victorias: ${victorias} | Derrotas: ${derrotas}`;
  document.getElementById("racha").textContent = 
    `🔥 Racha de Aragón: ${racha} victorias seguidas | 🏆 Récord: ${record}`;
  
  // Progreso textual
  document.getElementById("progreso").textContent =
    `📊 Progreso: ${desafioActual + 1} / ${desafios.length} desafíos`;

  // Barra de progreso gráfica
  const progreso = Math.floor(((desafioActual + 1) / desafios.length) * 100);
  const barra = document.getElementById("barraProgreso");
  barra.style.width = progreso + "%";
  barra.textContent = progreso + "%";
}

// ----------------------------
// INICIALIZAR
// ----------------------------
document.getElementById("btnBuscar").addEventListener("click", intentar);
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);

// Setup inicial
esconderObjeto();
actualizarEstadisticas();
mostrarMensaje(`Intentos restantes: ${intentosRestantes}. Desafío: encuentra la ${desafios[desafioActual].objeto}!`);



