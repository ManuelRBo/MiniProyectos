const play = document.querySelector('.bomba-texto');
const titulo = document.querySelector('.titulo');
const formulario = document.querySelector('.contenedor-niveles');
const niveles = document.getElementsByClassName('niveles');


/**
 * Añade un event listener al botón de "play" que, al hacer click, 
 * hace desaparecer el título y muestra el formulario después de 1 segundo.
 */
export function aparecerFormulario(){
    play.addEventListener('click', () => {
        titulo.classList.add('desaparecer');
        setTimeout((()=>{
            formulario.classList.add('aparecer');
            }), 1000);
    });
}


/**
 * Función que mantiene la elección del nivel seleccionado por el usuario.
 */
export function mantenerEleccion(){
    if(niveles.length>0){
        for(let element of niveles){
            element.addEventListener('click',()=>{
                for(let element of niveles){
                    element.classList.remove('elegido');
                };
                const nivel = element.getAttribute('data-nivel');
                switch(nivel){
                    case 'principiante':
                        element.classList.toggle('elegido');
                        break;
                    case 'intermedio':
                        element.classList.toggle('elegido');
                        break;
                    case 'experto':
                        element.classList.toggle('elegido');
                        break;
                    case 'personalizado':
                        element.classList.toggle('elegido');
                        break;
                }
            })
        }
    }
}

export function desaparecerFormulario(){
        formulario.classList.add('desaparecer');
}

