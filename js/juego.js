// 🎮 Juego del Gatito Aragón + 🛒 Carrito con descuento
// ------------------------------------------------------

// Datos simulados (JSON local)
const objetosJSON = `
[
  {"lugar": "cocina", "objeto": "una croqueta especial"},
  {"lugar": "jardín", "objeto": "una pelota brillante"},
  {"lugar": "dormitorio", "objeto": "una manta suave"},
  {"lugar": "baño", "objeto": "una toalla esponjosa"},
  {"lugar": "sala", "objeto": "un cojín mullido"}
]`;

const objetos = JSON.parse(objetosJSON);

let intentosMax = 5;
let intentosRestantes = intentosMax;
let progreso = 0;
let encontrado = false;

// Elementos del DOM
const inputLugar = document.getElementById("inputLugar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReiniciar = document.getElementById("reiniciar");
const mensaje = document.getElementById("mensaje");
const intentos = document.getElementById("intentos");
const barraProgreso = document.getElementById("barraProgreso");
const progresoTexto = document.getElementById("progreso");
const estadisticas = document.getElementById("estadisticas");
const intentosMaxText = document.getElementById("intentosMaxText");

// Inicializar
intentosMaxText.textContent = intentosMax;
actualizarEstado();

btnBuscar.addEventListener("click", buscarLugar);
btnReiniciar.addEventListener("click", reiniciarJuego);
inputLugar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") buscarLugar();
});

// 🔎 Lógica del juego
function buscarLugar() {
  const lugar = inputLugar.value.trim().toLowerCase();
  if (!lugar) {
    Swal.fire("⚠️", "Por favor ingresa un lugar.", "warning");
    return;
  }

  const encontradoObj = objetos.find(obj => obj.lugar === lugar);

  if (encontradoObj) {
    encontrado = true;
    progreso = 100;
    actualizarEstado();

    Swal.fire({
      title: "🎉 ¡Encontraste el tesoro!",
      text: `Aragón encontró ${encontradoObj.objeto} en la ${lugar}.`,
      icon: "success",
      confirmButtonText: "Genial"
    }).then(() => {
      otorgarDescuento();
    });
  } else {
    intentosRestantes--;
    progreso += 20;
    if (intentosRestantes <= 0) {
      Swal.fire({
        title: "😿 ¡Se acabaron los intentos!",
        text: "Aragón no encontró nada. Inténtalo otra vez.",
        icon: "error",
      });
      reiniciarJuego();
    } else {
      Swal.fire("❌", `No hay nada en la ${lugar}. Intenta de nuevo.`, "info");
    }
  }

  actualizarEstado();
  inputLugar.value = "";
}

function actualizarEstado() {
  intentos.textContent = `Intentos restantes: ${intentosRestantes}`;
  barraProgreso.style.width = `${progreso}%`;
  barraProgreso.textContent = `${progreso}%`;
  progresoTexto.textContent = `Progreso: ${progreso}%`;
}

// 🔄 Reiniciar
function reiniciarJuego() {
  intentosRestantes = intentosMax;
  progreso = 0;
  encontrado = false;
  actualizarEstado();
  mensaje.textContent = "";
  const carritoSection = document.getElementById("carrito-section");
  if (carritoSection) carritoSection.remove();
  localStorage.removeItem("descuento");
}

// 🎁 Descuento
function otorgarDescuento() {
  const descuento = 20;
  localStorage.setItem("descuento", descuento);

  const container = document.querySelector("main");
  const section = document.createElement("section");
  section.classList.add("text-center", "mt-4");
  section.innerHTML = `
    <h3 class="text-success">🎁 ¡Ganaste un descuento del ${descuento}%!</h3>
    <p>Usalo en nuestra tienda exclusiva de productos para gatos.</p>
    <button id="btnTienda" class="btn btn-primary mt-2">Usar mi descuento 🛍️</button>
  `;
  container.appendChild(section);

  document.getElementById("btnTienda").addEventListener("click", mostrarCarrito);
}

// 🛒 Carrito de compras
function mostrarCarrito() {
  const container = document.querySelector("main");

  // Si ya existe, no lo dupliques
  if (document.getElementById("carrito-section")) return;

  const section = document.createElement("section");
  section.id = "carrito-section";
  section.classList.add("mt-5");

  const productos = [
  { id: 1, nombre: "Croquetas premium", precio: 1500, img: "img/croquetas.jpg" },
  { id: 2, nombre: "Pelota con plumas", precio: 800, img: "img/pelota.jpg" },
  { id: 3, nombre: "Cama suave", precio: 3200, img: "img/manta.jpg" },
  { id: 4, nombre: "Rascador de cartón", precio: 2100, img: "img/rascador.jpg" },
  { id: 5, nombre: "Golosinas de salmón", precio: 900, img: "img/golosina.jpg" }
];


  let carrito = [];

  section.innerHTML = `
    <h3 class="text-center mb-3">🐾 Tienda de Aragón</h3>
    <div class="row justify-content-center" id="productos-container"></div>
    <div class="text-center mt-4">
      <h4>Total: $<span id="total">0</span></h4>
      <button id="finalizarCompra" class="btn btn-success mt-2">Finalizar compra</button>
    </div>
  `;

  container.appendChild(section);

  const productosContainer = document.getElementById("productos-container");
  const totalTexto = document.getElementById("total");

  productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("col-12", "col-md-4", "mb-3");
   card.innerHTML = `
  <div class="card shadow-sm h-100">
    <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}" style="height:180px; object-fit:cover; border-radius:12px 12px 0 0;">
    <div class="card-body text-center">
      <h5 class="card-title mt-2">${prod.nombre}</h5>
      <p class="card-text">$${prod.precio}</p>
      <button class="btn btn-outline-primary btnAgregar" data-id="${prod.id}">Agregar al carrito</button>
    </div>
  </div>
`;

    productosContainer.appendChild(card);
  });

  document.querySelectorAll(".btnAgregar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find(p => p.id === id);
      carrito.push(producto);
      actualizarTotal();
      Swal.fire("🛒", `${producto.nombre} agregado al carrito.`, "success");
    });
  });

  document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);

  function actualizarTotal() {
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    totalTexto.textContent = total;
  }

  function finalizarCompra() {
    if (carrito.length === 0) {
      Swal.fire("⚠️", "Tu carrito está vacío.", "warning");
      return;
    }
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    const descuento = parseInt(localStorage.getItem("descuento")) || 0;
    const totalConDescuento = total - (total * descuento / 100);

    Swal.fire({
      title: "Compra finalizada 🐱",
      html: `
        <p>Subtotal: $${total}</p>
        <p>Descuento aplicado: ${descuento}%</p>
        <h4>Total a pagar: $${totalConDescuento.toFixed(2)}</h4>
      `,
      icon: "success"
    }).then(() => {
      carrito = [];
      actualizarTotal();
      localStorage.removeItem("descuento");
      section.remove();
      reiniciarJuego();
    });
  }
  
}
