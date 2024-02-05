import {
  extraerModo,
  extraerFichas,
  comprobarGanador,
  contadorTurno,
  contadorJuego,
  idIntervalo,
  idIntervalo2,
  terminado,
} from "./funcionesUtiles.js";
import { jugadaPCAleatoria } from "./1vsAleatorio.js";
import { mejorMovimiento, IA } from "./1vsIA.js";
import { mostrarModal } from "./modal.js";

const victoriasX = document.getElementById("victoriasX");
const victoriasO = document.getElementById("victoriasO");
const derrotasX = document.getElementById("derrotasX");
const derrotasO = document.getElementById("derrotasO");
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
let tablero = Array(9).fill("");

empezarJuego.addEventListener("click", () => {
  empezarJuego.classList.add("empezado");
  tablero.fill("");
  casillas.forEach((casilla) => (casilla.textContent = ""));
  let jugador = "❌";
  let ganador = null;
  contadorJuego(180, tiempoJuego, jugador);
  contadorTurno(30, tiempoTurno, jugador);
  turno.textContent = jugador;

  // Modo 1: Aleatorio y 9 fichas
  if (modo === "1" && fichas === "9") {
    // Busca dentro de casillas la casilla que pulsa el
    casillas.forEach((casilla) =>
      casilla.addEventListener("click", () => {
        if (
          casilla.textContent === "" &&
          ganador === null &&
          jugador === "❌" &&
          !terminado
        ) {
          // Si no hay ganador, se ejecuta la jugada del jugador
          jugadaJugador(casilla, tablero, jugador);
          jugador = "⭕";
          turno.textContent = jugador;
          contadorTurno(30, tiempoTurno, jugador);
          // Comprobar si hay ganador después de la jugada del jugador
          ganador = comprobarGanador(tablero, opcionesGanadoras);
          setTimeout(() => {
            // Si hay ganador, se muestra el mensaje
            if (ganador) {
              mostrarModal(ganador);
              clearInterval(idIntervalo);
              clearInterval(idIntervalo2);
              sumarHistorial(ganador);
              removeEventListener("click", () => {});
              empezarJuego.classList.remove("empezado");
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
                  mostrarModal(ganador);
                  clearInterval(idIntervalo);
                  clearInterval(idIntervalo2);
                  sumarHistorial(ganador);
                  removeEventListener("click", () => {});
                  empezarJuego.classList.remove("empezado");
                }
              }, 100);
            }
          }, 100);
        }
      })
    );
    // Modo 2: Aleatorio y 6 fichas
  } else if (modo === "1" && fichas === "6") {
    let celda;
    casillas.forEach((casilla) =>
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
            numeroX.length < 3 &&
            celda !== casilla.getAttribute("data-celda") &&
            !terminado
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
                mostrarModal(ganador);
                clearInterval(idIntervalo);
                clearInterval(idIntervalo2);
                sumarHistorial(ganador);
                removeEventListener("click", () => {});
                empezarJuego.classList.remove("empezado");
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
                  tablero[numeroO[celdaAleatoria].getAttribute("data-celda")] =
                    "";
                  jugadaPCAleatoria(
                    casillas,
                    tablero,
                    jugador,
                    tiempoTurno,
                    celdaAleatoria
                  );
                }
                jugador = "❌";
                turno.textContent = jugador;
                contadorTurno(30, tiempoTurno, jugador);
                setTimeout(() => {
                  // Comprobar si hay ganador después de la jugada de la PC
                  ganador = comprobarGanador(tablero, opcionesGanadoras);
                  if (ganador) {
                    mostrarModal(ganador);
                    clearInterval(idIntervalo);
                    clearInterval(idIntervalo2);
                    sumarHistorial(ganador);
                    removeEventListener("click", () => {}); 
                    empezarJuego.classList.remove("empezado");
                  }
                }, 100);
              }
            }, 100);
            // Si hay 3 X, se elimina una X aleatoria
          } else if (numeroX.length >= 2 && casilla.textContent === "❌") {
            celda = casilla.getAttribute("data-celda");
            casilla.textContent = "";
            tablero[celda] = "";
          }
        }, 100);
      })
    );
    //Modo 3: IA y 9 fichas
  } else if (modo === "2" && fichas === "9") {
    casillas.forEach((casilla) =>
      casilla.addEventListener("click", () => {
        if (casilla.textContent == "" && ganador == null && jugador == "❌" && !terminado) {
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
              mostrarModal(ganador);
              clearInterval(idIntervalo);
              clearInterval(idIntervalo2);
              sumarHistorial(ganador);
              removeEventListener("click", () => {});
              empezarJuego.classList.remove("empezado");
            } else {
              // Si no hay ganador, se ejecuta la jugada de la PC
              contadorTurno(30, tiempoTurno, jugador);
              let movimiento = mejorMovimiento(
                tablero,
                jugador,
                opcionesGanadoras,
                casillas
              );
              tablero[movimiento] = jugador;
              casillas[movimiento].textContent = jugador;
              jugador = "❌";
              turno.textContent = jugador;
              setTimeout(() => {
                // Comprobar si hay ganador después de la jugada de la PC
                ganador = comprobarGanador(tablero, opcionesGanadoras);
                if (ganador) {
                  mostrarModal(ganador);
                  clearInterval(idIntervalo);
                  clearInterval(idIntervalo2);
                  sumarHistorial(ganador);
                  removeEventListener("click", () => {});
                  empezarJuego.classList.remove("empezado");
                }
              }, 100);
            }
          }, 100);
        }
      })
    );
    //Modo 4: IA y 6 fichas
  } else if (modo === "2" && fichas === "6") {
    let celda;
    casillas.forEach((casilla) =>
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
            numeroX.length < 3 &&
            celda !== casilla.getAttribute("data-celda") &&
            !terminado
          ) {
            // Si no hay ganador, se ejecuta la jugada del jugador
            jugadaJugador(casilla, tablero, jugador);
            jugador = "⭕";
            turno.textContent = jugador;
            contadorTurno(30, tiempoTurno, jugador);
            numeroX = casillas.filter(
              (casilla) => casilla.textContent === "❌"
            );
            numeroO = casillas.filter(
              (casilla) => casilla.textContent === "⭕"
            );
            setTimeout(() => {
              // Comprobar si hay ganador después de la jugada del jugador
              ganador = comprobarGanador(tablero, opcionesGanadoras);
              // Si hay ganador, se muestra el mensaje
              if (ganador) {
                mostrarModal(ganador);
                clearInterval(idIntervalo);
                clearInterval(idIntervalo2);
                sumarHistorial(ganador);
                removeEventListener("click", () => {});
                empezarJuego.classList.remove("empezado");
              } else {
                contadorTurno(30, tiempoTurno, jugador);
                // Si no hay ganador, comprobramos si hay menos de 3 O
                if (numeroO.length >= 3) {
                  IA(tablero, jugador, casillas, opcionesGanadoras);
                } else {
                  let movimiento2 = mejorMovimiento(
                    tablero,
                    jugador,
                    opcionesGanadoras,
                    casillas
                  );
                  tablero[movimiento2] = jugador;
                  casillas[movimiento2].textContent = jugador;
                }
                numeroX = casillas.filter(
                  (casilla) => casilla.textContent === "❌"
                );
                numeroO = casillas.filter(
                  (casilla) => casilla.textContent === "⭕"
                );
                jugador = "❌";
                turno.textContent = jugador;
                ganador = comprobarGanador(tablero, opcionesGanadoras);
                setTimeout(() => {
                  // Comprobar si hay ganador después de la jugada de la PC
                  if (ganador) {
                    mostrarModal(ganador);
                    clearInterval(idIntervalo);
                    clearInterval(idIntervalo2);
                    sumarHistorial(ganador);
                    removeEventListener("click", () => {});
                    empezarJuego.classList.remove("empezado");
                  }
                }, 100);
              }
            }, 100);
            // Si hay 3 X, se elimina una X
          } else if (numeroX.length >= 3 && casilla.textContent === "❌" && !terminado) {
            celda = casilla.getAttribute("data-celda");
            casilla.textContent = "";
            tablero[celda] = "";
            numeroX = casillas.filter(
              (casilla) => casilla.textContent === "❌"
            );
            numeroO = casillas.filter(
              (casilla) => casilla.textContent === "⭕"
            );
          }
        }, 100);
      })
    );
  }
  // Modo 5: 1vs1 y 9 fichas
  else if (modo === "3" && fichas === "9") {
    casillas.forEach((casilla) =>
      casilla.addEventListener("click", () => {
        if (ganador == null && jugador == "❌" && casilla.textContent == "" && !terminado) {
          jugadaJugador(casilla, tablero, jugador);
          setTimeout(() => {
            ganador = comprobarGanador(tablero, opcionesGanadoras);
            if (ganador) {
              mostrarModal(ganador);
              clearInterval(idIntervalo);
              clearInterval(idIntervalo2);
              sumarHistorial(ganador);
              removeEventListener("click", () => {});
              empezarJuego.classList.remove("empezado");
            } else {
              jugador = "⭕";
              turno.textContent = jugador;
              contadorTurno(30, tiempoTurno, jugador);
              casillas.forEach((casilla) =>
                casilla.addEventListener("click", () => {
                  if (
                    ganador === null &&
                    jugador === "⭕" &&
                    casilla.textContent === "" &&
                    !terminado
                  ) {
                    jugadaJugador(casilla, tablero, jugador);
                    setTimeout(() => {
                      ganador = comprobarGanador(tablero, opcionesGanadoras);
                      if (ganador) {
                        mostrarModal(ganador);
                        clearInterval(idIntervalo);
                        clearInterval(idIntervalo2);
                        sumarHistorial(ganador);
                        removeEventListener("click", () => {});
                        empezarJuego.classList.remove("empezado");    
                      } else {
                        jugador = "❌";
                        turno.textContent = jugador;
                        contadorTurno(30, tiempoTurno, jugador);
                      }
                    }, 100);
                  }
                })
              );
            }
          }, 100);
        }
      })
    );
  } else if (modo === "3" && fichas === "6") {
    let celdaX;
    let celdaO;
    casillas.forEach((casilla) =>
      casilla.addEventListener("click", () => {
        let numeroO = casillas.filter(
          (casilla) => casilla.textContent === "⭕"
        );
        let numeroX = casillas.filter(
          (casilla) => casilla.textContent === "❌"
        );
        if (
          ganador === null &&
          jugador === "❌" &&
          casilla.textContent === "" &&
          numeroX.length < 3 &&
          celdaX !== casilla.getAttribute("data-celda") &&
          !terminado
        ) {
          jugadaJugador(casilla, tablero, jugador);
          numeroO = casillas.filter((casilla) => casilla.textContent === "⭕");
          numeroX = casillas.filter((casilla) => casilla.textContent === "❌");
          ganador = comprobarGanador(tablero, opcionesGanadoras);
          setTimeout(() => {
            if (ganador) {
              mostrarModal(ganador);
              clearInterval(idIntervalo);
              clearInterval(idIntervalo2);
              sumarHistorial(ganador);
              removeEventListener("click", () => {});
              empezarJuego.classList.remove("empezado");
            } else {
              jugador = "⭕";
              turno.textContent = jugador;
              contadorTurno(30, tiempoTurno, jugador);
            }
          }, 0);
        } else if (
          numeroX.length >= 3 &&
          casilla.textContent === "❌" &&
          jugador === "❌" &&
          !terminado
        ) {
          celdaX = casilla.getAttribute("data-celda");
          casilla.textContent = "";
          tablero[celdaX] = "";
          numeroX = casillas.filter((casilla) => casilla.textContent === "❌");
          numeroO = casillas.filter((casilla) => casilla.textContent === "⭕");
        } else if (
          ganador === null &&
          jugador === "⭕" &&
          casilla.textContent === "" &&
          numeroO.length <= 2 &&
          celdaO !== casilla.getAttribute("data-celda") &&
          !terminado
        ) {
          jugadaJugador(casilla, tablero, jugador);
          numeroO = casillas.filter((casilla) => casilla.textContent === "⭕");
          numeroX = casillas.filter((casilla) => casilla.textContent === "❌");
          ganador = comprobarGanador(tablero, opcionesGanadoras);
          setTimeout(() => {
            if (ganador) {
              mostrarModal(ganador);
              clearInterval(idIntervalo);
              clearInterval(idIntervalo2);
              sumarHistorial(ganador);
              removeEventListener("click", () => {});
              empezarJuego.classList.remove("empezado");
            } else {
              jugador = "❌";
              turno.textContent = jugador;
              contadorTurno(30, tiempoTurno, jugador);
            }
          }, 0);
        } else if (
          numeroO.length >= 3 &&
          casilla.textContent === "⭕" &&
          jugador === "⭕" &&
          !terminado
        ) {
          celdaO = casilla.getAttribute("data-celda");
          casilla.textContent = "";
          tablero[celdaO] = "";
          numeroX = casillas.filter((casilla) => casilla.textContent === "❌");
          numeroO = casillas.filter((casilla) => casilla.textContent === "⭕");
        }
      })
    );
  }
});

document.getElementById("reiniciarHistorial").addEventListener("click", () => {
  reiniciarHistorial();
});

document.getElementById("volverMenu").addEventListener("click", () => {
  window.location.href = "../menu.html";
});

// Funcion para la jugada del jugador
function jugadaJugador(casilla, tablero, jugador) {
  casilla.textContent = jugador;
  let celda = casilla.getAttribute("data-celda");
  tablero[celda] = jugador;
}

function sumarHistorial(ganador) {
  let victorias_X = parseInt(victoriasX.textContent);
  let derrotas_X = parseInt(derrotasX.textContent);
  let victorias_O = parseInt(victoriasO.textContent);
  let derrotas_O = parseInt(derrotasO.textContent);
  if (ganador === "❌") {
    victorias_X++;
    derrotas_O++;
    victoriasX.textContent = victorias_X;
    derrotasO.textContent = derrotas_O;
  } else if (ganador === "⭕") {
    victorias_O++;
    derrotas_X++;
    victoriasO.textContent = victorias_O;
    derrotasX.textContent = derrotas_X;
  }
}

function reiniciarHistorial() {
  victoriasX.textContent = 0;
  victoriasO.textContent = 0;
  derrotasX.textContent = 0;
  derrotasO.textContent = 0;
}
