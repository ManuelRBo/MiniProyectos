import { mostrarModal } from "./modal.js";

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

export let idIntervalo;
export let terminado;
export function contadorTurno(t, div, jugador) {
  terminado = false;
  clearInterval(idIntervalo);
  div.textContent = "00:30";
  let tiempo = t;
  idIntervalo = setInterval(() => {
    tiempo--;
    if (tiempo < 0) {
      terminado = true;
      if(jugador === "❌"){
        clearInterval(idIntervalo);
        mostrarModal("⭕");
      }else{
        clearInterval(idIntervalo);
        mostrarModal("❌");
      }
    }else{
      const minutes = Math.floor(tiempo / 60).toString().padStart(2, '0');
      const seconds = (tiempo % 60).toString().padStart(2, '0');
      div.textContent = `${minutes}:${seconds}`;
    }
  }, 1000);
}

export let idIntervalo2;
export function contadorJuego(t, div, jugador) {
  clearInterval(idIntervalo2);
  let tiempo = t;
  idIntervalo2 = setInterval(() => {
    tiempo--;
    if (tiempo < 0) {
      if(jugador === "❌"){
        mostrarModal("⭕");
        clearInterval(idIntervalo2);
        removeEventListener("click", {});
      }else{
        mostrarModal("❌");
        clearInterval(idIntervalo2);
        removeEventListener("click", {});
      }
    }else{
      const minutes = Math.floor(tiempo / 60).toString().padStart(2, '0');
      const seconds = (tiempo % 60).toString().padStart(2, '0');
      div.textContent = `${minutes}:${seconds}`;
    }
  }, 1000);
}