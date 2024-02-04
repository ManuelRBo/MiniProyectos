import {comprobarGanador} from "./funcionesUtiles.js";

const GANADOR_X = -1;
const GANADOR_O = 20;

function evaluar(tablero, opcionesGanadoras) {
  for (let i = 0; i < opcionesGanadoras.length; i++) {
    let [a, b, c] = opcionesGanadoras[i];
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return tablero[a];
    }
  }
  return null;
}

function cambiarJugador(jugador) {
return jugador === "❌" ? "⭕" : "❌";
}

function movimientosPosibles(tablero) {
return tablero.reduce((movimientos, casilla, index) => {
  if (casilla === "") {
    movimientos.push(index);
  }
  return movimientos;
}, []);
}

// Función principal del algoritmo Minimax
function minimax(tablero, jugador, esMaximizado, opcionesGanadoras, alfa, beta) {
  let ganador = evaluar(tablero, opcionesGanadoras);

  if (ganador === "❌") {
    return GANADOR_X;
  } else if (ganador === "⭕") {
    return GANADOR_O;
  }

  if (movimientosPosibles(tablero).length === 0) {
    return 0;
  }

  if (esMaximizado) {
    let mejorPuntuacion = -Infinity;
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        tablero[i] = jugador;
        let puntuacion = minimax(tablero, cambiarJugador(jugador), false, opcionesGanadoras, alfa, beta);
        tablero[i] = "";
        mejorPuntuacion = Math.max(mejorPuntuacion, puntuacion);
        alfa = Math.max(alfa, puntuacion);
        if (beta <= alfa) {
          break;
        }
      }
    }
    return mejorPuntuacion;
  } else {
    let mejorPuntuacion = Infinity;
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        tablero[i] = jugador;
        let puntuacion = minimax(tablero, cambiarJugador(jugador), true, opcionesGanadoras, alfa, beta);
        tablero[i] = "";
        mejorPuntuacion = Math.min(mejorPuntuacion, puntuacion);
        beta = Math.min(beta, puntuacion);
        if (beta <= alfa) {
          break;
        }
      }
    }
    return mejorPuntuacion;
  }
}
  
  // Función que encuentra el mejor movimiento para un jugador dado
  export function mejorMovimiento(tablero, jugador, opcionesGanadoras) {
    let mejorPuntuacion = -Infinity;
    let movimiento = null;
    let alfa = -Infinity;
    let beta = Infinity;
  
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        tablero[i] = jugador;
        let puntuacion = minimax(tablero, cambiarJugador(jugador), false, opcionesGanadoras, alfa, beta);
        tablero[i] = "";
        if (puntuacion > mejorPuntuacion) {
          mejorPuntuacion = puntuacion;
          movimiento = i;
        }
      }
    }
  
    return movimiento;
  }


  export function IA(tablero, jugador, casillas, opcionesGanadoras){
    // Filtra las casillas ocupadas por el jugador O
    let casillas_O = casillas.filter((casilla) => casilla.textContent === "⭕").map((casilla) => casilla.getAttribute("data-celda"));

    // Comprueba si hay un movimiento ganador disponible
    for (let i = 0; i < casillas_O.length; i++) {
      let celdaARemover = casillas_O[i];
      tablero[celdaARemover] = "";
      casillas[celdaARemover].textContent = "";

      // Prueba cada casilla vacía para ver si es un movimiento ganador
      for (let j = 0; j < tablero.length; j++) {
        if (tablero[j] === "") {
          tablero[j] = jugador;
          if (comprobarGanador(tablero, opcionesGanadoras) === jugador) {
            casillas[j].textContent = jugador;
            return; // Si hay un movimiento ganador, la IA lo hace y termina la función
          }
          tablero[j] = "";
        }
      }

      tablero[celdaARemover] = jugador;
      casillas[celdaARemover].textContent = jugador;
    }

    // Si no hay un movimiento ganador disponible, la IA sigue con su estrategia normal
    let mejorMovimiento = null;
    let mejorPuntuacion = -Infinity;

    // Evalúa cada casilla ocupada por el jugador O
    for (let i = 0; i < casillas_O.length; i++) {
      let celdaARemover = casillas_O[i];
      tablero[celdaARemover] = "";

      // Evalúa si hay dos fichas del jugador X en una línea ganadora
      if(evaluarDosFichas(tablero, opcionesGanadoras) === "❌"){
        // Prueba cada casilla vacía para ver si es un movimiento ganador o bloqueador
        for (let j = 0; j < tablero.length; j++) {
          if (tablero[j] === "") {
            tablero[j] = jugador;
            let puntuacion;
            let ganador = evaluarDosFichas(tablero, opcionesGanadoras);

            // Asigna una puntuación en función del resultado del movimiento
            if(ganador === "❌"){
              puntuacion = -1;
            }else if(ganador === "⭕"){
              puntuacion = 1;
            }else{
              puntuacion = 0;
            }
            
            if (puntuacion > mejorPuntuacion) {
              mejorPuntuacion = puntuacion;
              mejorMovimiento = [celdaARemover, j];
            }
            tablero[j] = "";
          }
        }
      }
      tablero[celdaARemover] = jugador;
    }

    // Realiza el mejor movimiento encontrado
    if (mejorMovimiento) {
      tablero[mejorMovimiento[0]] = "";
      casillas[mejorMovimiento[0]].textContent = "";
      tablero[mejorMovimiento[1]] = jugador;
      casillas[mejorMovimiento[1]].textContent = jugador;
    }
}

// Evalúa si hay dos fichas del mismo jugador en una línea ganadora
function evaluarDosFichas(tablero, opcionesGanadoras) {
  for (let i = 0; i < opcionesGanadoras.length; i++) {
    let [a, b, c] = opcionesGanadoras[i];
    if (tablero[a] && tablero[b] && !tablero[c]) {
      if (tablero[a] === tablero[b]) {
        return tablero[a];
      }
    } else if (tablero[a] && !tablero[b] && tablero[c]) {
      if (tablero[a] === tablero[c]) {
        return tablero[a];
      }
    } else if (!tablero[a] && tablero[b] && tablero[c]) {
      if (tablero[b] === tablero[c]) {
        return tablero[b];
      }
    }
  }
  return null;
}