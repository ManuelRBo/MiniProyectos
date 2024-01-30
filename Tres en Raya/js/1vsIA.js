const GANADOR_X = -10;
const GANADOR_O = 10;

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
function minimax(tablero, jugador, esMaximizado, opcionesGanadoras) {
    // Evaluar si hay un ganador en el tablero actual
    let ganador = evaluar(tablero, opcionesGanadoras);
    
    // Si hay un ganador, devolver la puntuación correspondiente
    if (ganador === "❌") {
      return GANADOR_X;
    } else if (ganador === "⭕") {
      return GANADOR_O;
    }
  
    // Si el tablero está lleno y no hay ganador, es un empate
    if (movimientosPosibles(tablero).length === 0) {
      return 0;
    }
  
    // Lógica para el jugador maximizador (❌)
    if (esMaximizado) {
      let mejorPuntuacion = -Infinity;
      // Iterar sobre cada posición posible en el tablero
      for (let i = 0; i < tablero.length; i++) {
        // Verificar si la casilla está vacía
        if (tablero[i] === "") {
          // Hacer la jugada en la casilla actual
          tablero[i] = jugador;
          // Llamar recursivamente a minimax con el jugador cambiado y marcando que ahora es el turno del oponente
          let puntuacion = minimax(tablero, cambiarJugador(jugador), false, opcionesGanadoras);
          // Deshacer la jugada para explorar otras posibilidades
          tablero[i] = "";
          // Actualizar la mejor puntuación con la puntuación máxima obtenida
          mejorPuntuacion = Math.max(mejorPuntuacion, puntuacion);
        }
      }
      // Devolver la mejor puntuación encontrada
      return mejorPuntuacion;
    } 
    // Lógica para el jugador minimizador (⭕)
    else {
      let mejorPuntuacion = Infinity;
      for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] === "") {
          tablero[i] = jugador;
          let puntuacion = minimax(tablero, cambiarJugador(jugador), true, opcionesGanadoras);
          tablero[i] = "";
          mejorPuntuacion = Math.min(mejorPuntuacion, puntuacion);
        }
      }
      return mejorPuntuacion;
    }
  }
  
  // Función que encuentra el mejor movimiento para un jugador dado
  export function mejorMovimiento(tablero, jugador, opcionesGanadoras) {
    let mejorPuntuacion = -Infinity;
    let movimiento = null;
  
    // Iterar sobre cada posición posible en el tablero
    for (let i = 0; i < tablero.length; i++) {
      // Verificar si la casilla está vacía
      if (tablero[i] === "") {
        // Hacer la jugada en la casilla actual
        tablero[i] = jugador;
        // Llamar a minimax para evaluar la puntuación de la jugada
        let puntuacion = minimax(tablero, cambiarJugador(jugador), false, opcionesGanadoras);
        // Deshacer la jugada para explorar otras posibilidades
        tablero[i] = "";
        // Actualizar la mejor puntuación y el movimiento si se encuentra una puntuación mejor
        if (puntuacion > mejorPuntuacion) {
          mejorPuntuacion = puntuacion;
          movimiento = i;
        }
      }
    }
  
    // Devolver el mejor movimiento encontrado
    return movimiento;
  }





  export function mejorMovimiento6Fichas(tablero, jugador, opcionesGanadoras) {
    let mejorPuntuacion = -Infinity;
    let mejorMovimiento = null;
  
    // Generar todos los movimientos posibles
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === jugador) {
        for (let j = 0; j < tablero.length; j++) {
          if (tablero[j] === "") {
            // Realizar el movimiento
            tablero[i] = "";
            tablero[j] = jugador;
  
            // Evaluar la puntuación de este movimiento
            let resultado = minimax6Fichas(tablero, cambiarJugador(jugador), false, opcionesGanadoras);
  
            // Deshacer el movimiento
            tablero[j] = "";
            tablero[i] = jugador;
  
            // Actualizar la mejor puntuacion y el movimiento si se encuentra una puntuacion mejor
            if (resultado.puntuacion > mejorPuntuacion) {
              console.log(resultado);
              mejorPuntuacion = resultado.puntuacion;
              mejorMovimiento = { quitar: i, poner: j };
            }
          }
        }
      }
    }
  
    // Devolver el mejor movimiento
    return mejorMovimiento;
  }
  
  
  // Función principal del algoritmo Minimax
  function minimax6Fichas(tablero, jugador, esMaximizado, opcionesGanadoras) {
    // Evaluar si hay un ganador en el tablero actual
    let ganador = evaluar(tablero, opcionesGanadoras);
    
    // Si hay un ganador, devolver la puntuación correspondiente
    if (ganador === "❌") {
      return { puntuacion: GANADOR_X, movimiento: null };
    } else if (ganador === "⭕") {
      return { puntuacion: GANADOR_O, movimiento: null };
    } else if (ganador === null && tablero.every(casilla => casilla !== "")) {
      return { puntuacion: 0, movimiento: null };
    }
  
      // Lógica para el jugador maximizador (❌)
    if (esMaximizado) {
      let mejorPuntuacion = -Infinity;
      let mejorMovimiento = null;
      for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] === "") {
          tablero[i] = jugador;
          let resultado = minimax6Fichas(tablero, cambiarJugador(jugador), false, opcionesGanadoras);
          tablero[i] = "";
          if (resultado.puntuacion > mejorPuntuacion || mejorMovimiento === null) {
            mejorPuntuacion = resultado.puntuacion;
            mejorMovimiento = i;
          }
        }
      }
      return { puntuacion: mejorPuntuacion, movimiento: mejorMovimiento };
    } 
     // Lógica para el jugador minimizador (⭕)
     else {
      let mejorPuntuacion = Infinity;
      let mejorMovimiento = null;
      for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] === "") {
          tablero[i] = jugador;
          let resultado = minimax6Fichas(tablero, cambiarJugador(jugador), true, opcionesGanadoras);
          tablero[i] = "";
          if (resultado.puntuacion < mejorPuntuacion || mejorMovimiento === null) {
            mejorPuntuacion = resultado.puntuacion;
            mejorMovimiento = i;
          }
        }
      }
      return { puntuacion: mejorPuntuacion, movimiento: mejorMovimiento };
    }
  }
