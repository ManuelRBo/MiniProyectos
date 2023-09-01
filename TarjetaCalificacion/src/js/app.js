const botonNumero = document.getElementsByClassName('boton-rating');
const botonSubmit =document.getElementById('boton-submit');
const mostrarNumero = document.getElementById('numero-elegido');
const tarjetaRating = document.getElementById('tarjeta-rating');
const tarjetaThank = document.getElementById('tarjeta-thank');
let numeroElegido=0;


for(let i=0;i<botonNumero.length;i++){
    botonNumero[i].addEventListener('click' , function(){
        for(let j=0;j<botonNumero.length;j++){
            if(botonNumero[j].style.backgroundColor=='rgb(251, 116, 19)'){
                botonNumero[j].style.backgroundColor = 'hsl(213, 19%, 22%)';
            }
        }
        botonNumero[i].style.backgroundColor = 'hsl(25, 97%, 53%)';
        numeroElegido = i+1;
    });
};


botonSubmit.addEventListener('click', function(evento){
    evento.preventDefault();
    if(numeroElegido==0){
        alert("No has elegideo nada");
    }else{
        tarjetaRating.style.display='none';
        tarjetaThank.style.display='block';
        mostrarNumero.textContent = numeroElegido;
    }
});

