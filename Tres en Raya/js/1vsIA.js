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
    let movimiento = null;
  
    // Si el jugador ya tiene tres fichas en el tablero, debe quitar una antes de jugar
    for (let i = 0; i < tablero.length; i++) {
      if (tablero[i] === jugador) {
        // Quitar la ficha de la casilla actual
        tablero[i] = "";
        // Evaluar la puntuación de este movimiento
        let resultado = minimax6Fichas(tablero, cambiarJugador(jugador), false, opcionesGanadoras);
        // Devolver la ficha a la casilla
        tablero[i] = jugador;
        // Actualizar la mejor puntuación, el movimiento y la ficha a eliminar si se encuentra una puntuación mejor
        if (resultado > mejorPuntuacion) {
          mejorPuntuacion = resultado;
          movimiento = i;
        }
      }
    }
    return movimiento ;
  }


function contarFichas(tablero) {
  let contador = 0;
  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] !== "") {
      contador++;
    }
  }
  return contador;
}
  
  // Función principal del algoritmo Minimax
  function minimax6Fichas(tablero, jugador, esMaximizado, opcionesGanadoras) {
    // Evaluar si hay un ganador en el tablero actual
    let ganador = evaluar(tablero, opcionesGanadoras);
    
    // Si hay un ganador, devolver la puntuación correspondiente
    if (ganador === "❌") {
      return GANADOR_X;
    } else if (ganador === "⭕") {
      return GANADOR_O;
    }else if(ganador === null){
      return 0;
    }
  
    // Si el número de fichas en el tablero es 6 y no hay ganador, es un empate
  if (contarFichas(tablero) === 6) {
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
          tablero[i] = "";
          // Llamar recursivamente a minimax con el jugador cambiado y marcando que ahora es el turno del oponente
          let resultado = minimax6Fichas(tablero, cambiarJugador(jugador), false, opcionesGanadoras);
          // Deshacer la jugada para explorar otras posibilidades
          tablero[i] = jugador;
          // Actualizar la mejor puntuación con la puntuación máxima obtenida
          if (resultado > mejorPuntuacion) {
            mejorPuntuacion = resultado;
          }
        }
      }
      console.log("mejor puntuacion maximizador: "+mejorPuntuacion)
      // Devolver la mejor puntuación encontrada
      return mejorPuntuacion;
    } 
    // Lógica para el jugador minimizador (⭕)
    else {
      let mejorPuntuacion = Infinity;
      for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] === "") {
          tablero[i] = "";
          let resultado = minimax6Fichas(tablero, cambiarJugador(jugador), true, opcionesGanadoras);
          tablero[i] = jugador;
          if (resultado.puntuacion < mejorPuntuacion) {
            mejorPuntuacion = resultado;
          }
        }
      }
      console.log("mejor puntuacion minimizador: "+mejorPuntuacion)
      return mejorPuntuacion;
    }
  }

