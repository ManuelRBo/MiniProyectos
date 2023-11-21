import { comprobarGanador } from "./src/js/jugadorVSjugador.js";
import { jugador1, jugador2, jugador1vsPC } from "./src/js/jugadorVSjugador.js";
import { objetos } from "./src/js/objetos.js";
import { historial } from "./src/js/historial.js";

//Variables globlales
const menuJugadorvsJugador = document.querySelector(".jugador-vs-jugador");
const menuJugadorvsPc = document.querySelector(".jugador-vs-pc");
const menuNivel = document.querySelector(".menuNivel");
const contenedor = document.querySelector(".contenedorCentrado");
const contenedorJuego = document.querySelector(".juego");

//Variables del juego

menuJugadorvsJugador.addEventListener("click", () => {
  //Desaparece el menu
  contenedor.removeChild(menuNivel);
  contenedorJuego.style.display = "flex";
  jugarJugadorVSjugador();
});

menuJugadorvsPc.addEventListener("click", () => {
  contenedor.removeChild(menuNivel);
  contenedorJuego.style.display = "flex";
  jugarVsPc();
});

function jugarVsPc() {
  contenedorJuego.innerHTML = jugador1vsPC;
  // Empezamos el juego e inicializamos las variables
  let eleccionJugador1 = "";
  let eleccionJugador2 = "";

  function manejarTeclado(e) {
    if (e.key === "q" || e.key === "w" || e.key === "e" || e.key === "r") {
        eleccionJugador1 = e.key;
        historial.jugador1.elecciones.push(eleccionJugador1);
        if(eleccionJugador1 === "r"){
          eleccionJugador2 = eleccion80();
        }else{
          eleccionJugador2 = eleccionAleatoria();
        }
        historial.jugador2.elecciones.push(eleccionJugador2);
        contenedorJuego.innerHTML = resultado(eleccionJugador1, eleccionJugador2, objetos);
        document.body.removeEventListener("keydown", manejarTeclado);
        setTimeout(() => {
          contenedorJuego.innerHTML += comprobarGanador(eleccionJugador1, eleccionJugador2);
          document.querySelector(".volverJugar").addEventListener("click", () => {
            jugarVsPc();
          });
          document.querySelector(".terminar").addEventListener("click", () => {
            let partidasTotales = historial.jugador1.partidasGanadas + historial.jugador2.partidasGanadas + historial.empate.partidasEmpatadas;
            let partidasGanadasJugador2 = historial.jugador2.partidasGanadas;
            let partidasGanadasJugador1 = historial.jugador1.partidasGanadas;
            let partidasPerdidasJugador1 = partidasTotales - partidasGanadasJugador1;
            let partidasPerdidasJugador2 = partidasTotales - partidasGanadasJugador2;
            let porcentajeGanadasJugador1 = (partidasGanadasJugador1 * 100) / partidasTotales;
            let porcentajeGanadasJugador2 = (partidasGanadasJugador2 * 100) / partidasTotales;
            document.querySelector(".contenedorCentrado").style.height = "auto";
            contenedorJuego.innerHTML = `<div class="historial">
            <h2>Historial</h2>
            <p class="partidasTotales">Partidas Jugadas: ${partidasTotales}</p>
                <div class="historialJugador1">
                    <h3>Jugador 1</h3>
                    <p>Partidas Ganadas: ${partidasGanadasJugador1}</p>
                    <p>Partidas Perdidas: ${partidasPerdidasJugador1}</p>
                    <p>Porcentaje de Victoria: ${porcentajeGanadasJugador1}%</p>
                </div>
                <div class="historialJugador2">
                    <h3>Jugador 2</h3>
                    <p>Partidas Ganadas: ${partidasGanadasJugador2}</p>
                    <p>Partidas Perdidas: ${partidasPerdidasJugador2}</p>
                    <p>Porcentaje de Victoria: ${porcentajeGanadasJugador2}%</p>
                </div>

            <div class="eleccionesPartidas">
                <h2>Elecciones de las Partidas</h2>
                <div class="eleccionesJugadores">
                    <div class="nombreJugadores">
                        <p>Jugador 1</p>
                        <p>Jugador 2</p>
                    </div>
                      <div class="conjunto">
                      <div class="conjunto-jugador1">papel</div>
                      <div class="conjunto-vs">VS</div>
                      <div class="conjunto-jugador2">piedra</div>
                      </div>
                </div>
            </div>
            <div class="volverMenu"><p>Volver al Menu</p></div>
        </div>`;
        
            document.querySelector(".volverMenu").addEventListener("click", () => {
              location.reload();
            });
            });

        }, 1000);
  }else{
    alert("Tecla no valida");
  }
}
document.body.addEventListener("keydown", manejarTeclado);
}

