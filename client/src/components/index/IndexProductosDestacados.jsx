import react from "react";
import IndexUnDestacado from "./IndexUnDestacado";
import style_index from "../../styles/styles-index.css";
import productosArray from "../../data/archivoProductos"
import productosDestacadosArray from "../../data/archivoProductosDestacados"

export default function IndexProductosDestacados({}){


    return (
    <div className="index_main_divInfo" id="index_main_Destacados_Contenedor">
        <h2>PRODUCTOS DESTACADOS</h2>
        <div className="index_main_destacados_Productos">
            {
                productosDestacadosArray.map(destacado => {
                    const item = productosArray.find(prod => prod.id === destacado);
                    return (
                        <IndexUnDestacado 
                        key={item.id}
                        imagen={item.image}
                        nombre={item.nombre}
                        descripcion={item.descripcion}
                        precio={item.precio}
                        urlProducto={item.link}
                        />
                    );
                })
            }
        </div>
    </div>
    );
}