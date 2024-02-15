import {
  extraerModo,
  extraerFichas,
  comprobarGanador,
  contadorTurno,
  contadorJuego,
  idIntervalo,
  idIntervalo2,
  terminado,
  jugadaJugador,
  sumarHistorial,
  reiniciarHistorial,
  actualizarNumeroO,
  actualizarNumeroX,
} from "./funcionesUtiles.js";
import { jugadaPCAleatoria } from "./1vsAleatorio.js";
import { mejorMovimiento, IA } from "./1vsIA.js";
import { mostrarModal } from "./modal.js";

const modoJuego = document.getElementById("modoJuego");
const tiempoTurno = document.getElementById("tiempo-jugador");
const tiempoJuego = document.getElementById("tiempo");
const empezarJuego = document.getElementById("empezar-juego");
let casillas = Array.from(document.querySelectorAll(".casilla"));
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

if(modo === "1"){
  if(fichas === "9"){
    modoJuego.textContent = "1 vs Aleatorio | 9 fichas";
  }else if(fichas === "6"){
    modoJuego.textContent = "1 vs Aleatorio | 6 fichas";
  }
}else if(modo === "2"){
  if(fichas === "9"){
    modoJuego.textContent = "1 vs IA | 9 fichas";
  }else if(fichas === "6"){
    modoJuego.textContent = "1 vs IA | 6 fichas";
  }
}else if(modo === "3"){
  if(fichas === "9"){
    modoJuego.textContent = "1 vs 1 | 9 fichas";
  }else if(fichas === "6"){
    modoJuego.textContent = "1 vs 1 | 6 fichas";
  }
}

