/* eslint-disable react/prop-types */
import "./formulario.css";
import {
  validarNombre,
  validarNumeroTarjeta,
  validarFechaVencimientoMes,
  validarCodigoSeguridad,
  formatNumberWithSpaces
} from "../utilities/validaciones";
import { useState } from "react";

export function Formulario({ datos, setDatos, setConfirmacion }) {
  const [errores, setErrores] = useState({
    nombre: "",
    numeroTarjeta: "",
    mes: "",
    cvc: "",
  });

  const recogerDatos = (e) => {
    const { name, value } = e.target;
    const valorFormateado = name === "numeroTarjeta" ? formatNumberWithSpaces(value) : value;
    setDatos({
      ...datos,
      [name]: valorFormateado,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {
      nombre: validarNombre(datos.nombre),
      numeroTarjeta: validarNumeroTarjeta(datos.numeroTarjeta),
      mes: validarFechaVencimientoMes(datos.mes, datos.anio),
      cvc: validarCodigoSeguridad(datos.cvc),
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((error) => error !== "");

  if (!hayErrores) {
    setConfirmacion(true);
  }

};

  const validarFormulario = (e) => {
    const { name } = e.target;
    setErrores({
      ...errores,
      [name]: "",
    });
  };

  return (
    <>
      <form className="formulario" method="Post" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Chardholder name</label>
        <input
          {...(errores.nombre && { className: "error-input" })}
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Jane Appleseed"
          onChange={recogerDatos}
          onFocus={validarFormulario}
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}
        <label htmlFor="numero-tarjeta">Card Number</label>
        <input
          {...(errores.numeroTarjeta && { className: "error-input" })}
          type="number"
          placeholder="1234 5678 9123 0000"
          name="numeroTarjeta"
          id="numero-tarjeta"
          onChange={recogerDatos}
          onInput={validarFormulario}
        />
        {errores.numeroTarjeta && <p className="error">{errores.numeroTarjeta}</p>}
        <div className="ultimo-input">
          <div className="fecha">
            <label htmlFor="mes">Exp. Date (MM/YY)</label>
            <div className="input-fecha">
              <input
                type="number"
                placeholder="MM"
                name="mes"
                id="mes"
                onChange={recogerDatos}
                onInput={validarFormulario}
                {...(errores.mes && { className: "error-input" })}
              />
              <input
                type="number"
                placeholder="YY"
                name="anio"
                id="anio"
                onChange={recogerDatos}
                onInput={validarFormulario}
                {...(errores.mes && { className: "error-input" })}
              />
            </div>
            {errores.mes && <p className="error">{errores.mes}</p>}
          </div>
          <div className="cvc">
            <label htmlFor="cvc">cvc</label>
            <input
              type="number"
              name="cvc"
              id="cvc"
              placeholder="123"
              onChange={recogerDatos}
              onInput={validarFormulario}
              {...(errores.cvc && { className: "error-input" })}
            />
            {errores.cvc && <p className="error">{errores.cvc}</p>}
          </div>
        </div>
        <button type="submit" className="boton">
          Confirm
        </button>
      </form>
    </>
  );
}
