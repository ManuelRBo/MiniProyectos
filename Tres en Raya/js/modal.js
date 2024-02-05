const modal = document.getElementById('modal-ganador');
const resultado = document.getElementById('resultado');
const ganador = document.getElementById('ganador');
const cerrar = document.getElementById('cerrarModal');
const blur = document.getElementById('blur');

export function mostrarModal(ganador) {
    modal.style.display = 'block';
    blur.style.display = 'block';
    if(ganador === 'empate'){
        resultado.textContent = 'Empate';
        ganador.style.display = 'none';
    }else{
        resultado.textContent = 'Ganador';
        ganador.textContent = ganador;
    }
}

