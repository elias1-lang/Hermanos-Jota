import React, { useState, useEffect, useContext} from 'react';
import URL_BASE from '../../config/api';
import { CartContext } from '../../context/CartContext';
// import ProductoModalImg from './ProductoModalImg';


export default function ProductoContenido({ id }) {

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { AddItemToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`${URL_BASE}/productos/${id}`); //espero a que termine el fetch
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
        return <p>{error.message}</p>;
    }
    if (loading) {
        return <p>Cargando producto...</p>;
    }

    const excluir = ["id", "_id", "nombre", "descripcion", "precio", "imageUrl", "alt", "link", "categoria","destacado","createdAt","updatedAt"];
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
                    <button className="boton-comprar" onClick={()=>AddItemToCart(producto.id)}>
                        Comprar ahora
                    </button>
                </div>
            </div>
        </main>
        // TODO: modal image que estaba en la entrega anterior
    );
}
