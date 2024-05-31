import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./formulario.css";
import CampoTexto from "../campoTexto";
import ListaOpciones from "../ListaOpciones";
import Boton from "../Boton";

const Formulario = (props) => {
  const [nombre, actualizarNombre] = useState("");
  const [puesto, actualizarPuesto] = useState("");
  const [foto, actualizarFoto] = useState("");
  const [equipo, actualizarEquipo] = useState("");
  const [otroEquipo, actualizarOtroEquipo] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [mostrarOtroEquipo, setMostrarOtroEquipo] = useState(false);

  const { registrarColaborador } = props;

  useEffect(() => {
    if (equipo === "Otro") {
      const timer = setTimeout(() => {
        setMostrarOtroEquipo(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // En lugar de ocultar inmediatamente, podemos hacer que se desvanezca gradualmente
      const timer = setTimeout(() => {
        setMostrarOtroEquipo(false);
      }, 50); // Tiempo de transición de desvanecimiento
      return () => clearTimeout(timer);
    }
  }, [equipo]);
  

  const manejarEnvio = (e) => {
    e.preventDefault();
    const equipoSeleccionado = equipo === "Otro" ? otroEquipo : equipo;
    let datosEnviar = {
      nombre,
      puesto,
      foto,
      equipo: equipoSeleccionado,
    };
    registrarColaborador(datosEnviar);
    actualizarNombre("");
    actualizarPuesto("");
    actualizarFoto("");
    actualizarEquipo("");
    actualizarOtroEquipo("");
  };

  return (
    <section className="formulario">
      <CSSTransition
        in={mostrarFormulario}
        timeout={500}
        classNames="formulario"
        unmountOnExit
      >
        <form onSubmit={manejarEnvio}>
          <h2>Rellena el formulario para crear el colaborador.</h2>
          <CampoTexto
            titulo="Nombre"
            placeholder="Ingresar nombre"
            required
            valor={nombre}
            actualizarValor={actualizarNombre}
          />
          <CampoTexto
            titulo="Puesto"
            placeholder="Ingresar puesto"
            required
            valor={puesto}
            actualizarValor={actualizarPuesto}
          />
          <CampoTexto
            titulo="Foto"
            placeholder="Ingresar enlace de foto"
            required
            valor={foto}
            actualizarValor={actualizarFoto}
          />
          <ListaOpciones
            valor={equipo}
            actualizarEquipo={actualizarEquipo}
            equipos={[...props.equipos, "Otro"]}
          />
          <CSSTransition
            in={equipo === "Otro"}
            timeout={300}
            classNames="expand"
            unmountOnExit
          >
            <div className="expand-container">
              <CSSTransition
                in={mostrarOtroEquipo}
                timeout={300}
                classNames="input"
                unmountOnExit
              >
                <CampoTexto
                  titulo="Especificar equipo"
                  placeholder="Ingresar nombre del equipo"
                  required
                  valor={otroEquipo}
                  actualizarValor={actualizarOtroEquipo}
                />
              </CSSTransition>
            </div>
          </CSSTransition>
          <Boton texto="Agregar colaborador" />
        </form>
      </CSSTransition>
    </section>
  );
};

export default Formulario;
