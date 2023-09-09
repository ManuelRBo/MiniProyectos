const email = document.getElementById('email');
const label = document.getElementById('label');
const boton = document.getElementById('boton');
const validadorEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const tarjetaIncio = document.getElementById('tarjeta-delante');
const tarjetaTrasera = document.getElementById('tarjeta-trasera');
const botonGracias = document.getElementById('boton-gracias');

boton.addEventListener('click', function(e){
    e.preventDefault();
    if(!validadorEmail.test(email.value)){
        agregarError();
    }else{
        tarjetaIncio.classList.add('hidden');
        tarjetaIncio.classList.add('tablet:hidden');
        tarjetaIncio.classList.add('desktop:hidden');
        tarjetaTrasera.classList.remove('hidden');
        tarjetaTrasera.classList.remove('tablet:hidden');
        tarjetaTrasera.classList.remove('desktop:hidden');
    }
});

botonGracias.addEventListener('click', function(){
    tarjetaIncio.classList.remove('hidden');
    tarjetaIncio.classList.remove('tablet:hidden');
    tarjetaIncio.classList.remove('desktop:hidden');
    tarjetaTrasera.classList.add('hidden');
    tarjetaTrasera.classList.add('tablet:hidden');
    tarjetaTrasera.classList.add('desktop:hidden');
    email.value='';
})

email.addEventListener('input', function(){
        eliminarError();
});


function agregarError(){
    email.classList.add('error');
    label.classList.add('error-label');
};

function eliminarError(){
    email.classList.remove('error');
    label.classList.remove('error-label');
};
