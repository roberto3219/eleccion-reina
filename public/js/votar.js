document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('votoForm');
  const mensaje = document.getElementById('mensaje-voto');

  // Verificar si ya votó
  if (localStorage.getItem('votoRealizado')) {
    form.style.display = 'none';
    mensaje.textContent = `Ya votaste por: ${localStorage.getItem('candidataSeleccionada')}`;
    mensaje.style.color = 'green';
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const seleccion = document.querySelector('input[name="candidata"]:checked');

    if (!seleccion) {
      mensaje.textContent = 'Por favor seleccioná una candidata.';
      mensaje.style.color = 'red';
      return;
    }

    // Simulación de guardado de voto
    localStorage.setItem('votoRealizado', 'true');
    localStorage.setItem('candidataSeleccionada', seleccion.value);

    mensaje.textContent = `¡Gracias por tu voto a ${seleccion.value}!`;
    mensaje.style.color = 'green';
    form.style.display = 'none';
  });
});
