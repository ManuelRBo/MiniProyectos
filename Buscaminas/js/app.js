import {niveles} from "./niveles.js";
import { aparecerFormulario, mantenerEleccion, desaparecerFormulario } from "./formulario.js";
import { crearTablero, crearMinas, contarMinas, mostrarTablero, mostrarCeldas } from "./funcionesTablero.js";
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
      if(form.filas.value && form.columnas.value){
        filas = form.filas.value;
        columnas = form.columnas.value;
        minas = parseInt(filas * columnas * 0.15);
        console.log(minas)
      }else{
        contenedorNiveles.appendChild(error);
        error.innerHTML = "Rellena los campos";
        error.classList.add("errorNivel");
      }
    }
    desaparecerFormulario();
    const tablero = crearTablero(filas, columnas);
    crearMinas(tablero, minas, filas, columnas);
    contarMinas(tablero, filas, columnas);
  
    setTimeout(() => {
      mostrarTablero(filas, columnas);
      tabla.classList.add("aparecer");
    }, 1000);
  

  tabla.addEventListener("mousedown", (e) => {
    document.oncontextmenu = function () {
      return false;
    }; //desactivar el menu contextual
    let id = e.target.id.split(" ");
    mostrarCeldas(tablero, id);
  });

  }else{
    contenedorNiveles.appendChild(error);
    error.innerHTML = "Elige un nivel";
    error.classList.add("errorNivel");
  }
});
