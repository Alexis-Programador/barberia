const horaSelect = document.getElementById("hora");
const notifErrores = document.getElementById("notifErrores");
const notifCortes = document.getElementById("notifCortes");
const listaCitas = document.getElementById("listaCitas");
const btnRegistro = document.getElementById("btnRegistroCitas");
const registroCitas = document.getElementById("registroCitas");
const listaRegistro = document.getElementById("listaRegistro");
 
let corteSeleccionado = null;
let corteNombre = "";
let cortePrecio = 0;
 
// Generar horarios disponibles
function generarHoras() {
  const horas = [];
  for (let h = 10; h <= 22; h++) {
    if (h >= 14 && h < 16) continue; // Descanso 2-4 PM
    horas.push(`${h.toString().padStart(2, "0")}:00`);
    horas.push(`${h.toString().padStart(2, "0")}:30`);
  }
 
  horas.forEach(hora => {
    const option = document.createElement("option");
    option.value = hora;
    option.textContent = formatoHora12(hora);
    horaSelect.appendChild(option);
  });
}
 
function formatoHora12(hora24) {
  const [h, m] = hora24.split(":").map(Number);
  const periodo = h >= 12 ? "PM" : "AM";
  const hora12 = ((h + 11) % 12 + 1);
  return `${hora12}:${m.toString().padStart(2, "0")} ${periodo}`;
}
 
generarHoras();
 
// Seleccionar corte
function seleccionarCorte(element, corte, precio) {
  if (corteSeleccionado) {
    corteSeleccionado.classList.remove("seleccionado");
  }
 
  element.classList.add("seleccionado");
  corteSeleccionado = element;
  corteNombre = corte;
  cortePrecio = precio;
 
  document.getElementById("corteSeleccionado").textContent = corte;
  document.getElementById("notificacionCorte").style.display = "block";
 
  mostrarNotificacion(notifCortes, `💈 ${corte} seleccionado - $${precio}`);
}
 
// Cancelar selección
function cancelarSeleccion() {
  if (corteSeleccionado) {
    corteSeleccionado.classList.remove("seleccionado");
  }
  corteSeleccionado = null;
  corteNombre = "";
  cortePrecio = 0;
  document.getElementById("corteSeleccionado").textContent = "Ninguno";
  document.getElementById("notificacionCorte").style.display = "none";
}
 
// Mostrar mensajes
function mostrarNotificacion(elemento, mensaje, duracion = 3000) {
  elemento.textContent = mensaje;
  elemento.style.display = "block";
  setTimeout(() => elemento.style.display = "none", duracion);
}
 
// Agendar cita
function agendarCita() {
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
 
  if (!corteSeleccionado) {
    mostrarNotificacion(notifErrores, "⚠️ Faltó seleccionar un corte.");
    return;
  }
  if (!fecha) {
    mostrarNotificacion(notifErrores, "⚠️ Faltó seleccionar la fecha.");
    return;
  }
  if (!hora) {
    mostrarNotificacion(notifErrores, "⚠️ Faltó seleccionar la hora.");
    return;
  }
 
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${corteNombre} - $${cortePrecio} | ${fecha} ${hora}</span>
    <button class="btnEliminar" onclick="eliminarCita(this)">Eliminar</button>
  `;
  listaCitas.appendChild(li);
 
  mostrarNotificacion(notifCortes, `✅ Cita agendada para ${corteNombre} a las ${hora}`);
 
  cancelarSeleccion();
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
}
 
// Eliminar cita
function eliminarCita(boton) {
  boton.parentElement.remove();
  mostrarNotificacion(notifErrores, "🗑️ Cita eliminada correctamente.");
}
 
// Abrir registro de citas
btnRegistro.addEventListener("click", () => {
  // Limpiar la lista
  listaRegistro.innerHTML = "";
 
  // Copiar todas las citas existentes
  document.querySelectorAll("#listaCitas li span").forEach(cita => {
    const li = document.createElement("li");
    li.textContent = cita.textContent;
    listaRegistro.appendChild(li);
  });
 
  // Abrir el panel lateral
  registroCitas.classList.add("open");
});
 
// Cerrar registro de citas
function cerrarRegistro() {
  registroCitas.classList.remove("open");
}
 
// Listener para botón de cerrar (agregar un botón con id "btnCerrarRegistro" en HTML)
const btnCerrarRegistro = document.getElementById("btnCerrarRegistro");
if (btnCerrarRegistro) {
  btnCerrarRegistro.addEventListener("click", cerrarRegistro);
}
 
 
 
btnRegistro.addEventListener("click", () => {
    // Limpiar la lista
    listaRegistro.innerHTML = "";
 
    // Copiar todas las citas existentes al registro
    document.querySelectorAll("#listaCitas li span").forEach(cita => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${cita.textContent}</span>
        <button class="btnEliminarRegistro" onclick="eliminarCitaRegistro(this)">Eliminar</button>
      `;
      listaRegistro.appendChild(li);
    });
 
    // Abrir el panel lateral
    registroCitas.classList.add("open");
  });
 
  // Función para eliminar cita dentro del registro
  function eliminarCitaRegistro(boton) {
    boton.parentElement.remove();
    mostrarNotificacion(notifErrores, "🗑️ Cita eliminada del registro.");
  }
