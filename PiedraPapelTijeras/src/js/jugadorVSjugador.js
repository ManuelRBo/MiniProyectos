import { objetos } from "./objetos.js";
import { historial } from "./historial.js";

export const jugador1 = `
<div class="jugador1">
    <div class="nombreJugador">
        <p>Jugador 1</p>
    </div>
    <div class="eleccionJugador">
        <div class="piedra" id="piedra1">
            <p>&#128074;Piedra (Q)</p>
        </div>
        <div class="papel" id="papel1">
            <p>&#9995;Papel (W)</p>
        </div>
        <div class="tijeras" id="tijeras1">
            <p>&#9996;Tijera (E)</p>
        </div>
    </div>
</div>`;

export const jugador2 = `
<div class="jugador2">
    <div class="nombreJugador">
        <p>Jugador 2</p>
    </div>
    <div class="eleccionJugador">
        <div class="piedra" id="piedra2">
            <p>&#128074;Piedra (Q)</p>                    
        </div>
        <div class="papel" id="papel2">
            <p>&#9995;Papel (W)</p>
        </div>
        <div class="tijeras" id="tijeras2">
            <p>&#9996;Tijera (E)</p>
        </div>
    </div>
</div>`;

export function resultado(eleccionJugador1, eleccionJugador2){
  return `<div class="resultadoJugador">
            <p>Jugador 1</p>
            <p>${objetos[eleccionJugador1]};</p>
        </div>
        <div class="resultadoJugador">
            <p>Jugador 2</p>
            <p>${objetos[eleccionJugador2]};</p>
        </div>`;
};

export function comprobarGanador(eleccionJugador1, eleccionJugador2) {
  let ganador = "";
  const combinacionGanadora = [
    ["q", "e"],
    ["w", "q"],
    ["e", "w"],
  ];

  if (eleccionJugador1 === eleccionJugador2) {
    ganador = "Empate";
    historial.empate.partidasEmpatadas++;
  } else {
    for (let i = 0; i < combinacionGanadora.length; i++) {
      if (
        eleccionJugador1 === combinacionGanadora[i][0] &&
        eleccionJugador2 === combinacionGanadora[i][1]
      ) {
        ganador = "Jugador 1";
        historial.jugador1.partidasGanadas++;
      } else if (
        eleccionJugador2 === combinacionGanadora[i][0] &&
        eleccionJugador1 === combinacionGanadora[i][1]
      ) {
        ganador = "Jugador 2";
        historial.jugador2.partidasGanadas++;
      }
    }
  }
  return `<div class="ganador">
    <p class="jugadorGanador">${
      ganador === "Empate" ? ganador : `Ha ganado el ${ganador}`
    }</p>
    <div class="botonesGanador">
        <p class="volverJugar">¿Otra Ronda?</p>
        <p class="terminar">Terminar Partida</p>
    </div>
</div>`;
}
