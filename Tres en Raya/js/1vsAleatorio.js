// Funcion para la jugada de la PC
export function jugadaPCAleatoria(casillas, tablero, jugador, celdaAleatoria) {
  let jugada = eleccionAleatoria(tablero, celdaAleatoria);
  let casillaElegida = casillas.find(
    (casilla) => casilla.getAttribute("data-celda") == jugada && casilla.textContent === "" && jugada !== celdaAleatoria);
  setTimeout(() => {
    if (casillaElegida) {
      tablero[jugada] = jugador;
      casillaElegida.textContent = jugador;
    } else {
      jugadaPCAleatoria(casillas, tablero, jugador, celdaAleatoria);
    }
  }, 1);
}

function eleccionAleatoria(tablero, celdaAleatoria){
    let celda = Math.floor(Math.random() * 9);
    if(tablero[celda] === "" && celda !== celdaAleatoria){
        return celda;
    } else {
        return eleccionAleatoria(tablero, celdaAleatoria);
    }
}