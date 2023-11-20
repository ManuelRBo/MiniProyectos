import {jugar} from "./src/js/jugadorVSjugador.js";

//Variables globlales
const menuJugadorvsJugador = document.querySelector(".jugador-vs-jugador");
const menuJugadorvsPc = document.querySelector(".jugador-vs-pc");
const menuNivel = document.querySelector(".menuNivel");
const contenedor = document.querySelector(".contenedorCentrado");
const contenedorJuego = document.querySelector(".juego");

//Variables del juego

const historial = [];

menuJugadorvsJugador.addEventListener("click", () => {
  contenedor.removeChild(menuNivel);
  jugar(contenedorJuego);
});


menuJugadorvsPc.addEventListener("click", () => {
  contenedor.removeChild(menuNivel);
  contenedorJuego.style.display = "flex";
});
