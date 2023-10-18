const play = document.querySelector('.bomba-texto');
const titulo = document.querySelector('.titulo');

play.addEventListener('click', () => {
    titulo.classList.add('desaparecer');
});