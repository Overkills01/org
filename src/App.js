import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
import './App.css';
import HeaderHeader_total from './componentes/Header/Header';
import Formulario from './componentes/formulario/formulario';
import MiOrg from './componentes/MiOrg';
import Equipo from './componentes/Equipo';
import Footer from './componentes/Footer';

function App() {
    const [mostrarFormulario, actualizarMostrar] = useState(false);
    const [colaboradores, actualizarColaboradores] = useState([
        {
            id: uuid(),
            equipo: "Front End",
            nombre: "Sebastian Sosa",
            puesto: "Estudiante",
            foto: "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png",
            fav: true
        },
    ]);

    const [equipos, actualizarEquipos] = useState([
        {
            id: uuid(),
            titulo: "Programación",
            colorPrimario: "#57C278",
            colorSecundario: "#D9F7E9",
        },
        {
            id: uuid(),
            titulo: "Front End",
            colorPrimario: "#82CFFA",
            colorSecundario: "#E8F8FF",
        },
        {
            id: uuid(),
            titulo: "Data Science",
            colorPrimario: "#A6D157",
            colorSecundario: "#F0F8E2",
        },
        {
            id: uuid(),
            titulo: "Devops",
            colorPrimario: "#E06B69",
            colorSecundario: "#FDE7E8",
        },
        {
            id: uuid(),
            titulo: "UX y Diseño",
            colorPrimario: "#DB6EBF",
            colorSecundario: "#FAE9F5",
        },
        {
            id: uuid(),
            titulo: "Móvil",
            colorPrimario: "#FFBA05",
            colorSecundario: "#FFF5D9",
        },
        {
            id: uuid(),
            titulo: "Innovación y Gestión",
            colorPrimario: "#FF8A29",
            colorSecundario: "#FFEEDF",
        },
    ]);

    const cambiarMostrar = () => {
        actualizarMostrar(!mostrarFormulario);
    };

    const registrarColaborador = (colaborador) => {
        const nuevoColaborador = { ...colaborador, id: uuid() };
        actualizarColaboradores([...colaboradores, nuevoColaborador]);

        const equipoExiste = equipos.some((equipo) => equipo.titulo === colaborador.equipo);
        if (!equipoExiste) {
            actualizarEquipos([
                ...equipos,
                {
                    id: uuid(), // Asegúrate de que los nuevos equipos también tengan un id
                    titulo: colaborador.equipo,
                    colorPrimario: "#000000", // Color por defecto para nuevos equipos
                    colorSecundario: "#ffffff", // Color por defecto para nuevos equipos
                },
            ]);
        }
    };

    const eliminarColaborador = (id) => { 
        console.log(`Colaboradores antes de eliminar:`, colaboradores);
        const nuevosColaboradores = colaboradores.filter((colaborador) => colaborador.id !== id);
        console.log(`Colaboradores después de eliminar:`, nuevosColaboradores);
        actualizarColaboradores(nuevosColaboradores);
    }; 

    const actualizarColor = (color, id) => {
        const equiposActualizados = equipos.map((equipo) => {
            if (equipo.id === id) {
                equipo.colorPrimario = color;
            }
            return equipo;
        });

        actualizarEquipos(equiposActualizados);
    };


    const like = (id) => {
        console.log("like", id)
        const colaboradoresActualizados = colaboradores.map((colaborador) => {
          if(colaborador.id === id){
            // Cambia el estado de fav
            colaborador.fav = !colaborador.fav
          }
          return colaborador
        })
        // Actualiza el estado de colaboradores con los cambios
        actualizarColaboradores(colaboradoresActualizados);
      }
      

      const handleContactInfo = (id) => {
        // Aquí puedes manejar la lógica para mostrar la información de contacto del colaborador con el ID proporcionado
        console.log(`Mostrando información de contacto para el colaborador con ID: ${id}`);
    };
    



    const formularioRef = useRef(null);

    return (
        <div>
            <HeaderHeader_total />
            <CSSTransition
                in={mostrarFormulario}
                timeout={500}
                classNames="formulario"
                unmountOnExit
                nodeRef={formularioRef}
            >
                <div ref={formularioRef} className="formulario">
                    <Formulario
                        equipos={equipos.map((equipo) => equipo.titulo)}
                        registrarColaborador={registrarColaborador}
                    />
                </div>
            </CSSTransition>
            <MiOrg cambiarMostrar={cambiarMostrar} />
            {equipos.map((equipo) => (
                <Equipo
                    datos={equipo}
                    key={equipo.id}
                    colaboradores={colaboradores.filter((colaborador) => colaborador.equipo === equipo.titulo)}
                    eliminarColaborador={eliminarColaborador}
                    actualizarColor={actualizarColor}
                    like={like}
                />
            ))}
            <Footer />
        </div>
    );
}

export default App;
