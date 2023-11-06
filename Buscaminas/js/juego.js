const reloj = document.getElementById("tiempo");
let contadorReloj;

export function tiempo() {
  let segundos = 0;
  let minutos = 0;

  function formatearTiempo(seg, min) {
    return `${min < 10 ? "0" + min : min}:${seg < 10 ? "0" + seg : seg}`;
  }

  contadorReloj = setInterval(() => {
    segundos++;
    if (segundos === 60) {
      segundos = 0;
      minutos++;
    }
    reloj.innerHTML = `🕐${formatearTiempo(segundos, minutos)}`;
  }, 1000);
}

export function perder(f, c, tablero) {
  let contenidoCelda = tablero[f][c];

  if (contenidoCelda === "M") {
    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j < tablero[i].length; j++) {
        if (tablero[i][j] === "M") {
          document.getElementById(`${i} ${j}`).style.backgroundColor = "orange";
          document.getElementById(`${i} ${j}`).style.fontSize = "20px";
          document.getElementById(`${i} ${j}`).innerHTML = "💣";
        }
      }
    }
    clearInterval(contadorReloj);

    setTimeout(() => {
      document.getElementsByClassName("modalPerder")[0].style.display = "block";
      document.getElementById("tiempoJugadoPerder").innerHTML = `Tiempo jugado: ${reloj.innerHTML.slice(2)}`;
    }, 1000);
  }
  reiniciar();
}

export function ganar(tablero){
  let celdasSinMina = 0;
  tablero.forEach((fila) => {
    fila.forEach((celda) => {
      if (celda !== "M") {
        celdasSinMina++;
      }
    });
  });

  if(document.getElementsByClassName("celda-pulsada").length === celdasSinMina){
    clearInterval(contadorReloj);
    setTimeout(() => {
      document.getElementsByClassName("modalGanar")[0].style.display = "block";
      document.getElementById("tiempoJugadoGanar").innerHTML = `Tiempo jugado: ${reloj.innerHTML.slice(2)}`;
    }, 1000);
  }

  reiniciar();
}

function reiniciar() {
  let botonReiniciar = document.getElementById("reiniciarPerder");
  let botonGanar = document.getElementById("reiniciarGanar");
  botonReiniciar.addEventListener("click", () => {
    location.reload();
  });

  botonGanar.addEventListener("click", () => {
    location.reload();
  });
}


export function banderas(celdaPulsada){
  let minas = document.getElementById("banderas").innerHTML.split("/")[1];
  let banderas = document.getElementById("banderas");

  if (celdaPulsada.classList.contains("celda-pulsada")) {
    celdaPulsada.classList.remove("bandera");
    banderas.innerHTML = `🚩${document.getElementsByClassName("bandera").length}/${minas}`;
  } else if (celdaPulsada.classList.contains("bandera")) {
    celdaPulsada.classList.remove("bandera");
    celdaPulsada.innerHTML = "";
    banderas.innerHTML = `🚩${document.getElementsByClassName("bandera").length}/${minas}`;
  } else {
    if (document.getElementsByClassName("bandera").length < minas) {
      celdaPulsada.innerHTML = "🚩";
      celdaPulsada.style.fontSize = "20px";
      celdaPulsada.classList.add("bandera");
      banderas.innerHTML = `🚩${document.getElementsByClassName("bandera").length}/${minas}`;
    }
  }
}