function jugarJugadorVSjugador() {
  contenedorJuego.innerHTML = jugador1;
  // Empezamos el juego e inicializamos las variables
  let turno = 1;
  let eleccionJugador1 = "";
  let eleccionJugador2 = "";


  function manejarTeclado(e) {
    if (e.key === "q" || e.key === "w" || e.key === "e") {
      if (turno === 1) {
        eleccionJugador1 = e.key;
        historial.jugador1.elecciones.push(eleccionJugador1);
        contenedorJuego.innerHTML = jugador2;
        turno = 2;
      } else if (turno === 2) {
        eleccionJugador2 = e.key;
        historial.jugador2.elecciones.push(eleccionJugador2);
        contenedorJuego.innerHTML = resultado(eleccionJugador1, eleccionJugador2, objetos);
        document.body.removeEventListener("keydown", manejarTeclado);

        setTimeout(() => {
          contenedorJuego.innerHTML += comprobarGanador(eleccionJugador1, eleccionJugador2);
          document.querySelector(".volverJugar").addEventListener("click", () => {
            jugarJugadorVSjugador();
          });

          document.querySelector(".terminar").addEventListener("click", () => {
            let partidasTotales = historial.jugador1.partidasGanadas + historial.jugador2.partidasGanadas + historial.empate.partidasEmpatadas;
            let partidasGanadasJugador2 = historial.jugador2.partidasGanadas;
            let partidasGanadasJugador1 = historial.jugador1.partidasGanadas;
            let partidasPerdidasJugador1 = partidasTotales - partidasGanadasJugador1;
            let partidasPerdidasJugador2 = partidasTotales - partidasGanadasJugador2;
            let porcentajeGanadasJugador1 = (partidasGanadasJugador1 * 100) / partidasTotales;
            let porcentajeGanadasJugador2 = (partidasGanadasJugador2 * 100) / partidasTotales;
            document.querySelector(".contenedorCentrado").style.height = "auto";
            contenedorJuego.innerHTML = `<div class="historial">
            <h2>Historial</h2>
            <p class="partidasTotales">Partidas Jugadas: ${partidasTotales}</p>
                <div class="historialJugador1">
                    <h3>Jugador 1</h3>
                    <p>Partidas Ganadas: ${partidasGanadasJugador1}</p>
                    <p>Partidas Perdidas: ${partidasPerdidasJugador1}</p>
                    <p>Porcentaje de Victoria: ${porcentajeGanadasJugador1}%</p>
                </div>
                <div class="historialJugador2">
                    <h3>Jugador 2</h3>
                    <p>Partidas Ganadas: ${partidasGanadasJugador2}</p>
                    <p>Partidas Perdidas: ${partidasPerdidasJugador2}</p>
                    <p>Porcentaje de Victoria: ${porcentajeGanadasJugador2}%</p>
                </div>

            <div class="eleccionesPartidas">
                <h2>Elecciones de las Partidas</h2>
                <div class="eleccionesJugadores">
                    <div class="nombreJugadores">
                        <p>Jugador 1</p>
                        <p>Jugador 2</p>
                    </div>
                      <div class="conjunto">
                      <div class="conjunto-jugador1">papel</div>
                      <div class="conjunto-vs">VS</div>
                      <div class="conjunto-jugador2">piedra</div>
                      </div>
                </div>
            </div>
            <div class="volverMenu"><p>Volver al Menu</p></div>
        </div>`;
        
            document.querySelector(".volverMenu").addEventListener("click", () => {
              location.reload();
            });
            });
        }, 1000);

      } else {
        alert("Tecla no valida");
      }
    }
  }
  document.body.addEventListener("keydown", manejarTeclado);
}


function resultado(eleccionJugador1, eleccionJugador2, objetos) {
  return `<div class="resultadoJugador">
            <p>Jugador 1</p>
            <p>${objetos[eleccionJugador1]};</p>
        </div>
        <div class="resultadoJugador">
            <p>Jugador 2</p>
            <p>${objetos[eleccionJugador2]};</p>
        </div>`;
}

function eleccionAleatoria(){
  let eleccion = Math.floor(Math.random() * 3);
  if(eleccion === 0){
    return "q";
  }else if(eleccion === 1){
    return "w";
  }else{
    return "e";
  }
}

function eleccion80(){
  let eleccion = Math.floor(Math.random() * 5);
  if(eleccion === 0){
    return "q";
  }else if(eleccion === 1){
    return "w";
  }else if(eleccion === 2){
    return "e";
  }else if(eleccion === 3){
    return "q";
  }else{
    return "w";
  }
}
