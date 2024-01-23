import {
  extraerModo,
  extraerFichas,
  comprobarGanador,
  eleccionAleatoria,
} from "./funcionesUtiles.js";
import { juegoAleatorio } from "./modosJuego.js";

const tiempoTurno = document.getElementById("tiempo-jugador");
const tiempoJuego = document.getElementById("tiempo");
const empezarJuego = document.getElementById("empezar-juego");
const casillas = Array.from(document.querySelectorAll(".casilla"));
const turno  = document.getElementById("turno");
turno.textContent = "❌";
const modo = extraerModo();
const fichas = extraerFichas();
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
  let tablero = Array(9).fill("");
  casillas.forEach((casilla) => (casilla.textContent = ""));
  let jugador = "❌";
  let ganador = null;
  contadorTiempo(120, tiempoJuego);
  contadorTiempo(5, tiempoTurno, jugador, ganador);
  turno.textContent = jugador;

  // Modo 1: Aleatorio
  if (modo === "1" && fichas === "9") {
    // Busca dentro de casillas la casilla que pulsa el 
    casillas.find((casilla) =>
      casilla.addEventListener("click", () => {
        if(casilla.textContent === "" && ganador === null && jugador === "❌"){
            // Si no hay ganador, se ejecuta la jugada del jugador
            jugadaJugador(casilla, tablero, jugador);
            jugador = "⭕";
            turno.textContent = jugador;
            // Comprobar si hay ganador después de la jugada del jugador
            ganador = comprobarGanador(tablero, opcionesGanadoras);
            setTimeout(() => {
              // Si hay ganador, se muestra el mensaje
              if (ganador) {
                alert("Ganador: " + ganador);
                clearInterval(idIntervalo);
              } else {
                // Si no hay ganador, se ejecuta la jugada de la PC
                jugadaPCAleatoria(casillas, tablero, jugador);
                setTimeout(() => {
                  // Comprobar si hay ganador después de la jugada de la PC
                  ganador = comprobarGanador(tablero, opcionesGanadoras);
                  jugador = "❌";
                  turno.textContent = jugador;
                  if (ganador) {
                    alert("Ganador: " + ganador);
                    clearInterval(idIntervalo);
                    removeEventListener("click", () => {});
                  }
                }, 1);
              }
            }, 500);
        }
      })
    );
  }
});

// Funcion para la jugada del jugador
function jugadaJugador(casilla, tablero, jugador) {
    casilla.textContent = jugador;
    let celda = casilla.getAttribute("data-celda");
    tablero[celda] = jugador;
    contadorTiempo(5, tiempoTurno, jugador);
}

// Funcion para la jugada de la PC
function jugadaPCAleatoria(casillas, tablero, jugador) {
  let jugada = eleccionAleatoria(tablero);
  let casillaElegida = casillas.find(
    (casilla) => casilla.getAttribute("data-celda") == jugada && casilla.textContent === "");
  setTimeout(() => {
    if (casillaElegida) {
      tablero[jugada] = jugador;
      casillaElegida.textContent = jugador;
      contadorTiempo(5, tiempoTurno, jugador);
    } else {
      jugadaPCAleatoria(casillas, tablero, jugador);
    }
  }, 0);
}

let idIntervalo;
function contadorTiempo(t, div, jugador) {
  clearInterval(idIntervalo);
  let tiempo = t;
  idIntervalo = setInterval(() => {
    tiempo--;
    if (tiempo < 0) {
      if(jugador === "❌"){
        alert("Ganador: ⭕");
        clearInterval(idIntervalo);
      }else{
        alert("Ganador: ❌");
        clearInterval(idIntervalo);
      }
    }else{
      const minutes = Math.floor(tiempo / 60).toString().padStart(2, '0');
      const seconds = (tiempo % 60).toString().padStart(2, '0');
      div.textContent = `${minutes}:${seconds}`;
    }
  }, 1000);
}

