import {
  extraerModo,
  extraerFichas,
  comprobarGanador,
  contadorTurno,
  contadorJuego,
  idIntervalo,
  idIntervalo2,
} from "./funcionesUtiles.js";
import { jugadaPCAleatoria } from "./1vsAleatorio.js";
import { mejorMovimiento, mejorMovimiento6Fichas } from "./1vsIA.js";

const tiempoTurno = document.getElementById("tiempo-jugador");
const tiempoJuego = document.getElementById("tiempo");
const empezarJuego = document.getElementById("empezar-juego");
const casillas = Array.from(document.querySelectorAll(".casilla"));
const turno = document.getElementById("turno");
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
  contadorJuego(180, tiempoJuego, jugador);
  contadorTurno(30, tiempoTurno, jugador);
  turno.textContent = jugador;

  // Modo 1: Aleatorio y 9 fichas
  if (modo === "1" && fichas === "9") {
    // Busca dentro de casillas la casilla que pulsa el
    casillas.find((casilla) =>
      casilla.addEventListener("click", () => {
        if (
          casilla.textContent === "" &&
          ganador === null &&
          jugador === "❌"
        ) {
          // Si no hay ganador, se ejecuta la jugada del jugador
          jugadaJugador(casilla, tablero, jugador);
          jugador = "⭕";
          turno.textContent = jugador;
          contadorTurno(30, tiempoTurno, jugador);
          // Comprobar si hay ganador después de la jugada del jugador
          setTimeout(() => {
            ganador = comprobarGanador(tablero, opcionesGanadoras);
            // Si hay ganador, se muestra el mensaje
            if (ganador) {
              alert("Ganador: " + ganador);
              clearInterval(idIntervalo);
              clearInterval(idIntervalo2);
            } else {
              // Si no hay ganador, se ejecuta la jugada de la PC
              jugadaPCAleatoria(casillas, tablero, jugador, tiempoTurno);
              jugador = "❌";
              turno.textContent = jugador;
              contadorTurno(30, tiempoTurno, jugador);
              setTimeout(() => {
                // Comprobar si hay ganador después de la jugada de la PC
                ganador = comprobarGanador(tablero, opcionesGanadoras);
                if (ganador) {
                  alert("Ganador: " + ganador);
                  clearInterval(idIntervalo);
                  clearInterval(idIntervalo2);
                  removeEventListener("click", () => {});
                }
              }, 100);
            }
          }, 100);
        }
      })
    );
    // Modo 2: Aleatorio y 6 fichas
  } else if (modo === "1" && fichas === "6") {
    casillas.find((casilla) =>
      casilla.addEventListener("click", () => {
        //Guardamos en una variable el número de casillas que contienen una X o una O
        let numeroX = casillas.filter(
          (casilla) => casilla.textContent === "❌"
        );
        let numeroO = casillas.filter(
          (casilla) => casilla.textContent === "⭕"
        );
        setTimeout(() => {
          if (
            casilla.textContent === "" &&
            ganador === null &&
            jugador === "❌" &&
            numeroX.length < 3
          ) {
            // Si no hay ganador, se ejecuta la jugada del jugador
            jugadaJugador(casilla, tablero, jugador);
            jugador = "⭕";
            turno.textContent = jugador;
            contadorTurno(30, tiempoTurno, jugador);
            setTimeout(() => {
              // Comprobar si hay ganador después de la jugada del jugador
              ganador = comprobarGanador(tablero, opcionesGanadoras);
              // Si hay ganador, se muestra el mensaje
              if (ganador) {
                alert("Ganador: " + ganador);
                clearInterval(idIntervalo);
                clearInterval(idIntervalo2);
              } else {
                // Si no hay ganador, comprobramos si hay menos de 3 O
                if (numeroO.length < 3) {
                  // Si no hay ganador, se ejecuta la jugada de la PC
                  jugadaPCAleatoria(casillas, tablero, jugador, tiempoTurno);
                } else {
                  // Si hay 3 O, se elimina una O aleatoria
                  let celdaAleatoria = Math.floor(
                    Math.random() * numeroO.length
                  );
                  numeroO[celdaAleatoria].textContent = "";
                  if (
                    tablero[
                      numeroO[celdaAleatoria].getAttribute("data-celda")
                    ] === "⭕"
                  ) {
                    tablero[
                      numeroO[celdaAleatoria].getAttribute("data-celda")
                    ] = "";
                  }
                  jugadaPCAleatoria(casillas, tablero, jugador, tiempoTurno);
                }
                jugador = "❌";
                turno.textContent = jugador;
                contadorTurno(30, tiempoTurno, jugador);
                setTimeout(() => {
                  // Comprobar si hay ganador después de la jugada de la PC
                  ganador = comprobarGanador(tablero, opcionesGanadoras);
                  if (ganador) {
                    alert("Ganador: " + ganador);
                    clearInterval(idIntervalo);
                    clearInterval(idIntervalo2);
                    removeEventListener("click", () => {});
                  }
                }, 100);
              }
            }, 100);
            // Si hay 3 X, se elimina una X aleatoria
          } else if (numeroX.length >= 2) {
            numeroX.find((casilla) =>
              casilla.addEventListener("click", () => {
                let celda = casilla.getAttribute("data-celda");
                casilla.textContent = "";
                if (tablero[celda] === "❌") {
                  tablero[celda] = "";
                }
              })
            );
          }
        }, 100);
      })
    );
    //Modo 3: IA y 9 fichas
  } else if (modo === "2" && fichas === "9") {
    casillas.find((casilla) =>
      casilla.addEventListener("click", () => {
        if (casilla.textContent == "" && ganador == null && jugador == "❌") {
          // Si no hay ganador, se ejecuta la jugada del jugador
          jugadaJugador(casilla, tablero, jugador);
          jugador = "⭕";
          turno.textContent = jugador;
          contadorTurno(30, tiempoTurno, jugador);
          // Comprobar si hay ganador después de la jugada del jugador
          setTimeout(() => {
            ganador = comprobarGanador(tablero, opcionesGanadoras);
            // Si hay ganador, se muestra el mensaje
            if (ganador) {
              alert("Ganador: " + ganador);
              clearInterval(idIntervalo);
              clearInterval(idIntervalo2);
            } else {
              // Si no hay ganador, se ejecuta la jugada de la PC
              contadorTurno(30, tiempoTurno, jugador);
              let movimiento = mejorMovimiento(
                tablero,
                jugador,
                opcionesGanadoras
              );
              tablero[movimiento] = jugador;
              casillas[movimiento].textContent = jugador;
              jugador = "❌";
              turno.textContent = jugador;
              setTimeout(() => {
                // Comprobar si hay ganador después de la jugada de la PC
                ganador = comprobarGanador(tablero, opcionesGanadoras);
                if (ganador) {
                  alert("Ganador: " + ganador);
                  clearInterval(idIntervalo);
                  clearInterval(idIntervalo2);
                  removeEventListener("click", () => {});
                }
              }, 100);
            }
          }, 100);
        }
      })
    );
  } else if (modo === "2" && fichas === "6") {
    casillas.find((casilla) =>
      casilla.addEventListener("click", () => {
        //Guardamos en una variable el número de casillas que contienen una X o una O
        let numeroX = casillas.filter(
          (casilla) => casilla.textContent === "❌"
        );
        let numeroO = casillas.filter(
          (casilla) => casilla.textContent === "⭕"
        );
        setTimeout(() => {
          if (
            casilla.textContent === "" &&
            ganador === null &&
            jugador === "❌" &&
            numeroX.length <= 2
          ) {
            // Si no hay ganador, se ejecuta la jugada del jugador
            jugadaJugador(casilla, tablero, jugador);
            jugador = "⭕";
            turno.textContent = jugador;
            contadorTurno(30, tiempoTurno, jugador);
            setTimeout(() => {
              numeroX = casillas.filter(
                (casilla) => casilla.textContent === "❌"
              );
              numeroO = casillas.filter(
                (casilla) => casilla.textContent === "⭕"
              );
              // Comprobar si hay ganador después de la jugada del jugador
              ganador = comprobarGanador(tablero, opcionesGanadoras);
              // Si hay ganador, se muestra el mensaje
              if (ganador) {
                alert("Ganador: " + ganador);
                clearInterval(idIntervalo);
                clearInterval(idIntervalo2);
              } else {
                contadorTurno(30, tiempoTurno, jugador);
                // Si no hay ganador, comprobramos si hay menos de 3 O
                if (numeroO.length >= 3) {
                  // Si no hay ganador, se ejecuta la jugada de la PC
                  let movimiento1 = mejorMovimiento6Fichas(
                    tablero,
                    jugador,
                    opcionesGanadoras
                  );
                  tablero[movimiento1] = "";
                  casillas[movimiento1].textContent = "";
                }
                  let movimiento2 = mejorMovimiento(
                    tablero,
                    jugador,
                    opcionesGanadoras
                  );

                  tablero[movimiento2] = jugador;
                  casillas[movimiento2].textContent = jugador;
                  jugador = "❌";
                  turno.textContent = jugador;
                  setTimeout(() => {
                    numeroX = casillas.filter(
                      (casilla) => casilla.textContent === "❌"
                    );
                    numeroO = casillas.filter(
                      (casilla) => casilla.textContent === "⭕"
                    );
                    // Comprobar si hay ganador después de la jugada de la PC
                    ganador = comprobarGanador(tablero, opcionesGanadoras);
                    if (ganador) {
                      alert("Ganador: " + ganador);
                      clearInterval(idIntervalo);
                      clearInterval(idIntervalo2);
                      removeEventListener("click", () => {});
                    }
                  }, 100);
              }
            }, 100);
            // Si hay 3 X, se elimina una X
          } else if (numeroX.length >= 2) {
            numeroX.find((casilla) =>
              casilla.addEventListener("click", () => {
                let celda = casilla.getAttribute("data-celda");
                casilla.textContent = "";
                if (tablero[celda] === "❌") {
                  tablero[celda] = "";
                  numeroX = casillas.filter(
                    (casilla) => casilla.textContent === "❌"
                  );
                  numeroO = casillas.filter(
                    (casilla) => casilla.textContent === "⭕"
                  );
                }
              })
            );
          }
        }, 100);
      })
    );
  }
});

// Funcion para la jugada del jugador
function jugadaJugador(casilla, tablero, jugador) {
  casilla.textContent = jugador;
  let celda = casilla.getAttribute("data-celda");
  tablero[celda] = jugador;
}
