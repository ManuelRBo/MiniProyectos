import {
  extraerModo,
  extraerFichas,
  comprobarGanador,
  contadorTiempo,
  idIntervalo
} from "./funcionesUtiles.js";
import { jugadaPCAleatoria } from "./1vsAleatorio.js";

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
  contadorTiempo(30, tiempoTurno, jugador);
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
            contadorTiempo(30, tiempoTurno, jugador);
            // Comprobar si hay ganador después de la jugada del jugador
            ganador = comprobarGanador(tablero, opcionesGanadoras);
            setTimeout(() => {
              // Si hay ganador, se muestra el mensaje
              if (ganador) {
                alert("Ganador: " + ganador);
                clearInterval(idIntervalo);
              } else {
                // Si no hay ganador, se ejecuta la jugada de la PC
                jugadaPCAleatoria(casillas, tablero, jugador, tiempoTurno);
                jugador = "❌";
                turno.textContent = jugador;
                contadorTiempo(30, tiempoTurno, jugador);
                setTimeout(() => {
                  // Comprobar si hay ganador después de la jugada de la PC
                  ganador = comprobarGanador(tablero, opcionesGanadoras);
                  if (ganador) {
                    alert("Ganador: " + ganador);
                    clearInterval(idIntervalo);
                    removeEventListener("click", () => {});
                  }
                }, 100);
              }
            }, 500);
        }
      })
    );
  }else if(modo === "1" && fichas === "6"){
    casillas.find((casilla) =>
    casilla.addEventListener("click", () => {
      let numeroX = casillas.filter((casilla) => casilla.textContent === "❌");
      let numeroO = casillas.filter((casilla) => casilla.textContent === "⭕");
      setTimeout(() => {
      if(casilla.textContent === "" && ganador === null && jugador === "❌" && numeroX.length < 3){
        // Si no hay ganador, se ejecuta la jugada del jugador
        jugadaJugador(casilla, tablero, jugador);
        jugador = "⭕";
        turno.textContent = jugador;
        contadorTiempo(30, tiempoTurno, jugador);
        // Comprobar si hay ganador después de la jugada del jugador
        ganador = comprobarGanador(tablero, opcionesGanadoras);
        setTimeout(() => {
          // Si hay ganador, se muestra el mensaje
          if (ganador) {
            alert("Ganador: " + ganador);
            clearInterval(idIntervalo);
          } else {
            if(numeroO.length < 3){
            // Si no hay ganador, se ejecuta la jugada de la PC
            jugadaPCAleatoria(casillas, tablero, jugador, tiempoTurno);
            }else{
              let celdaAleatoria = Math.floor(Math.random() * numeroO.length);
              numeroO[celdaAleatoria].textContent = "";
              if(tablero[numeroO[celdaAleatoria].getAttribute("data-celda")] === "⭕"){
                tablero[numeroO[celdaAleatoria].getAttribute("data-celda")] = "";
              }
              jugadaPCAleatoria(casillas, tablero, jugador, tiempoTurno);
            }
            jugador = "❌";
            turno.textContent = jugador;
            contadorTiempo(30, tiempoTurno, jugador);
            setTimeout(() => {
              // Comprobar si hay ganador después de la jugada de la PC
              ganador = comprobarGanador(tablero, opcionesGanadoras);
              if (ganador) {
                alert("Ganador: " + ganador);
                clearInterval(idIntervalo);
                removeEventListener("click", () => {});
              }
            }, 100);
        }
        }, 500);
      }else if(numeroX.length >= 3){
        numeroX.find((casilla) => casilla.addEventListener("click", () => {
          let celda = casilla.getAttribute("data-celda");
          casilla.textContent = "";
          if(tablero[celda] === "❌"){
            tablero[celda] = "";
          }
        }));
      }
    })
  }, 100)
    );
  }
});

// Funcion para la jugada del jugador
function jugadaJugador(casilla, tablero, jugador) {
    casilla.textContent = jugador;
    let celda = casilla.getAttribute("data-celda");
    tablero[celda] = jugador;
}

