import React,{useContext, useEffect, useState} from "react";
import "../styles/base/styles-base.css";
import URL_BASE from "../config/api"
import BaseCarritoItem from "./BaseCarritoItem";
import { CartContext } from "../context/CartContext";


export default function BaseCarritoModal(){

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {currentCart, estadoModalCarrito, cambiarEstadoModalCarrito} = useContext(CartContext);

    useEffect(() => {

        if (!estadoModalCarrito) return; // solo cargar cuando el modal está abierto
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${URL_BASE}/productos`);
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data = await response.json();
                setProductos(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, [estadoModalCarrito]);

    if(!estadoModalCarrito){ return null }

    let total = 0;
    const estilosTotal = {
        marginTop: "1.5rem",
        fontWeight: "bold",
        fontSize: "1.1em",
        textAlign: "right",
    }

    return(

    <div id="carrito-modal" className="activo">
        <div className="carrito-modal-contenido">
            <button id="carrito-modal-cerrar" onClick={cambiarEstadoModalCarrito}>&times;</button>
            <h2>Productos en el carrito</h2>
            <div id="carrito-modal-lista">
                {loading && <div>Cargando productos...</div>}
                {error && <div>Error al cargar productos</div>}

                {!loading && !error && currentCart.map( item => {
                    const productoEncontrado = productos.find(p => p.id === item.id);
                    if (!productoEncontrado) return null;
                    total += item.cantidad * productoEncontrado.precio;

                    return (
                        <BaseCarritoItem
                            key={productoEncontrado.id}
                            nombre={productoEncontrado.nombre}
                            cantidad={item.cantidad}
                            precio={productoEncontrado.precio}
                            id={productoEncontrado.id}
                        />
                    )
                })}
                <div style={estilosTotal}>Total: ${total}</div>
            </div>
        </div>
    </div>
   )
 }