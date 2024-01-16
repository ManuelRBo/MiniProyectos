const form = document.querySelector("form");
const modos = form.elements.namedItem("modo");
const fichas = form.elements.namedItem("fichas");

modos.forEach((modo) => {
  modo.addEventListener("click", () => {
    modos.forEach((modo) => {
      modo.classList.remove("seleccionado");
    });
    modo.classList.add("seleccionado");
  });
});

fichas.forEach((ficha) => {
  ficha.addEventListener("click", () => {
    fichas.forEach((ficha) => {
      ficha.classList.remove("seleccionado");
    });
    ficha.classList.add("seleccionado");
  });
});

const mensajeError = document.getElementById("mensaje-error");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let modoSeleccionado = null;
    let fichaSeleccionada = null;
    let error = false;

    modos.forEach((modo) => {
        if (modo.classList.contains("seleccionado")) {
            modoSeleccionado = modo.value;
        }
    });

    fichas.forEach((ficha) => {
        if (ficha.classList.contains("seleccionado")) {
            fichaSeleccionada = ficha.value;
        }
    });

    if (modoSeleccionado === null) {
        error = true;
        mensajeError.style.display = "block";
        mensajeError.innerHTML = "Seleccione modo de juego";
    }

    if (fichaSeleccionada === null) {
        error = true;
        mensajeError.style.display = "block";
        mensajeError.innerHTML = "Seleccione numero de fichas";
    }

    if (!error) {
        const url = `juego.html?modo=${modoSeleccionado}&fichas=${fichaSeleccionada}`;
        window.location.href = url;
    }
});
