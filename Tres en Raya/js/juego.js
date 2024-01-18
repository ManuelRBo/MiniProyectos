import { extraerModo, extraerFichas, juegoAleatorio } from "./funcionesUtiles.js";

const tiempoTurno = document.getElementById("tiempo-jugador");
const empezarJuego = document.getElementById("empezar-juego");
const casillas = document.querySelectorAll(".casilla");
const modo = extraerModo();
const fichas = extraerFichas();
let tablero = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

empezarJuego.addEventListener("click", () => {
    let jugador = "❌";
    if(modo === 1) {
        if(fichas === 9){
            
        }
    }
});


let jugador = "❌";
    casillas.forEach(casilla => {
        casilla.addEventListener("click", () => {
            if (casilla.textContent === "") {
                casilla.textContent = jugador;
                let fila = casilla.getAttribute("data-fila");
                let columna = casilla.getAttribute("data-columna");
                tablero[fila][columna] = jugador;
                if (jugador === "❌") {
                    jugador = "⭕";
                } else {
                    jugador = "❌";
                }
            }
        });
    });