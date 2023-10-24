import {niveles} from "./niveles.js";
import { aparecerFormulario, mantenerEleccion, desaparecerFormulario } from "./formulario.js";
import { crearTablero, crearMinas, contarMinas, mostrarTablero } from "./funcionesTablero.js";
import { pulsarPlay } from "./pulsarPlay.js";

const form = document.getElementById("formulario");
const tabla = document.getElementById("tabla");
const empezarJuego = document.getElementById("empezarJuego");
const contenedorNiveles = document.querySelector(".contenedor-niveles");
const error = document.createElement("p");

pulsarPlay();
aparecerFormulario();
mantenerEleccion();

let filas;
let columnas;
let minas;


empezarJuego.addEventListener("click", () => {
  let nivelElegido = document.querySelector(".elegido");
  if(nivelElegido){
    error.remove();
    nivelElegido = nivelElegido.getAttribute("data-nivel");
    if(nivelElegido === "principiante" || nivelElegido === "intermedio" || nivelElegido === "experto"){
     filas = niveles[nivelElegido].filas;
     columnas = niveles[nivelElegido].columnas;
     minas = niveles[nivelElegido].minas;
    }else{
      
    }
  }else{
    contenedorNiveles.appendChild(error);
    error.innerHTML = "Elige un nivel";
    error.classList.add("errorNivel");
  }
  
  const tablero = crearTablero(filas, columnas);
  crearMinas(tablero, 10, filas, columnas);
  contarMinas(tablero);
  mostrarTablero(tablero);
  console.log(tablero);

  tabla.addEventListener("click", (e) => {
    const id = e.target.id.split(" ");
    console.log(tablero);
    if (tablero[id[0]][id[1]] === "M") {
      e.target.innerHTML = "M";
    }
  });
});
