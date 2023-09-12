const diaMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Objetivo: calcular la edad de una persona
function calcularEdad() {
  const fechaActual = new Date();
  const diaActual = fechaActual.getDate();
  const mesActual = fechaActual.getMonth() + 1;
  const anioActual = fechaActual.getFullYear();

  resultadoAños.textContent = calcularAños(anioActual, diaActual, mesActual);
  resultadoMes.textContent = calcularMes(mesActual, diaActual);
  resultadoDia.textContent = calcularDias(diaActual, calcularMes(mesActual, diaActual));

}

// Objetivo: calcular los años de una persona
function calcularAños(anioActual, diaActual, mesActual) {
  let años = 0;
  if(dia.value > diaActual || mes.value > mesActual){
    años = anioActual - anio.value - 1;
  }else{
    años = anioActual - anio.value;
  }
  return años;
}

 // Objetivo: calcular los meses de una persona
function calcularMes(mesActual, diaActual){
  let meses = 0;
  let mesNacimiento = mes.value;
  
  if(mes.value == mesActual && dia.value > diaActual){
    meses = 11;
  }else{

  if(mes.value == 12){
    mesNacimiento = 0;
  }

  for(let i = mesNacimiento; i < mesActual; i++){
    meses ++;
    if(i == 12){
      i = 0;
    }
  }

  if(dia.value > diaActual){
    meses --;
  }

}
  return meses;
}

// Objetivo: calcular los días de una persona
function calcularDias(diaActual, calcularMes){
  let dias = 0;
  if(dia.value > diaActual){
    console.log(diaMeses[calcularMes]);
    dias = diaMeses[calcularMes] - dia.value + diaActual;
  }else{
    dias = diaActual - dia.value;
  }
  return dias;
}
