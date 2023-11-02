const tabla = document.getElementById("tabla");

export function crearTablero(filas, columnas) {
  let tablero = [];
  for (let i = 0; i < filas; i++) {
    tablero[i] = [];
    for (let j = 0; j < columnas; j++) {
      tablero[i][j] = 0;
    }
  }
  return tablero;
}

export function crearMinas(tablero, minas, filas, columnas) {
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

// export function contarMinas(tablero, filas, columnas) {
//     for (let i = 0; i < filas; i++) {
//       for (let j = 0; j < columnas; j++) {
//         if (i === 0 && j === 0) {
//           if (tablero[i][j] === "M") {
//             tablero[i][j + 1] !== "M"
//               ? parseInt((tablero[i][j + 1] += 1)).toString()
//               : null; //derecha
//             tablero[i + 1][j] !== "M"
//               ? parseInt((tablero[i + 1][j] += 1)).toString()
//               : null; //abajo
//             tablero[i + 1][j + 1] !== "M"
//               ? parseInt((tablero[i + 1][j + 1] += 1)).toString()
//               : null; //diagonal derecha abajo
//           }
//         } else if (i === 0 && j === columnas - 1) {
//           if (tablero[i][j] === "M") {
//             tablero[i][j - 1] !== "M"
//               ? parseInt((tablero[i][j - 1] += 1)).toString()
//               : null; //izquierda
//             tablero[i + 1][j] !== "M"
//               ? parseInt((tablero[i + 1][j] += 1)).toString()
//               : null; //abajo
//             tablero[i + 1][j - 1] !== "M"
//               ? parseInt((tablero[i + 1][j - 1] += 1)).toString()
//               : null; //diagonal izquierda abajo
//           }
//         } else if (i === filas - 1 && j === 0) {
//           if (tablero[i][j] === "M") {
//             tablero[i - 1][j] !== "M"
//               ? parseInt((tablero[i - 1][j] += 1)).toString()
//               : null; //arriba
//             tablero[i][j + 1] !== "M"
//               ? parseInt((tablero[i][j + 1] += 1)).toString()
//               : null; //derecha
//             tablero[i - 1][j + 1] !== "M"
//               ? parseInt((tablero[i - 1][j + 1] += 1)).toString()
//               : null; //diagonal derecha arriba
//           }
//         } else if (i === filas - 1 && j === columnas - 1) {
//           if (tablero[i][j] === "M") {
//             tablero[i - 1][j] !== "M"
//               ? parseInt((tablero[i - 1][j] += 1)).toString()
//               : null; //arriba
//             tablero[i][j - 1] !== "M"
//               ? parseInt((tablero[i][j - 1] += 1)).toString()
//               : null; //izquierda
//             tablero[i - 1][j - 1] !== "M"
//               ? parseInt((tablero[i - 1][j - 1] += 1)).toString()
//               : null; //diagonal izquierda arriba
//           }
//         } else if (i === 0) {
//           if (tablero[i][j] === "M") {
//             tablero[i][j - 1] !== "M"
//               ? parseInt((tablero[i][j - 1] += 1)).toString()
//               : null; //izquierda
//             tablero[i][j + 1] !== "M"
//               ? parseInt((tablero[i][j + 1] += 1)).toString()
//               : null; //derecha
//             tablero[i + 1][j - 1] !== "M"
//               ? parseInt((tablero[i + 1][j - 1] += 1)).toString()
//               : null; //diagonal izquierda abajo
//             tablero[i + 1][j] !== "M"
//               ? parseInt((tablero[i + 1][j] += 1)).toString()
//               : null; //abajo
//             tablero[i + 1][j + 1] !== "M"
//               ? parseInt((tablero[i + 1][j + 1] += 1)).toString()
//               : null; //diagonal derecha abajo
//           }
//         } else if (i === filas - 1) {
//           if (tablero[i][j] === "M") {
//             tablero[i][j - 1] !== "M"
//               ? parseInt((tablero[i][j - 1] += 1)).toString()
//               : null; //izquierda
//             tablero[i][j + 1] !== "M"
//               ? parseInt((tablero[i][j + 1] += 1)).toString()
//               : null; //derecha
//             tablero[i - 1][j - 1] !== "M"
//               ? parseInt((tablero[i - 1][j - 1] += 1)).toString()
//               : null; //diagonal izquierda arriba
//             tablero[i - 1][j] !== "M"
//               ? parseInt((tablero[i - 1][j] += 1)).toString()
//               : null; //arriba
//             tablero[i - 1][j + 1] !== "M"
//               ? parseInt((tablero[i - 1][j + 1] += 1)).toString()
//               : null; //diagonal derecha arriba
//           }
//         } else if (j === 0) {
//           if (tablero[i][j] === "M") {
//             tablero[i - 1][j] !== "M"
//               ? parseInt((tablero[i - 1][j] += 1)).toString()
//               : null; //arriba
//             tablero[i + 1][j] !== "M"
//               ? parseInt((tablero[i + 1][j] += 1)).toString()
//               : null; //abajo
//             tablero[i - 1][j + 1] !== "M"
//               ? parseInt((tablero[i - 1][j + 1] += 1)).toString()
//               : null; //diagonal derecha arriba
//             tablero[i][j + 1] !== "M"
//               ? parseInt((tablero[i][j + 1] += 1)).toString()
//               : null; //derecha
//             tablero[i + 1][j + 1] !== "M"
//               ? parseInt((tablero[i + 1][j + 1] += 1)).toString()
//               : null; //diagonal derecha abajo
//           }
//         } else if (j !== columnas - 1) {
//           if (tablero[i][j] === "M") {
//             tablero[i - 1][j] !== "M"
//               ? parseInt((tablero[i - 1][j] += 1)).toString()
//               : null; //arriba
//             tablero[i + 1][j] !== "M"
//               ? parseInt((tablero[i + 1][j] += 1)).toString()
//               : null; //abajo
//             tablero[i - 1][j + 1] !== "M"
//               ? parseInt((tablero[i - 1][j + 1] += 1)).toString()
//               : null; //diagonal derecha arriba
//             tablero[i][j + 1] !== "M"
//               ? parseInt((tablero[i][j + 1] += 1)).toString()
//               : null; //derecha
//             tablero[i + 1][j + 1] !== "M"
//               ? parseInt((tablero[i + 1][j + 1] += 1)).toString()
//               : null; //diagonal derecha abajo
//             tablero[i - 1][j - 1] !== "M"
//               ? parseInt((tablero[i - 1][j - 1] += 1)).toString()
//               : null; //diagonal izquierda arriba
//             tablero[i][j - 1] !== "M"
//               ? parseInt((tablero[i][j - 1] += 1)).toString()
//               : null; //izquierda
//             tablero[i + 1][j - 1] !== "M"
//               ? parseInt((tablero[i + 1][j - 1] += 1)).toString()
//               : null; //diagonal izquierda abajo
//           }
//         }
//       }
//     }
//   }

export function contarMinas(tablero, filas, columnas) {
  // Función auxiliar para verificar si una celda está dentro de los límites del tablero
  function esCeldaValida(x, y) {
    return x >= 0 && x < filas && y >= 0 && y < columnas;
  }

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (tablero[i][j] === "M") {
        // Definir las direcciones relativas a la celda actual
        const direcciones = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];

        // Contar minas en las celdas adyacentes
        for (const [dx, dy] of direcciones) {
          const x = i + dx;
          const y = j + dy;

          if (esCeldaValida(x, y) && tablero[x][y] !== "M") {
            tablero[x][y] = (parseInt(tablero[x][y]) + 1).toString();
          }
        }
      }
    }
  }
}

