import React, { useState, useEffect} from 'react';

// import ProductoModalImg from './ProductoModalImg';


export default function ProductoContenido({ id , funcionAgregar}) {

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`/api/productos/${id}`); //espero a que termine el fetch
                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }
                const data = await response.json();
                setProducto(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducto();
    }, [id]); //depende del id, cada vez que cambie el id, se vuelve a ejecutar fetchProducto()

    if (error) {
        return <p>{error}</p>;
    }
    if (loading) {
        return <p>Cargando producto...</p>;
    }

    const excluir = ["id", "_id", "nombre", "descripcion", "precio", "imageUrl", "alt", "link", "categoria"];
    const atributos = Object.entries(producto).filter(([key, value]) => 
        !excluir.includes(key) && value
    );
   
    return (
        <main id="detalle-producto">
            <h1>{producto.nombre}</h1>
            <div className="producto-contenido">
                <div className="producto-imagen">
                    <img 
                        id="image" 
                        src={producto.imageUrl} 
                        alt={producto.alt || producto.nombre}
                        style={{cursor: 'zoom-in'}}
                    />
                </div>
                <div className="producto-detalles">
                    <p id="description">{producto.descripcion}</p>
                    <div id="atributos">
                        {atributos.map(([key, value]) => {
                            const label = key.charAt(0).toUpperCase() + key.slice(1);
                            return (
                                <p key={key}>
                                    <strong>{label}:</strong> <span>{value}</span>
                                </p>
                            );
                        })}
                    </div>
                    <p className="precio-producto">
                        <strong>Precio: $ <span>{producto.precio}</span></strong>
                    </p>
                    <button className="boton-comprar" onClick={()=>funcionAgregar(producto.id,1)}>
                        Comprar ahora
                    </button>
                </div>
            </div>
        </main>
        // TODO: modal image que estaba en la entrega anterior
    );
}
