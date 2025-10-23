document.getElementById("formCita").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const corte = document.getElementById("corte").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  const resultado = document.getElementById("resultado");

  if (nombre && corte && fecha && hora) {
    resultado.innerHTML = `✅ ¡Gracias ${nombre}! Tu cita para <b>${corte}</b> ha sido agendada para el <b>${fecha}</b> a las <b>${hora}</b>.`;
    document.getElementById("formCita").reset();
  } else {
    resultado.innerHTML = "⚠️ Por favor completa todos los campos.";
  }
});
