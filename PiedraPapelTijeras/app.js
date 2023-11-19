const menuJugadorvsJugador = document.querySelector(".jugador-vs-jugador");
const menuJugadorvsPc = document.querySelector(".jugador-vs-pc");
const menuNivel = document.querySelector(".menuNivel");

menuJugadorvsJugador.addEventListener("click", () => {
  menuNivel.style.display = "none";
});


menuJugadorvsPc.addEventListener("click", () => {
    menuNivel.style.display = "none";
});
