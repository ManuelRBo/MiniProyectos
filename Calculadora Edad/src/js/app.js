// Objetivo: Validar fecha de nacimiento y mostrar edad en años, meses y días
const boton = document.getElementById('boton');
const dia = document.getElementById('day');
const mes = document.getElementById('month');
const anio = document.getElementById('year');
const arrayEntradas = [dia, mes, anio];
const entradas = document.getElementsByClassName('entrada');
const errorTexto = document.getElementsByClassName('error-texto');
let resultadoDia = document.getElementById('diaResultado');
let resultadoMes = document.getElementById('mesResultado');
let resultadoAños = document.getElementById('anioResultado');

boton.addEventListener('click', function(e){
    e.preventDefault();
    if(agregarErrorVacio() == true){
        quitarErrorVacios();
    }else if(fechaInvalida() == true){
        quitarErrorVacios();
    }else if(fechaIncorrecta() == true){
        quitarErrorVacios();
    }else{
        calcularEdad();
    }
})
