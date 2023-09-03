const error = document.getElementsByClassName('error');
const formulario = document.getElementById('formulario');
const errorTexto = document.getElementsByClassName("error-texto");
const elementos= formulario.elements;
const validadorEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//Funcion cuando pinchemos el boton submit
formulario.addEventListener("submit", function(e){
    e.preventDefault();//Previene que se envie el formulario
    for(i = 0;i<elementos.length;i++){
        (function(i){
            if(i==2 && elementos[2]!=""){
                validarEmail(i);
            }if(i==0 || i==1 || i==2 || i==3){
                agregarError(i);
            }
                
                setTimeout(function(){
                    eliminarError(i);
                    }, 3000);
        })(i);
}
});

//Agregara la clase del error
function agregarError(i){
    if(elementos[i].value===""){
        error[i].classList.add("activo");
        errorTexto[i].textContent= elementos[i].id+' cannot be empty';
    }
}

//Eliminar la clase del error
function eliminarError(i){
    error[i].classList.remove("activo");
    errorTexto[i].textContent= '';
}

function validarEmail(i){
    if(!validadorEmail.test(elementos[i].value)){
        error[i].classList.add("activo");
        errorTexto[i].textContent= 'Looks like this is not an email';
    }
}
