// Objetivo: validar que los campos no esten vacios
function agregarErrorVacio() {
  let hayErrores = false;
  arrayEntradas.forEach((element, indice) => {
    if (element.value == "") {
      entradas[indice].classList.add('error');
      errorTexto[indice].textContent = "This field is required";
      hayErrores = true;
    }
  });
  return hayErrores;
}


// Objetivo: quitar los errores cuando el usuario ingrese un valor
function quitarErrorVacios(){
  arrayEntradas.forEach((element, indice) => {
    element.addEventListener('input', function(){
      entradas[indice].classList.remove('error');
      errorTexto[indice].textContent = '';
    });
  });
}
