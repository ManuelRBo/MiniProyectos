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

  function evaluar6Fichas(tablero, opcionesGanadoras) {
    for (let i = 0; i < opcionesGanadoras.length; i++) {
      let [a, b, c] = opcionesGanadoras[i];
      if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
        return tablero[a] === "❌" ? 1 : -1; // Devolver 1 si gana ❌, -1 si gana ⭕
      }
    }
    return 0; // Ningún jugador gana en esta posición
  }
  
  function minimax6Fichas(tablero, jugador, esMaximizado, opcionesGanadoras, fichasColocadas) {
    let ganador = evaluar6Fichas(tablero, opcionesGanadoras);
    if (ganador !== 0) {
      return ganador; // Devolver la puntuación directamente
    }
  
    if (fichasColocadas >= 3) {
      return 0; // No se pueden colocar más fichas
    }
  
    let mejorPuntuacion = esMaximizado ? -Infinity : Infinity;
  
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        tablero[i] = jugador;
        let resultado = minimax6Fichas(tablero, cambiarJugador(jugador), !esMaximizado, opcionesGanadoras, fichasColocadas + 1);
        tablero[i] = "";
        mejorPuntuacion = esMaximizado ? Math.max(mejorPuntuacion, resultado) : Math.min(mejorPuntuacion, resultado);
      }
    }
  
    return mejorPuntuacion;
  }
  
  export function mejorMovimiento6Fichas(tablero, jugador, opcionesGanadoras) {
    let mejorPuntuacion = -Infinity;
    let mejorMovimiento = null;
  
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === "") {
        tablero[i] = jugador;
  
        let puntuacion = minimax6Fichas(tablero, cambiarJugador(jugador), false, opcionesGanadoras, 1);
  
        tablero[i] = "";
  
        if (puntuacion > mejorPuntuacion) {
          mejorPuntuacion = puntuacion;
          mejorMovimiento = { quitar: i, poner: i };
        }
      }
    }
  
    return mejorMovimiento;
  }
  