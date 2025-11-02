import React,{useEffect, useState} from "react";
import stylesbase from "../styles/base/styles-base.css";
import { retornarCarrito } from "../utils/carritoFunciones";

import BaseCarritoItem from "./BaseCarritoItem";


export default function BaseCarritoModal({estadoCarrito, cambiarEstadoCarrito,carrito,funcionActualizarCarrito}){

    // Hooks must be called unconditionally at the top level
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!estadoCarrito) return; // solo cargar cuando el modal está abierto
        const fetchProductos = async () => {
            try {
                const response = await fetch(`/api/productos`);
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
    }, [estadoCarrito]);

    if(!estadoCarrito){ return null }

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
            <button id="carrito-modal-cerrar" onClick={cambiarEstadoCarrito}>&times;</button>
            <h2>Productos en el carrito</h2>
            <div id="carrito-modal-lista">
                {loading && <div>Cargando productos...</div>}
                {error && <div>Error al cargar productos</div>}
                {!loading && !error && Object.entries(carrito).map(([nombre,cantidad])=>{
                    const productoEncontrado = productos.find(p => p.id === nombre);
                    if (!productoEncontrado) return null;
                    total += cantidad * productoEncontrado.precio;
                    return (
                        <BaseCarritoItem
                            key={productoEncontrado.id}
                            nombre={productoEncontrado.nombre}
                            cantidad={cantidad}
                            precio={productoEncontrado.precio}
                            id={productoEncontrado.id}
                            actualizarCarrito={funcionActualizarCarrito}
                        />
                    )
                })}
                <div style={estilosTotal}>Total: ${total}</div>
            </div>
        </div>
    </div>
   )
 }