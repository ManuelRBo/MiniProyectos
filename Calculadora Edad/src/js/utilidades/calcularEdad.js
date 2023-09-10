const diaMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Objetivo: calcular la edad de una persona
function calcularEdad() {
  const fechaActual = new Date();
  const diaActual = fechaActual.getDate();
  const mesActual = fechaActual.getMonth() + 1;
  const anioActual = fechaActual.getFullYear();

  if (diaActual == dia.value && mesActual == mes.value) {
    resultadoAños.textContent = anioActual - anio.value;
    resultadoMes.textContent = 0;
    resultadoDia.textContent = 0;
  } else if (dia.value > diaActual && mes.value > mesActual){
    resultadoAños.textContent = anioActual - anio.value - 1;
  }
}
