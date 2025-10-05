import React, { useState } from 'react';
import productos from '../../data/productos.js';

export default function ProductoContenido() {
    const [atributos, setAtributos] = useState([]);

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); // obtengo id de producto desde URL
    
    // busco el producto
    const producto = productos.find(p => p.id === id);

    if (producto) {
        const excluir = ["id", "nombre", "descripcion", "precio", "image", "alt", "link", "categoria"];
        const atributos = Object.entries(producto).filter(([key, value]) => 
            !excluir.includes(key) && value
        );
        setAtributos(atributos);
    }

    const handleComprar = () => {
        if (typeof agregarAlCarrito === 'function') {
            agregarAlCarrito(producto.id);
        }
    };

    if (!producto) {
        return <p>Producto no encontrado.</p>;
    }

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
                    <p>{producto.descripcion}</p>
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
