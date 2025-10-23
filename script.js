function agendarCita() {
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const mensaje = document.getElementById("mensaje");

  if (fecha && hora) {
    mensaje.innerHTML = `✅ Cita agendada para el <b>${fecha}</b> a las <b>${hora}</b>.`;
  } else {
    mensaje.innerHTML = "⚠️ Por favor selecciona fecha y hora.";
  }
}
