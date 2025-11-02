import React, { useState, useEffect } from 'react';

import IndexUnDestacado from "./IndexUnDestacado";
import style_index from "../../styles/styles-index.css";
import URL_BASE from '../../config/api';

export default function IndexProductosDestacados({}){
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductosDestacados = async () => {
            try {
                const response = await fetch(`${URL_BASE}/productos/0/destacados`);
                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                } 
                const data = await response.json();
                setProductosDestacados(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProductosDestacados();
    }, []);

    return (
    <div className="index_main_divInfo" id="index_main_Destacados_Contenedor">
        <h2>PRODUCTOS DESTACADOS</h2>
        <div className="index_main_destacados_Productos">
            {
                productosDestacados.map((item) => {
                    return (
                        <IndexUnDestacado 
                        key={item._id}
                        imagen={item.producto.imageUrl}
                        nombre={item.producto.nombre}
                        descripcion={item.producto.descripcion}
                        precio={item.producto.precio}
                        urlProducto={item.producto.link}
                        />
                    );
                })
            }
        </div>
    </div>
    );
}