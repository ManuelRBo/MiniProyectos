/* eslint-disable react/prop-types */
import "./tarjetas.css";

export function Tarjetas({datos}) {

  return (
    <div className="contenedor">
      <div className="contenedor-img">
        <div className="tarjeta-trasera">
          <img className="tarjeta" src="/images/bg-card-back.png" alt="Parte de atras de la tarjeta" width={260} />
          <p className="numero-secreto-trasero" id="numero-secreto">{datos.cvc ? datos.cvc: '000'}</p>
          <div className="tarjeta-delantera">
            <img className="tarjeta" src="/images/bg-card-front.png" alt="Parte de delante de la tarjeta" width={260} />
            <img className="logo-tarjeta" src="/images/card-logo.svg" alt="Logo de la tarjeta" width={50}/>
            <p className="numero-tarjeta" id="numero-tarjeta">{datos.numeroTarjeta ? datos.numeroTarjeta : '0000 0000 0000 0000'}</p>
            <p className="tarjeta-nombre-persona" id="nombre">{datos.nombre ? datos.nombre : 'Jane Appleseed'}</p>
            <p className="fecha-caducidad" id="fecha-cad">{datos.mes || datos.anio ? datos.mes +'/'+ datos.anio :'00/00'}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
