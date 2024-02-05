const modal = document.getElementById('modal-ganador');
const resultado = document.getElementById('resultado');
const simboloGanador = document.getElementById('ganador');
const cerrar = document.getElementById('cerrarModal');
const blur = document.getElementById('blur');

export function mostrarModal(ganador) {
    modal.style.display = 'block';
    blur.style.display = 'block';
    if(ganador === 'Empate'){
        resultado.textContent = 'Empate';
        simboloGanador.style.display = 'none';
        document.getElementById('modal-ganador').style.width = '200px';
        document.getElementById('modal-ganador').style.height = '200px';
    }else{
        resultado.textContent = 'Ganador';
        simboloGanador.textContent = ganador;
    }
}

cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
    blur.style.display = 'none';
});

