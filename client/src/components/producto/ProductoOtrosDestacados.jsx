import React, { useState, useEffect } from 'react';




function ProductoOtrosDestacados({id}) {

    const [productosDestacados, setProductosDestacados] = useState([]);
    const [error, setError] = useState(null);
    
    // esto no era necesario, no vimos fetch todavía pero para probar conectar a la API
    useEffect(() => {
        const fetchProductosDestacados = async () => {
            const response = await fetch(`http://localhost:4000/api/productos/${id}/destacados`);
            // TODO: la url debería estar en una variable global
            if (!response.ok) {
                setError('Error al obtener el producto');
                return;
            } 
            if (response.status === 404) {
                setError('Producto no encontrado');
                return;
            }
            const data = await response.json();
            setProductosDestacados(data);
            
        };
        fetchProductosDestacados();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }
    if (!productosDestacados) {
        return <p>Cargando productos destacados...</p>;
    }
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