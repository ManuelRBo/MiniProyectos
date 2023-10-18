const form = document.getElementById("formulario");
const tabla = document.getElementById("tabla");

let filas = 8;
let columnas = 8;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // const filas = form.filas.value;
  // const columnas = form.columnas.value;
  const tablero = crearTablero(filas, columnas);
  crearMinas(tablero, 10);
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

function crearTablero(filas, columnas) {
  let tablero = [];
  for (let i = 0; i < filas; i++) {
    tablero[i] = [];
    for (let j = 0; j < columnas; j++) {
      tablero[i][j] = 0;
    }
  }
  return tablero;
}

function crearMinas(tablero, minas) {
  for (let i = 0; i < minas; i++) {
    let fila = Math.floor(Math.random() * filas);
    let columna = Math.floor(Math.random() * columnas);
    if (tablero[fila][columna] === "M") {
      i--;
    } else {
      tablero[fila][columna] = "M";
    }
  }
}

function contarMinas(tablero) {
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (i === 0 && j === 0) {
        if (tablero[i][j] === "M") {
          tablero[i][j + 1] !== "M"
            ? parseInt((tablero[i][j + 1] += 1)).toString()
            : null; //derecha
          tablero[i + 1][j] !== "M"
            ? parseInt((tablero[i + 1][j] += 1)).toString()
            : null; //abajo
          tablero[i + 1][j + 1] !== "M"
            ? parseInt((tablero[i + 1][j + 1] += 1)).toString()
            : null; //diagonal derecha abajo
        }
      } else if (i === 0 && j === columnas - 1) {
        if (tablero[i][j] === "M") {
          tablero[i][j - 1] !== "M"
            ? parseInt((tablero[i][j - 1] += 1)).toString()
            : null; //izquierda
          tablero[i + 1][j] !== "M"
            ? parseInt((tablero[i + 1][j] += 1)).toString()
            : null; //abajo
          tablero[i + 1][j - 1] !== "M"
            ? parseInt((tablero[i + 1][j - 1] += 1)).toString()
            : null; //diagonal izquierda abajo
        }
      } else if (i === filas - 1 && j === 0) {
        if (tablero[i][j] === "M") {
          tablero[i - 1][j] !== "M"
            ? parseInt((tablero[i - 1][j] += 1)).toString()
            : null; //arriba
          tablero[i][j + 1] !== "M"
            ? parseInt((tablero[i][j + 1] += 1)).toString()
            : null; //derecha
          tablero[i - 1][j + 1] !== "M"
            ? parseInt((tablero[i - 1][j + 1] += 1)).toString()
            : null; //diagonal derecha arriba
        }
      } else if (i === filas - 1 && j === columnas - 1) {
        if (tablero[i][j] === "M") {
          tablero[i - 1][j] !== "M"
            ? parseInt((tablero[i - 1][j] += 1)).toString()
            : null; //arriba
          tablero[i][j - 1] !== "M"
            ? parseInt((tablero[i][j - 1] += 1)).toString()
            : null; //izquierda
          tablero[i - 1][j - 1] !== "M"
            ? parseInt((tablero[i - 1][j - 1] += 1)).toString()
            : null; //diagonal izquierda arriba
        }
      } else if (i === 0) {
        if (tablero[i][j] === "M") {
          tablero[i][j - 1] !== "M"
            ? parseInt((tablero[i][j - 1] += 1)).toString()
            : null; //izquierda
          tablero[i][j + 1] !== "M"
            ? parseInt((tablero[i][j + 1] += 1)).toString()
            : null; //derecha
          tablero[i + 1][j - 1] !== "M"
            ? parseInt((tablero[i + 1][j - 1] += 1)).toString()
            : null; //diagonal izquierda abajo
          tablero[i + 1][j] !== "M"
            ? parseInt((tablero[i + 1][j] += 1)).toString()
            : null; //abajo
          tablero[i + 1][j + 1] !== "M"
            ? parseInt((tablero[i + 1][j + 1] += 1)).toString()
            : null; //diagonal derecha abajo
        }
      } else if (i === filas - 1) {
        if (tablero[i][j] === "M") {
          tablero[i][j - 1] !== "M"
            ? parseInt((tablero[i][j - 1] += 1)).toString()
            : null; //izquierda
          tablero[i][j + 1] !== "M"
            ? parseInt((tablero[i][j + 1] += 1)).toString()
            : null; //derecha
          tablero[i - 1][j - 1] !== "M"
            ? parseInt((tablero[i - 1][j - 1] += 1)).toString()
            : null; //diagonal izquierda arriba
          tablero[i - 1][j] !== "M"
            ? parseInt((tablero[i - 1][j] += 1)).toString()
            : null; //arriba
          tablero[i - 1][j + 1] !== "M"
            ? parseInt((tablero[i - 1][j + 1] += 1)).toString()
            : null; //diagonal derecha arriba
        }
      } else if (j === 0) {
        if (tablero[i][j] === "M") {
          tablero[i - 1][j] !== "M"
            ? parseInt((tablero[i - 1][j] += 1)).toString()
            : null; //arriba
          tablero[i + 1][j] !== "M"
            ? parseInt((tablero[i + 1][j] += 1)).toString()
            : null; //abajo
          tablero[i - 1][j + 1] !== "M"
            ? parseInt((tablero[i - 1][j + 1] += 1)).toString()
            : null; //diagonal derecha arriba
          tablero[i][j + 1] !== "M"
            ? parseInt((tablero[i][j + 1] += 1)).toString()
            : null; //derecha
          tablero[i + 1][j + 1] !== "M"
            ? parseInt((tablero[i + 1][j + 1] += 1)).toString()
            : null; //diagonal derecha abajo
        }
      } else if (j !== columnas - 1) {
        if (tablero[i][j] === "M") {
          tablero[i - 1][j] !== "M"
            ? parseInt((tablero[i - 1][j] += 1)).toString()
            : null; //arriba
          tablero[i + 1][j] !== "M"
            ? parseInt((tablero[i + 1][j] += 1)).toString()
            : null; //abajo
          tablero[i - 1][j + 1] !== "M"
            ? parseInt((tablero[i - 1][j + 1] += 1)).toString()
            : null; //diagonal derecha arriba
          tablero[i][j + 1] !== "M"
            ? parseInt((tablero[i][j + 1] += 1)).toString()
            : null; //derecha
          tablero[i + 1][j + 1] !== "M"
            ? parseInt((tablero[i + 1][j + 1] += 1)).toString()
            : null; //diagonal derecha abajo
          tablero[i - 1][j - 1] !== "M"
            ? parseInt((tablero[i - 1][j - 1] += 1)).toString()
            : null; //diagonal izquierda arriba
          tablero[i][j - 1] !== "M"
            ? parseInt((tablero[i][j - 1] += 1)).toString()
            : null; //izquierda
          tablero[i + 1][j - 1] !== "M"
            ? parseInt((tablero[i + 1][j - 1] += 1)).toString()
            : null; //diagonal izquierda abajo
        }
      }
    }
  }
}

function mostrarTablero(tablero) {
  for (let i = 0; i < filas; i++) {
    tabla.innerHTML += `<tr id='fila${i}'></tr>`;
    for (let j = 0; j < columnas; j++) {
      let valorCelda = tablero[i][j];
      tabla.querySelector(`#fila${i}`).innerHTML += `<td id='${i} ${j}'>${valorCelda===0 ? "": valorCelda}</td>`;
    }
  }
}


const play = document.querySelector('.bomba-texto');
const titulo = document.querySelector('.titulo');
const formulario = document.querySelector('.contenedor-formulario');

play.addEventListener('click', () => {
    titulo.classList.add('desaparecer');
    formulario.setAttribute('class', 'aparecer');
});