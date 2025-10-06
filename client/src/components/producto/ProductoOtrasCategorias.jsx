import React, { useState, useEffect } from 'react';

function ProductoOtrasCategorias() {

    const [error, setError] = useState(null);
    const [categorias, setCategorias] = useState(null);

    // esto no era necesario, no vimos fetch todavía pero para probar conectar a la API
    useEffect(() => {
        const fetchCategorias = async () => {
            const response = await fetch(`http://localhost:4000/api/productos/categorias`);
            // TODO: la url debería estar en una variable global
            if (!response.ok) {
                setError('Error al obtener las categorías');
                return;
            } 
            if (response.status === 404) {
                setError('Categoría no encontrada');
                return;
            }
            const data = await response.json();
            setCategorias(data);
            
        };
        fetchCategorias();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }
    if (!categorias) {
        return <p>Cargando categorías...</p>;
    }


    return (
        <div>
            <h2 className="producto-otros_titulo">Otras categorías</h2>
            <div id="producto-otros-categorias_contenedor">
                {categorias.map((categoria) => (
                    <div 
                        key={categoria.orden}
                        className="producto-otros-categorias_Categoria" 
                        id={`producto-otros-categorias-${categoria.orden}`}
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