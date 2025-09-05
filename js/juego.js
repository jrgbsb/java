// ----------------------------
// VARIABLES Y ARRAYS
// ----------------------------
const lugares = ["caja", "cama", "ventana", "silla", "alfombra"];
const intentosMaximos = 3;
let croqueta = "";

// ----------------------------
// FUNCIONES
// ----------------------------

// 1. Esconder croqueta en lugar aleatorio
function esconderCroqueta() {
  const indice = Math.floor(Math.random() * lugares.length);
  croqueta = lugares[indice];
  console.log("DEBUG: La croqueta de Aragon está en -> " + croqueta); // Para probar
}

// 2. Preguntar al jugador dónde quiere buscar
function preguntarLugar() {
  let eleccion = prompt(
    "¿Dónde crees que está la croqueta de Aragon? Lugares posibles:\n" + lugares.join(", ")
  );
  if (!eleccion) return ""; // Si el usuario cancela
  return eleccion.toLowerCase();
}

// 3. Revisar si el jugador adivinó
function revisarIntento(eleccion) {
  if (eleccion === croqueta) {
    alert("🎉 ¡Correcto! Aragon encontró la croqueta en la " + croqueta + " 😺");
    return true;
  } else {
    alert("❌ No está en la " + eleccion + ". Aragon sigue buscando...");
    return false;
  }
}

// 4. Ejecutar el juego completo
function jugar() {
  alert("Bienvenido al juego del gatito Aragon 🐱\n¡Ayuda a Aragon a encontrar sus croquetas!");

  esconderCroqueta();

  let encontrado = false;
  for (let i = 1; i <= intentosMaximos; i++) {
    let eleccion = preguntarLugar();
    if (!eleccion) {
      alert("Cancelaste el juego. 🛑");
      return;
    }

    if (revisarIntento(eleccion)) {
      encontrado = true;
      break;
    } else {
      console.log("Intento " + i + ": Croqueta no encontrada en " + eleccion);
    }
  }

  if (!encontrado) {
    alert("😭 Aragon no encontró la croqueta. Estaba en la " + croqueta + ".");
  }
}

// ----------------------------
// BUCLE PRINCIPAL REJUGABLE
// ----------------------------
do {
  jugar();
} while (confirm("¿Querés jugar otra vez? 🐱🍖"));

