const flecha = document.getElementsByClassName('flecha');
const respuesta = document.getElementsByClassName('respuesta');
const pregunta = document.getElementsByClassName('pregunta');


for(let i=0; i<flecha.length;i++){
    flecha[i].addEventListener('click', function(){
        for(let j=0;j<respuesta.length;j++){
            if(i==j){
                respuesta[j].classList.toggle('visible');
                pregunta[j].classList.toggle('visible');
            }else{
                respuesta[j].classList.remove('visible');
                pregunta[j].classList.remove('visible');
            }
        }
    });
}
