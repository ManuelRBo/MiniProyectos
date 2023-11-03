//Importamos las funciones que necesitamos para el juego
import { aparecerFormulario, mantenerEleccion } from "./formulario.js";
import { mostrarCeldaContigua, perder } from "./funcionesTablero.js";
import { pulsarPlay } from "./pulsarPlay.js";
import { iniciarJuego } from "./iniciarJuego.js";

//Variables globales
const tabla = document.getElementById("tabla");
const empezarJuego = document.getElementById("empezarJuego");
let tablero;

//Ejecutamos las funciones para seleccionar los niveles y empezar el juego
pulsarPlay();
aparecerFormulario();
mantenerEleccion();




//Evento para empezar el juego al hacer click en el boton de empezar juego
empezarJuego.addEventListener("click", () => {
  tablero = iniciarJuego();
});


//Evento para mostrar las celdas contiguas al hacer click en una celda
tabla.addEventListener("mousedown", (e) => {
  let id = e.target.id.split(" ");
  let celdaPulsada = document.getElementById(`${id[0]} ${id[1]}`);
  document.oncontextmenu = function () {
    return false;
  }; //desactivar el menu contextual

  //Si se hace click derecho, se añade una bandera
  if(e.button === 2){
    celdaPulsada.innerHTML = "🚩";
    celdaPulsada.style.fontSize = "20px";

  //Si se hace click izquierdo o central, se muestra la celda contigua
  }else if(e.button === 0 || e.button === 1){
    mostrarCeldaContigua(tablero, parseInt(id[0]), parseInt(id[1]));
    perder(parseInt(id[0]), parseInt(id[1]), tablero);
  }
});