import { useNavigate } from "react-router-dom";
//import react from "react";
//import style_index from "../../styles/styles-index.css";

export default function IndexUnDestacado({imagen,nombre,descripcion,precio,urlProducto,funcionAgregar}){
    const navigate = useNavigate();
    const irProducto = () => {navigate(urlProducto);}

    return (
        <div className="index_productoDestacado_Producto">

            <div className="index_productoDestacado_Producto_Imagen">
                <img src={imagen} alt={nombre} />
            </div>

            <div className="index_productoDestacado_Producto_Titulo">
                <h2>{nombre}</h2>
                <p>{descripcion}</p>
            </div>

            <div className="index_productoDestacado_Producto_Precio">
                <h2>$ {precio}</h2>
            </div>
                                
            <div className="index_productoDestacado_Producto_Boton">
             <button onClick={() => window.location.href = urlProducto}>Ver Detalle</button>
            </div>

        </div>
    );
}