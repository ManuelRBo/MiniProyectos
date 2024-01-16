const form = document.querySelector('form');
const modos = form.elements.namedItem('modo');
const fichas = form.elements.namedItem('fichas');


modos.forEach(modo => {
    modo.addEventListener('click', () => {
        modos.forEach(modo => {
            modo.classList.remove('seleccionado');
        });
        modo.classList.add('seleccionado');
    });
});

fichas.forEach(ficha => {
    ficha.addEventListener('click', () => {
        fichas.forEach(ficha => {
            ficha.classList.remove('seleccionado');
        });
        ficha.classList.add('seleccionado');
    });
});