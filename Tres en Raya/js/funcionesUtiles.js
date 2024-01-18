const url = window.location.href;
const urlSplit = url.split("?")[1].split("&");

export function extraerModo() {
  return urlSplit[0].split("=")[1];
}

export function extraerFichas() {
  return urlSplit[1].split("=")[1];
}

export function juegoAleatorio(tablero){
    let fila = Math.floor(Math.random() * 3);
    let columna = Math.floor(Math.random() * 3);
    if(tablero[fila][columna] === ""){
        return [fila, columna];
    } else {
        return juegoAleatorio(tablero);
    }
}
