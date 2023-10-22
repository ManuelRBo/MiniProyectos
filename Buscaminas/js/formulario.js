const play = document.querySelector('.bomba-texto');
const titulo = document.querySelector('.titulo');
const formulario = document.querySelector('.contenedor-niveles');
const niveles = document.getElementsByClassName('niveles');

export function aparecerFormulario(){
    play.addEventListener('click', () => {
        titulo.classList.add('desaparecer');
        setTimeout((()=>{
            formulario.classList.add('aparecer');
            }), 1000);
    });
}

export function mantenerEleccion(){
    if(niveles.length>0){
        for(let element of niveles){
            element.addEventListener('click',()=>{
                const nivel = element.getAttribute('data-nivel');
                switch(nivel){
                    case 'principiante':
                        nivel.setAttribute('style', 'transform:scale(1.05);');
                        break;
                }
            })
        }
    }
}

