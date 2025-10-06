import React, { useState, useEffect} from 'react';

// import ProductoModalImg from './ProductoModalImg';


export default function ProductoContenido({ id }) {

    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);

    // esto no era necesario, no vimos fetch todavía pero para probar conectar a la API
    useEffect(() => {
        const fetchProducto = async () => {
            const response = await fetch(`http://localhost:4000/api/productos/${id}`); //espero a que termine el fetch
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
            setProducto(data);
        };
        fetchProducto();
    }, [id]); //depende del id, cada vez que cambie el id, se vuelve a ejecutar fetchProducto()

    if (error) {
        return <p>{error}</p>;
    }
    if (!producto) {
        return <p>Cargando producto...</p>;
    }
    

    const excluir = ["id", "nombre", "descripcion", "precio", "image", "alt", "link", "categoria"];
    const atributos = Object.entries(producto).filter(([key, value]) => 
        !excluir.includes(key) && value
    );

    // TODO: hacer en global
    const agregarAlCarrito = (id) => {
        console.log('No implementado');
        return
    }

    const handleComprar = () => {
        if (typeof agregarAlCarrito === 'function') {
            agregarAlCarrito(producto.id);
            return
        }
    };
   
    return (
        <main id="detalle-producto">
            <h1>{producto.nombre}</h1>
            <div className="producto-contenido">
                <div className="producto-imagen">
                    <img 
                        id="image" 
                        src={producto.image} 
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
                    <button className="boton-comprar" onClick={handleComprar}>
                        Comprar ahora
                    </button>
                </div>
            </div>
        </main>
    );
}
