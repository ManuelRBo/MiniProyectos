import { crearTablero, crearMinas, contarMinas, mostrarTablero} from "./funcionesTablero.js";
import { desaparecerFormulario } from "./formulario.js";
import { niveles } from "./niveles.js";

//Variables globales
const form = document.getElementById("formulario");
const tabla = document.getElementById("tabla");
const contenedorNiveles = document.querySelector(".contenedor-niveles");
const error = document.createElement("p");

/**
 * @description Función que comprueba los niveles elegidos por el usuario y ejecuta el juego con los datos de ese nivel
 * @date 2/11/2023
 */
export function iniciarJuego() {
  let filas;
  let columnas;
  let minas;
  let tablero;

  //Guardamos el nivel elegido
  let nivelElegido = document.querySelector(".elegido");

  if (nivelElegido) {
    error.remove();
    nivelElegido = nivelElegido.getAttribute("data-nivel");

    //Si el nivel elegido es principiante, intermedio o experto, se ejecuta el juego con los datos de ese nivel
    if (
      nivelElegido === "principiante" ||
      nivelElegido === "intermedio" ||
      nivelElegido === "experto"
    ) {
      filas = niveles[nivelElegido].filas;
      columnas = niveles[nivelElegido].columnas;
      minas = niveles[nivelElegido].minas;
      tablero = crearTableroMinas(filas, columnas, minas);

      //Si el nivel elegido es personalizado, se ejecuta el juego con los datos introducidos por el usuario
    } else {
      if (form.filas.value && form.columnas.value) {
        filas = form.filas.value;
        columnas = form.columnas.value;
        minas = parseInt(filas * columnas * 0.15);
        tablero = crearTableroMinas(filas, columnas, minas);
      } else {
        contenedorNiveles.appendChild(error);
        error.innerHTML = "Rellena los campos";
        error.classList.add("errorNivel");
      }
    }
  }else{
    contenedorNiveles.appendChild(error);
    error.innerHTML = "Elige un nivel";
    error.classList.add("errorNivel");
  }

  return tablero;
}

/**
 * @description Función que crea el tablero de juego
 * @date 2/11/2023
 */
function crearTableroMinas(filas, columnas, minas){
    //Ejecutamos las funciones para crear el tablero, las minas y contar las minas
    desaparecerFormulario();
    const tablero = crearTablero(filas, columnas);
    crearMinas(tablero, minas, filas, columnas);
    contarMinas(tablero, filas, columnas);
  
    //Mostramos el tablero y añadimos la clase aparecer para que aparezca con una animacion
    setTimeout(() => {
      mostrarTablero(filas, columnas);
      tabla.classList.add("aparecer");
    }, 1000);

    return tablero;
}