empezarJuego.addEventListener("click", () => {
  empezarJuego.classList.add("empezado");
  tablero.fill("");
  casillas.forEach((casilla) => (casilla.textContent = ""));
  let jugador = "❌";
  let ganador = null;
  contadorJuego(180, tiempoJuego, jugador);
  contadorTurno(30, tiempoTurno, jugador);
  turno.textContent = jugador;

  // Eliminar todos los eventos de escucha de las casillas
  casillas.forEach((casilla) => {
    let newCasilla = casilla.cloneNode(true);
    casilla.parentNode.replaceChild(newCasilla, casilla);
  });

  casillas = Array.from(document.querySelectorAll(".casilla"));

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
              jugadaPCAleatoria(casillas, tablero, jugador);
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
    let celda = null;
    casillas.forEach((casilla) =>
      casilla.addEventListener("click", () => {
        //Guardamos en una variable el número de casillas que contienen una X o una O
        let numeroX = actualizarNumeroX(tablero);
        let numeroO = actualizarNumeroO(tablero);
          if (
            casilla.textContent === "" &&
            ganador === null &&
            jugador === "❌" &&
            numeroX.length <= 2 &&
            celda !== casilla.getAttribute("data-celda") &&
            !terminado
          ) {
            // Si no hay ganador, se ejecuta la jugada del jugador
            jugadaJugador(casilla, tablero, jugador);
            numeroX = actualizarNumeroX(tablero);
            // Comprobar si hay ganador después de la jugada del jugador
            ganador = comprobarGanador(tablero, opcionesGanadoras);
            jugador = "⭕";
            turno.textContent = jugador;
            contadorTurno(30, tiempoTurno, jugador);
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
                // Si no hay ganador, comprobramos si hay menos de 3 O
                if (numeroO.length <= 2 && jugador === "⭕") {
                  // Si no hay ganador, se ejecuta la jugada de la PC
                  jugadaPCAleatoria(casillas, tablero, jugador);
                  numeroO = actualizarNumeroO(tablero);
                } else if(numeroO.length >= 3 && jugador === "⭕"){
                  // Si hay 3 O, se elimina una O aleatoria
                  let celdaAleatoria = Math.floor(
                    Math.random() * numeroO.length
                  );
                  jugadaPCAleatoria(
                    casillas,
                    tablero,
                    jugador,
                    numeroO[celdaAleatoria]
                  );
                  numeroO = actualizarNumeroO(tablero);
                  casillas[numeroO[celdaAleatoria]].textContent = "";
                  tablero[numeroO[celdaAleatoria]] = "";
                  numeroO = actualizarNumeroO(tablero);
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
          } else if (numeroX.length >= 3 && casilla.textContent === "❌" && jugador === "❌") {
            celda = casilla.getAttribute("data-celda");
            casilla.textContent = "";
            tablero[celda] = "";
            numeroX = actualizarNumeroX(tablero);
          }
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
    let celda = null;
    casillas.forEach((casilla) =>
      casilla.addEventListener("click", () => {
        //Guardamos en una variable el número de casillas que contienen una X o una O
        let numeroX = actualizarNumeroX(tablero);
        let numeroO = actualizarNumeroO(tablero);
          if (
            casilla.textContent === "" &&
            ganador === null &&
            jugador === "❌" &&
            numeroX.length < 3 &&
            celda !== casilla.getAttribute("data-celda") &&
            !terminado
          ) {
            console.log(celda);
            // Si no hay ganador, se ejecuta la jugada del jugador
            jugadaJugador(casilla, tablero, jugador);
            numeroX = actualizarNumeroX(tablero);
            jugador = "⭕";
            turno.textContent = jugador;
            contadorTurno(30, tiempoTurno, jugador);
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
                contadorTurno(30, tiempoTurno, jugador);
                // Si no hay ganador, comprobramos si hay menos de 3 O
                if (numeroO.length >= 3) {
                  IA(tablero, jugador, casillas, opcionesGanadoras);
                  numeroO = actualizarNumeroO(tablero);
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
                numeroO = actualizarNumeroO(tablero);
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
          } else if (numeroX.length >= 3 && casilla.textContent === "❌" && !terminado && jugador === "❌") {
            celda = casilla.getAttribute("data-celda");
            console.log(celda);
            casilla.textContent = "";
            tablero[celda] = "";
            numeroX = actualizarNumeroX(tablero);
          }
      })
    );
  }
  // Modo 5: 1vs1 y 9 fichas
  else if (modo === "3" && fichas === "9") {
    casillas.forEach((casilla) =>
  casilla.addEventListener("click", () => {
    if (ganador === null && casilla.textContent === "" && !terminado) {
      jugadaJugador(casilla, tablero, jugador);
      ganador = comprobarGanador(tablero, opcionesGanadoras);
      console.log(ganador);
      setTimeout(() => {
        if (ganador) {
          mostrarModal(ganador);
          clearInterval(idIntervalo);
          clearInterval(idIntervalo2);
          sumarHistorial(ganador);
          removeEventListener("click", () => {});
          empezarJuego.classList.remove("empezado");
        } else {
          jugador = jugador === "❌" ? "⭕" : "❌";
          turno.textContent = jugador;
          contadorTurno(30, tiempoTurno, jugador);
        }
      }, 100);
    }
  })
);
  } else if (modo === "3" && fichas === "6") {
    let celdaX = null;
    let celdaO = null;
    casillas.forEach((casilla) =>
      casilla.addEventListener("click", () => {
        let numeroO = actualizarNumeroO(tablero);
        let numeroX = actualizarNumeroX(tablero);
        if (
          ganador === null &&
          jugador === "❌" &&
          casilla.textContent === "" &&
          numeroX.length < 3 &&
          celdaX !== casilla.getAttribute("data-celda") &&
          !terminado
        ) {
          jugadaJugador(casilla, tablero, jugador);
          numeroX = actualizarNumeroX(tablero);
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
          numeroX = actualizarNumeroX(tablero);
        } else if (
          ganador === null &&
          jugador === "⭕" &&
          casilla.textContent === "" &&
          numeroO.length <= 2 &&
          celdaO !== casilla.getAttribute("data-celda") &&
          !terminado
        ) {
          jugadaJugador(casilla, tablero, jugador);
          numeroO = actualizarNumeroO(tablero);
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
          numeroO = actualizarNumeroO(tablero);
        }
      })
    );
  }
});

document.getElementById("reiniciarHistorial").addEventListener("click", () => {
  reiniciarHistorial();
});

document.getElementById("volverMenu").addEventListener("click", () => {
  window.location.href = "../index.html";
});


