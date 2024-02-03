


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

const GANADOR_X = -1;
const GANADOR_O = 20;

function evaluarDosFichas(tablero, opcionesGanadoras) {
  for (let i = 0; i < opcionesGanadoras.length; i++) {
    let [a, b, c] = opcionesGanadoras[i];
    if (
      (tablero[a] && tablero[a] === tablero[b] && !tablero[c]) ||
      (tablero[a] && tablero[a] === tablero[c] && !tablero[b]) ||
      (tablero[b] && tablero[b] === tablero[c] && !tablero[a])
    ) {
      return tablero[a] || tablero[b] || tablero[c];
    }
  }
  return null;
}
  
function minimax6Fichas(tablero, jugador, esMaximizado, opcionesGanadoras) {
  let ganador = evaluarDosFichas(tablero, opcionesGanadoras);
  console.log(tablero);
  console.log(ganador);

  if (ganador === "❌") {
    return GANADOR_X;
  } else if (ganador === "⭕") {
    return GANADOR_O;
  }else if (ganador === null) {
    return 0;
  }

  if (movimientosPosibles(tablero).length === 3) {
    return 0;
  }

  let fichasJugador = tablero.reduce((count, casilla) => count + (casilla === jugador), 0);

  if (esMaximizado) {
    let mejorPuntuacion = -Infinity;
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "" || (fichasJugador === 3 && tablero[i] === jugador)) {
        let fichaAnterior = tablero[i];
        tablero[i] = jugador;
        let puntuacion = minimax6Fichas(tablero, cambiarJugador(jugador), false, opcionesGanadoras);
        tablero[i] = fichaAnterior;
        mejorPuntuacion = Math.max(mejorPuntuacion, puntuacion);
      }
    }
    return mejorPuntuacion;
  } else {
    let mejorPuntuacion = Infinity;
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "" || (fichasJugador === 3 && tablero[i] === jugador)) {
        let fichaAnterior = tablero[i];
        tablero[i] = jugador;
        let puntuacion = minimax6Fichas(tablero, cambiarJugador(jugador), true, opcionesGanadoras);
        tablero[i] = fichaAnterior;
        mejorPuntuacion = Math.min(mejorPuntuacion, puntuacion);
      }
    }
    return mejorPuntuacion;
  }
}
  
export function mejorMovimiento6Fichas(tablero, jugador, opcionesGanadoras) {
  let mejorPuntuacion = -Infinity;
  let mejorMovimiento = null;

  let fichasJugador = tablero.reduce((count, casilla) => count + (casilla === jugador), 0);

  // Si la IA ya tiene 3 fichas, necesita mover una de sus fichas existentes
  if (fichasJugador === 3) {
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === jugador) {
        for (let j = 0; j < tablero.length; j++) {
          if (tablero[j] === "" && i !== j) {
            let fichaAnteriorI = tablero[i];
            let fichaAnteriorJ = tablero[j];
            tablero[i] = "";
            tablero[j] = jugador;
            let puntuacion = minimax6Fichas(tablero, cambiarJugador(jugador), true, opcionesGanadoras);
            tablero[i] = fichaAnteriorI;
            tablero[j] = fichaAnteriorJ;

            if (puntuacion > mejorPuntuacion) {
              mejorPuntuacion = puntuacion;
              mejorMovimiento = { quitar: i, poner: j };
            }
          }
        }
      }
    }
  } else { // Si la IA tiene menos de 3 fichas, puede colocar una nueva ficha
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        let fichaAnterior = tablero[i];
        tablero[i] = jugador;
        let puntuacion = minimax6Fichas(tablero, cambiarJugador(jugador), true, opcionesGanadoras);
        tablero[i] = fichaAnterior;

        if (puntuacion > mejorPuntuacion) {
          mejorPuntuacion = puntuacion;
          mejorMovimiento = { poner: i };
        }
      }
    }
  }

  return mejorMovimiento;
}
  