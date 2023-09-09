const boton = document.getElementById('boton');
const dia = document.getElementById('day');
const mes = document.getElementById('month');
const anio = document.getElementById('year');
const entradas = document.getElementsByClassName('entrada');
const errorTexto = document.getElementsByClassName('error-texto');
const resultadoDia = document.getElementById('diaResultado');
const resultadoMes = document.getElementById('mesResultado');
const resultadoAños = document.getElementById('anioResultado');

boton.addEventListener('click', function(e){
    e.preventDefault();
    agregarErrorVacios();
    quitarErrorVacios();


})

function agregarErrorVacios(){
    if(dia.value==''){
        entradas[0].classList.add('error');
        errorTexto[0].textContent = 'This field is required';
        if(mes.value==''){
            entradas[1].classList.add('error');
            errorTexto[1].textContent = 'This field is required';
            if(anio.value==''){
                entradas[2].classList.add('error');
                errorTexto[2].textContent = 'This field is required';
            }
        }
    }else if(mes.value==''){
        entradas[1].classList.add('error');
        errorTexto[1].textContent = 'This field is required';
        if(anio.value==''){
            entradas[2].classList.add('error');
            errorTexto[2].textContent = 'This field is required';
        }
    }else if(anio.value==''){
        entradas[2].classList.add('error');
        errorTexto[2].textContent = 'This field is required';
    }
}


function quitarErrorVacios(){
    dia.addEventListener('input', function(){
        entradas[0].classList.remove('error');
        errorTexto[0].textContent = '';
    })

    mes.addEventListener('input', function(){
        entradas[1].classList.remove('error');
        errorTexto[1].textContent = '';
    })

    anio.addEventListener('input', function(){
        entradas[2].classList.remove('error');
        errorTexto[2].textContent = '';
    })
}
