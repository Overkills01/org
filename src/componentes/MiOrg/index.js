import { useState } from "react"
import "./MiOrg.css"
const MiOrg = (props) => {

// Estado - hooks
//useState
//useState()
//const [nombreVariable,funcionActualiza] = useState(valorInicial)
//const [nmbre, actualizarNombre] = usestate()

    
   // const [mostrar, actualizarMostrar] = useState(true)
    //const manejarClick = () => {
      //  actualizarMostrar(!mostrar)

    //}

    return <section className="orgSection">

        <h3 className="title">Mi organización</h3>
        <img src="/img/add-01.png" alt="add" onClick={props.cambiarMostrar}/>

    </section>

}

export default MiOrg