const diasMes = [31,28,31,30,31,30,31,31,30,31,30,31];

function fechaIncorrecta() {
    let fechaIncorrecta = false;
    if(dia.value > diasMes[mes.value-1] || dia.value < 1){
        entradas[0].classList.add("error");
        entradas[1].classList.add("error");
        entradas[2].classList.add("error");
        errorTexto[0].textContent = "Must be a valid date";
        fechaIncorrecta = true;
    }
    return fechaIncorrecta;
}