export function mostrarTablero(filas, columnas) {
  tabla.style.display = "grid";
  tabla.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
  tabla.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
  tabla.style.gap = "3px";
  tabla.classList.add("aparecer");
  tabla.style.transform = "rotateX(0deg)";
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      tabla.innerHTML += `<div class='celdas' id='${i} ${j}'></div>`;
    }
  }
}

export function mostrarCeldaContigua(tablero, f, c) {
  if (
    f < 0 ||
    c < 0 ||
    f >= tablero.length ||
    c >= tablero[0].length ||
    document.getElementById(`${f} ${c}`).classList.contains("celda-pulsada") ||
    tablero[f][c] === "M"
  ) {
    return;
  }

  

     const celdaActual = document.getElementById(`${f} ${c}`);
      celdaActual.classList.add("celda-pulsada");
      celdaActual.innerHTML = tablero[f][c];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      if(tablero[f][c] === 0 ) {
        celdaActual.innerHTML="";
      mostrarCeldaContigua(tablero, f + i, c + j);
      }
    }
  }
}


export function perder(f, c, tablero) {
  let contenidoCelda = tablero[f][c];
  if(contenidoCelda === "M"){
    document.getElementsByClassName('modalPerder')[0].style.display = "block";
    let celdas = document.getElementsByClassName('celdas');
    for(let i = 0; i < celdas.length; i++){
      celdas[i].removeEventListener("mousedown", (e) => {});
    }
  }
}