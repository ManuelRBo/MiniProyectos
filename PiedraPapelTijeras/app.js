import { jugador1, jugador2 } from "./src/js/jugadorVSjugador.js";

//Variables globlales
const menuJugadorvsJugador = document.querySelector(".jugador-vs-jugador");
const menuJugadorvsPc = document.querySelector(".jugador-vs-pc");
const menuNivel = document.querySelector(".menuNivel");
const contenedor = document.querySelector(".contenedorCentrado");
const contenedorJuego = document.querySelector(".juego");

//Variables del juego
let turno = 1;
let eleccionJugador1;
let eleccionJugador2;

menuJugadorvsJugador.addEventListener("click", () => {
  contenedor.removeChild(menuNivel);
  contenedorJuego.style.display = "flex";
  contenedorJuego.innerHTML = jugador1;

  document.body.addEventListener("keydown", (e) => {
    if(turno === 1){
    if(e.key === "q" || e.key === "Q" || e.key === "w" || e.key === "W" || e.key === "e" || e.key === "E"){
      eleccionJugador1 = e.key;
      contenedorJuego.innerHTML = "";
      contenedorJuego.innerHTML = jugador2;
      turno = 2;
    }else{
      alert("Tecla no válida");
    }
  }else if(turno === 2){
    if(e.key === "q" || e.key === "Q" || e.key === "w" || e.key === "W" || e.key === "e" || e.key === "E"){
      eleccionJugador2 = e.key;
      contenedorJuego.innerHTML = "";
    }else{
      alert("Tecla no válida");
    }
  }
  });
});


menuJugadorvsPc.addEventListener("click", () => {
  contenedor.removeChild(menuNivel);
  contenedorJuego.style.display = "flex";
});
