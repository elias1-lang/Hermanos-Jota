import React, { useState, useEffect } from 'react';
import principalesCategorias from '../../data/principalesCategorias.js';

function ProductoOtrasCategorias() {

    const [categorias, setCategorias] = useState([]);
    const categoriasData = [];
    principalesCategorias.forEach((categoria) => {
        categoriasData.push(categoria);
    });
    setCategorias(categoriasData);

    const handleCategoriaClick = (urlCat) => {
        window.location.href = urlCat;
    };

    return (
        <div>
            <h2 className="producto-otros_titulo">Otras categorías</h2>
            <div id="producto-otros-categorias_contenedor">
                {categorias.map((categoria) => (
                    <div 
                        key={categoria.orden}
                        className="producto-otros-categorias_Categoria" 
                        id={`producto-otros-categorias-${categoria.orden}`}
                        onClick={() => handleCategoriaClick(categoria.urlCat)}
                        style={{cursor: 'pointer'}}
                    >
                        <h2 className="producto-otros-categorias_Categoria_Titulo">
                            {categoria.nombre}
                        </h2>
                        <img 
                            className="producto-otros-categorias_Categoria_Imagen" 
                            src={categoria.urlImagen} 
                            alt={categoria.nombre} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductoOtrasCategorias;