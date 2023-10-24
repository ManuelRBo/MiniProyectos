const bomba = document.getElementsByClassName('bomba-texto');
const titulo = document.getElementsByClassName('titulo');

export function pulsarPlay() {
    bomba[0].addEventListener('click', () => {
        titulo[0].classList.add('desaparecer');
    });
}