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

// Funcion para la jugada del jugador
export function jugadaJugador(casilla, tablero, jugador) {
  casilla.textContent = jugador;
  let celdaX = casilla.getAttribute("data-celda");
  tablero[celdaX] = jugador;
}

 export function sumarHistorial(ganador) {
  let victorias_X = parseInt(victoriasX.textContent);
  let derrotas_X = parseInt(derrotasX.textContent);
  let victorias_O = parseInt(victoriasO.textContent);
  let derrotas_O = parseInt(derrotasO.textContent);
  if (ganador === "❌") {
    victorias_X++;
    derrotas_O++;
    victoriasX.textContent = victorias_X;
    derrotasO.textContent = derrotas_O;
  } else if (ganador === "⭕") {
    victorias_O++;
    derrotas_X++;
    victoriasO.textContent = victorias_O;
    derrotasX.textContent = derrotas_X;
  }
}

export function reiniciarHistorial() {
  victoriasX.textContent = 0;
  victoriasO.textContent = 0;
  derrotasX.textContent = 0;
  derrotasO.textContent = 0;
}

export function actualizarNumeroX(tablero){
  let numeroX = [];
  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] === "❌") {
      numeroX.push(i);
    }
  }
  return numeroX;
}

export function actualizarNumeroO(tablero){
  let numeroO = [];
  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] === "⭕") {
      numeroO.push(i);
    }
  }
  return numeroO;
}