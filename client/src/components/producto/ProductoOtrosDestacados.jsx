import React, { useState, useEffect } from 'react';
import URL_BASE from '../../config/api';
function ProductoOtrosDestacados({id}) {

    const [productosDestacados, setProductosDestacados] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProductosDestacados = async () => {
            try {
                const response = await fetch(`${URL_BASE}/productos/${id}/destacados`);
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
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }
    if (loading) {
        return <p>Cargando productos destacados...</p>;
    }
    return (
        <div className="producto-otros" id="producto-otros_contenedor">
            <h2 className="producto-otros_titulo">También te puede interesar</h2>
            <div id="producto-otros-destacados_contenedor">
                {productosDestacados.map((item) => {
                    return (
                    <a 
                        key={item._id}
                        href={item.producto.link} 
                        className="producto-otros-destacados_Producto" 
                        style={{textDecoration: 'none', color: 'inherit'}}
                    >
                        <div className="producto-otros-destacados_Producto_Imagen">
                            <img src={item.producto.imageUrl} alt={item.producto.nombre} />
                        </div>
                        <div className="producto-otros-destacados_Producto_Titulo">
                            <h2>{item.producto.nombre}</h2>
                        </div>
                    </a>
                )})}
            </div>
        </div>
    );
}

export default ProductoOtrosDestacados;