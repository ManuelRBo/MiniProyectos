//Importamos las funciones que necesitamos para el juego
import { aparecerFormulario, mantenerEleccion } from "./formulario.js";
import { pulsarCelda } from "./funcionesTablero.js";
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
tabla.addEventListener("mousedown", (event) => {
  pulsarCelda(event, tablero);
});

