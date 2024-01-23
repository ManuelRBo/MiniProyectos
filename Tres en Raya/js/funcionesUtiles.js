const url = window.location.href;
const urlSplit = url.split("?")[1].split("&");

export function extraerModo() {
  return urlSplit[0].split("=")[1];
}

export function extraerFichas() {
  return urlSplit[1].split("=")[1];
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

let idIntervalo;
export function contadorTiempo(t, div, jugador) {
  clearInterval(idIntervalo);
  let tiempo = t;
  idIntervalo = setInterval(() => {
    tiempo--;
    if (tiempo < 0) {
      if(jugador === "❌"){
        alert("Ganador: ⭕");
        clearInterval(idIntervalo);
      }else{
        alert("Ganador: ❌");
        clearInterval(idIntervalo);
      }
    }else{
      const minutes = Math.floor(tiempo / 60).toString().padStart(2, '0');
      const seconds = (tiempo % 60).toString().padStart(2, '0');
      div.textContent = `${minutes}:${seconds}`;
    }
  }, 1000);
}