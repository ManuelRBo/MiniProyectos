const url = window.location.href;
const urlSplit = url.split("?")[1].split("&");

export function extraerModo() {
  return urlSplit[0].split("=")[1];
}

export function extraerFichas() {
  return urlSplit[1].split("=")[1];
}

export function eleccionAleatoria(tablero){
    let celda = Math.floor(Math.random() * 9);
    if(tablero[celda] === ""){
        return celda;
    } else {
        return eleccionAleatoria(tablero);
    }
}

export function comprobarGanador(tablero, opcionesGanadoras) {
  let ganador = null;
  opcionesGanadoras.forEach((opcion) => {
    let [a, b, c] = opcion;
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      ganador = tablero[a];
    }
    if(!ganador && !tablero.includes("")){
      ganador = "Empate";
    }
  });
  return ganador;
}