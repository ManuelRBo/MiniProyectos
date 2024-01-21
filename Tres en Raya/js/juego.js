import { extraerModo, extraerFichas, comprobarGanador, eleccionAleatoria } from "./funcionesUtiles.js";
import { juegoAleatorio } from "./modosJuego.js";

const tiempoTurno = document.getElementById("tiempo-jugador");
const empezarJuego = document.getElementById("empezar-juego");
const casillas = document.querySelectorAll(".casilla");
const modo = extraerModo();
const fichas = extraerFichas();
let tablero = Array(9).fill(null);
let opcionesGanadoras = [
  [0, 1, 2], // 1
  [3, 4, 5], // 2
  [6, 7, 8], // 3
  [0, 3, 6], // 4
  [1, 4, 7], // 5
  [2, 5, 8], // 6
  [0, 4, 8], // 7
  [2, 4, 6], // 8
];

empezarJuego.addEventListener("click", () => {
  let jugador = "❌";
  let ganador = null;
  if (modo === "1" && fichas === "9") {
    casillas.forEach((casilla) => {
      casilla.addEventListener("click", () => {
          jugadaJugador(casilla, tablero, jugador);
          setTimeout(() => {
              ganador = comprobarGanador(tablero, opcionesGanadoras);
              if (ganador) {
                  alert("Ganador: " + ganador);
              } else {
                  jugador = "⭕";
                  let jugada = eleccionAleatoria(tablero);
                  tablero[jugada] = jugador;
                  casillas.forEach((casilla) => {
                      if (casilla.getAttribute("data-celda") == jugada) {
                          casilla.textContent = jugador;
                          jugador = "❌";
                      }
                  });
              }
          }, 500);
      });
    });
  }
});

function jugadaJugador(casilla, tablero, jugador){
  if(casilla.textContent === ""){
    casilla.textContent = jugador;
    let celda = casilla.getAttribute("data-celda");
    tablero[celda] = jugador;
    jugador = "⭕";
  }
}