// Funcion para la jugada de la PC
export function jugadaPCAleatoria(casillas, tablero, jugador) {
  let jugada = eleccionAleatoria(tablero);
  let casillaElegida = casillas.find(
    (casilla) => casilla.getAttribute("data-celda") == jugada && casilla.textContent === "");
  setTimeout(() => {
    if (casillaElegida) {
      tablero[jugada] = jugador;
      casillaElegida.textContent = jugador;
    } else {
      jugadaPCAleatoria(casillas, tablero, jugador);
    }
  }, 1);
}

function eleccionAleatoria(tablero){
    let celda = Math.floor(Math.random() * 9);
    if(tablero[celda] === ""){
        return celda;
    } else {
        return eleccionAleatoria(tablero);
    }
}