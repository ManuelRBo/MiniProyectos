export function validarNombre(nombre) {
  if (nombre.length === 0) {
    return "El campo nombre debe tener al menos 1 caracter";
  }

  if (nombre.length >= 20) {
    return "El campo nombre debe tener menos de 30 caracteres";
  }

  if (!/^[a-zA-Z\s]*$/i.test(nombre)) {
    return "El campo nombre solo acepta letras";
  }

  return "";
}

export function validarNumeroTarjeta(tarjeta){
    if (tarjeta.length != 19) {
        return "El campo tarjeta debe tener 16 numeros";
    }
    
    return "";
}

export function validarFechaVencimientoMes(mes, anio){
    if(anio.length !== 2){
        return "Fecha Invalida";
    }else if(mes > 31 || mes < 1){
        return "Fecha Invalida";
    }else if(anio < 0o0 || anio > 99){
        return "Fecha Invalida";
    }else{
    return "";
}
}

export function validarCodigoSeguridad(codigo){
    if(codigo.length !== 3){
        return "El campo codigo debe tener 3 caracteres";
    }

    if (!/^[0-9]+$/i.test(codigo)) {
        return "El campo codigo solo acepta numeros";
    }

    if(codigo < 100 || codigo > 999){
        return "El campo codigo es incorrecto";
    }
    return "";
}

export function formatNumberWithSpaces(inputNumber) {
    // Primero, elimina cualquier espacio en blanco existente
    const cleanedNumber = inputNumber.replace(/\s/g, "");
  
    // Luego, agrega espacios cada cuatro caracteres
    const formattedNumber = cleanedNumber.replace(/(\d{4})/g, "$1 ");
  
    return formattedNumber.trim(); // Elimina espacios en blanco al principio y al final (si los hubiera)
  }
