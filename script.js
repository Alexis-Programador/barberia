// Función para generar horarios (10:00 AM - 10:00 PM, cada 30 min, excluyendo 2-4 PM)
const horaSelect = document.getElementById("hora");
const mensaje = document.getElementById("mensaje");

function generarHoras() {
  const horas = [];
  for (let h = 10; h <= 22; h++) {
    if (h >= 14 && h < 16) continue; // Salto del descanso 2pm - 4pm
    horas.push(`${h.toString().padStart(2, "0")}:00`);
    horas.push(`${h.toString().padStart(2, "0")}:30`);
  }

  horas.forEach(hora => {
    const option = document.createElement("option");
    option.value = hora;
    const formato = formatoHora12(hora);
    option.textContent = formato;
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

// Función para seleccionar el corte
let corteSeleccionado = null;

function seleccionarCorte(corte, precio) {
  // Si ya se había seleccionado un corte, lo deseleccionamos
  if (corteSeleccionado) {
    corteSeleccionado.classList.remove("seleccionado");
  }

  // Seleccionamos el nuevo corte
  const corteElement = event.currentTarget;
  corteElement.classList.add("seleccionado");
  corteSeleccionado = corteElement;

  // Mostrar la notificación con el corte seleccionado
  document.getElementById("corteSeleccionado").textContent = corte;
  document.getElementById("notificacion").style.display = "block";
}

// Función para cancelar la selección de corte
function cancelarSeleccion() {
  if (corteSeleccionado) {
    corteSeleccionado.classList.remove("seleccionado");
  }
  document.getElementById("corteSeleccionado").textContent = "Ninguno";
  document.getElementById("notificacion").style.display = "none";
}
