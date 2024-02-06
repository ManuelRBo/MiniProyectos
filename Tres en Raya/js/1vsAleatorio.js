// Funcion para la jugada de la PC
export function jugadaPCAleatoria(casillas, tablero, jugador, celdaAleatoria) {
  let jugada = eleccionAleatoria(tablero, celdaAleatoria);
  console.log("Jugada: " + jugada);
  let casillaElegida = casillas.find(
    (casilla) => casilla.getAttribute("data-celda") == jugada && casilla.textContent === "" && jugada !== celdaAleatoria && casilla.textContent !== "X");
  setTimeout(() => {
    if (casillaElegida) {
      tablero[jugada] = jugador;
      casillaElegida.textContent = jugador;
    } else {
      jugadaPCAleatoria(casillas, tablero, jugador, celdaAleatoria);
    }
  }, 0);
}

function eleccionAleatoria(tablero, celdaAleatoria){
    let celda = Math.floor(Math.random() * 9);
    if(tablero[celda] === "" && celda !== celdaAleatoria){
        return celda;
    } else {
        return eleccionAleatoria(tablero, celdaAleatoria);
    }
}