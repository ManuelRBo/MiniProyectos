// Objetivo: Validar que el usuario no ingrese una fecha invalida
function fechaInvalida() {
  let fechaInvalida = false;
  const fecha = new Date();
  const añoActual = fecha.getFullYear();
  arrayEntradas.forEach((element, indice) => {
    if(indice == 0 && diaInvalido(element, indice) == true){
        fechaInvalida = true;
    }

    if(indice == 1 && mesInvalido(element, indice) == true){
        fechaInvalida = true;
    }

    if(indice == 2 && anioInvalido(element, indice, añoActual) == true){
        fechaInvalida = true;
    }
  });

  return fechaInvalida;
}

// Objetivo: Validar que el usuario introduzca un dia valido
function diaInvalido(element, indice) {
  let diaInvalido = false;
  if (element.value < 1 || element.value > 31) {
    diaInvalido = true;
    entradas[indice].classList.add("error");
    errorTexto[indice].textContent = "Must be a valid day";
  }
  return diaInvalido;
}


// Objetivo: Validar que el usuario introduzca un mes valido
function mesInvalido(element, indice) {
  let mesInvalido = false;
  if (element.value < 1 || element.value > 12) {
    mesInvalido = true;
    entradas[indice].classList.add("error");
    errorTexto[indice].textContent = "Must be a valid month";
  }
  return mesInvalido;
}

// Objetivo: Validar que el usuario introduzca un año valido
function anioInvalido(element, indice, añoActual) {
  let anioInvalido = false;
  if (element.value < 1900) {
    anioInvalido = true;
    entradas[indice].classList.add("error");
    errorTexto[indice].textContent = "Must be greater than 1900";
  }else if(element.value > añoActual){
    anioInvalido = true;
    entradas[indice].classList.add("error");
    errorTexto[indice].textContent = "Must be in the past";
  }
  return anioInvalido;
}