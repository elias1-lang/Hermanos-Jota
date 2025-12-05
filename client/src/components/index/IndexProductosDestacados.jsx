import React, { useState, useEffect } from 'react';

import IndexUnDestacado from "./IndexUnDestacado";
import style_index from "../../styles/styles-index.css";
import URL_BASE from '../../config/api';

export default function IndexProductosDestacados({productosDestacados}){
    
    return (
    <div className="index_main_divInfo" id="index_main_Destacados_Contenedor">
        <h2>PRODUCTOS DESTACADOS</h2>
        <div className="index_main_destacados_Productos">
            {
                productosDestacados.map((item) => {
                    return (
                        <IndexUnDestacado 
                            key={item._id}
                            imagen={item.imageUrl}
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