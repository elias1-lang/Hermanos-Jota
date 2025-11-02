import React, { useState, useEffect } from 'react';

function ProductoOtrasCategorias() {

    const [error, setError] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(`/api/categorias`);
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías');
                } 
                const data = await response.json();
                setCategorias(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategorias();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }
    if (loading) {
        return <p>Cargando categorías...</p>;
    }


    return (
        <div>
            <h2 className="producto-otros_titulo">Otras categorías</h2>
            <div id="producto-otros-categorias_contenedor">
                {categorias.map((categoria) => (
                    <div 
                        key={categoria._id}
                        className="producto-otros-categorias_Categoria" 
                        id={`producto-otros-categorias-${categoria.orden}`}
                        style={{cursor: 'pointer'}}
                    >
                        <h2 className="producto-otros-categorias_Categoria_Titulo">
                            {categoria.nombre}
                        </h2>
                        <img 
                            className="producto-otros-categorias_Categoria_Imagen" 
                            src={categoria.imageUrl} 
                            alt={categoria.nombre} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductoOtrasCategorias;