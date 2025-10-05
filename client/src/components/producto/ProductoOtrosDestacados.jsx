import React, { useState, useEffect } from 'react';
import productosDestacados from '../../data/archivoProductosDestacados.js';
import productos from '../../data/productos.js';

function ProductoOtrosDestacados() {
    const [productosDestacados, setProductosDestacados] = useState([]);

    const params = new URLSearchParams(window.location.search);
    const currentId = params.get("id");

    const destacados = productosDestacados.filter((producto) => producto.id !== currentId);
    setProductosDestacados(destacados);

    return (
        <div className="producto-otros" id="producto-otros_contenedor">
            <h2 className="producto-otros_titulo">También te puede interesar</h2>
            <div id="producto-otros-destacados_contenedor">
                {productosDestacados.map((producto) => (
                    <a 
                        key={producto.id}
                        href={producto.link} 
                        className="producto-otros-destacados_Producto" 
                        style={{textDecoration: 'none', color: 'inherit'}}
                    >
                        <div className="producto-otros-destacados_Producto_Imagen">
                            <img src={producto.image} alt={producto.nombre} />
                        </div>
                        <div className="producto-otros-destacados_Producto_Titulo">
                            <h2>{producto.nombre}</h2>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default ProductoOtrosDestacados;