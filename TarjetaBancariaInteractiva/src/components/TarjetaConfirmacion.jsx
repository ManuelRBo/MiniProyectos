import './tarjetaConfirmacion.css';

export function TarjetaConfirmacion({setConfirmacion, setDatos}){

    const handleClick = (e) => {
        e.preventDefault();
        setConfirmacion(false);
        setDatos({
            nombre: "",
            numeroTarjeta: "",
            mes: "",
            anio: "",
            cvc: "",
        });
    }

    return(
        <>
        <div className="contenedor-tarjeta-confirmacion">
            <img src="/images/icon-complete.svg" alt="" />
            <h1>Thank You!</h1>
            <p>We've added your card details</p>
            <button onClick={handleClick}>Continue</button>
        </div>
        </>
    );
}