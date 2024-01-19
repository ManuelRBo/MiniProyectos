import { eleccionAleatoria, comprobarGanador } from "./funcionesUtiles.js";

export function juegoAleatorio(casillas, tablero, jugador, opcionesGanadoras) {
  let ganador = null;
  casillas.forEach((casilla) => {
    casilla.addEventListener("click", () => {
      if (casilla.textContent === "") {
        casilla.textContent = jugador;
        let celda = casilla.getAttribute("data-celda");
        tablero[celda] = jugador;
        ganador = comprobarGanador(tablero, opcionesGanadoras); // Comprobar el ganador después de la jugada del jugador
        jugador = "⭕";
        let jugadaPC = eleccionAleatoria(tablero);
        tablero[jugadaPC] = jugador;
        casillas.forEach((casilla) => {
          if (casilla.getAttribute("data-celda") == jugadaPC) {
            setTimeout(() => {
              casilla.textContent = jugador;
              jugador = "❌";
            }, 500);
          }
        });
      }
    });
  });
}
