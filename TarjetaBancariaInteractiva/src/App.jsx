import {Formulario} from './components/Formulario'
import { Tarjetas } from './components/Tarjetas'
import { TarjetaConfirmacion } from './components/TarjetaConfirmacion'
import { useState} from 'react'
import './app.css'

function App() {

  const [datos, setDatos] = useState({
    nombre: "",
    numeroTarjeta: "",
    mes: "",
    anio: "",
    cvc: "",
  });

  const [confirmacion, setConfirmacion] = useState(false);
  return (
    <main>
      <div className='contenedor-main'>
      <Tarjetas datos={datos} />
      {confirmacion ? <TarjetaConfirmacion setConfirmacion={setConfirmacion} setDatos={setDatos}/> : <Formulario datos={datos} setDatos={setDatos} setConfirmacion={setConfirmacion}/>}
    </div>
    </main>
  )
}

export default App
