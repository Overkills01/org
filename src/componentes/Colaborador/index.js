import "./Colaborador.css";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { GrContactInfo } from "react-icons/gr";


const Colaborador = (props) => {
    const { nombre, puesto, foto, equipo, id, fav } = props.datos;
    const { colorPrimario, eliminarColaborador, like } = props;
    return (
        <div className="colaborador">
            <RiDeleteBin2Fill className="eliminar" onClick={() => {
                console.log(`Eliminando colaborador con id: ${id}`);
                eliminarColaborador(id);
            }} />
            <div className="encabezado" style={{ backgroundColor: colorPrimario }}>
                <img src={foto} alt="nombre" />
            </div>
            <div className="info">
                <h4>{nombre}</h4>
                <h5>{puesto}</h5>
                <div className="boton-container">
                    {fav ? < FcLike className="FcLike" onClick={() => like(id)} /> : <FcLikePlaceholder className="FcLike"  onClick={() => like(id)} />}
                </div>
                <GrContactInfo className="GrContactInfo" onClick={() => console.log(`Mostrando información de contacto para el colaborador con ID: ${id}`)} />




            </div>
        </div>
    );
};

export default Colaborador;
