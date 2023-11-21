import { comprobarGanador } from "./src/js/jugadorVSjugador.js";
import { jugador1, jugador2 } from "./src/js/jugadorVSjugador.js";
import { objetos } from "./src/js/objetos.js";
import { historial } from "./src/js/historial.js";

//Variables globlales
const menuJugadorvsJugador = document.querySelector(".jugador-vs-jugador");
const menuJugadorvsPc = document.querySelector(".jugador-vs-pc");
const menuNivel = document.querySelector(".menuNivel");
const contenedor = document.querySelector(".contenedorCentrado");
const contenedorJuego = document.querySelector(".juego");

//Variables del juego

menuJugadorvsJugador.addEventListener("click", () => {
  //Desaparece el menu
  contenedor.removeChild(menuNivel);
  contenedorJuego.style.display = "flex";
  // jugar();
});

menuJugadorvsPc.addEventListener("click", () => {
  contenedor.removeChild(menuNivel);
  contenedorJuego.style.display = "flex";
});

function jugar() {
  contenedorJuego.innerHTML = jugador1;
  // Empezamos el juego e inicializamos las variables
  let turno = 1;
  let eleccionJugador1 = "";
  let eleccionJugador2 = "";


  function manejarTeclado(e) {
    if (e.key === "q" || e.key === "w" || e.key === "e") {
      if (turno === 1) {
        eleccionJugador1 = e.key;
        historial.jugador1.elecciones.push(eleccionJugador1);
        contenedorJuego.innerHTML = jugador2;
        turno = 2;
      } else if (turno === 2) {
        eleccionJugador2 = e.key;
        historial.jugador2.elecciones.push(eleccionJugador2);
        contenedorJuego.innerHTML = resultado(eleccionJugador1, eleccionJugador2, objetos);
        document.body.removeEventListener("keydown", manejarTeclado);

        setTimeout(() => {
          contenedorJuego.innerHTML += comprobarGanador(eleccionJugador1, eleccionJugador2);
          document.querySelector(".volverJugar").addEventListener("click", () => {
            jugar();
          });

          document.querySelector(".terminar").addEventListener("click", () => {
            let partidasTotales = historial.jugador1.partidasGanadas + historial.jugador2.partidasGanadas + historial.empate.partidasEmpatadas;
            let partidasGanadasJugador1 = historial.jugador1.partidasGanadas;
            let partidasGanadasJugador2 = historial.jugador2.partidasGanadas;
            let partidasEmpatadas = historial.empate.partidasEmpatadas;
            let porcentajeGanadasJugador1 = (partidasGanadasJugador1 * 100) / partidasTotales;
            let porcentajeGanadasJugador2 = (partidasGanadasJugador2 * 100) / partidasTotales;
            let porcentajeEmpatadas = (partidasEmpatadas * 100) / partidasTotales;
            document.querySelector(".contenedorCentrado").style.height = "calc(100vh - 50px)";
            contenedorJuego.innerHTML = "";
            });
        }, 1000);

      } else {
        alert("Tecla no valida");
      }
    }
  }
  document.body.addEventListener("keydown", manejarTeclado);


}


function resultado(eleccionJugador1, eleccionJugador2, objetos) {
  return `<div class="resultadoJugador">
            <p>Jugador 1</p>
            <p>${objetos[eleccionJugador1]};</p>
        </div>
        <div class="resultadoJugador">
            <p>Jugador 2</p>
            <p>${objetos[eleccionJugador2]};</p>
        </div>`;
}
