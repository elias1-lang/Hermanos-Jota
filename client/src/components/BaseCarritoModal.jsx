import React,{useEffect, useState} from "react";
import stylesbase from "../styles/base/styles-base.css";
import { retornarCarrito } from "../utils/carritoFunciones";

import archivoProductos from "../data/archivoProductos";
import BaseCarritoItem from "./BaseCarritoItem";


export default function BaseCarritoModal({estadoCarrito, cambiarEstadoCarrito,carrito,funcionActualizarCarrito}){

    if(!estadoCarrito){return null}

    let total = 0;
    const estilosTotal = {
        marginTop:"1.5 rem",
        fontWeight:"bold",
        fontSize:"1.1em",
        textAlign:"right",
    }
    return(

    <div id="carrito-modal" className="activo">
        <div className="carrito-modal-contenido">
            <button id="carrito-modal-cerrar" onClick={cambiarEstadoCarrito}>&times;</button>
            <h2>Productos en el carrito</h2>
            <div id="carrito-modal-lista">
                {
                    Object.entries(carrito).map(([nombre,cantidad])=>{
                        const productoEncontrado = archivoProductos.find(p => p.id === nombre);
                        total+=cantidad*productoEncontrado.precio;
                        return (
                                <BaseCarritoItem
                                    nombre={productoEncontrado.nombre}
                                    cantidad={cantidad}
                                    precio={productoEncontrado.precio}
                                    id={productoEncontrado.id}
                                    actualizarCarrito={funcionActualizarCarrito}
                                />
                        )
                    })
                }
                <div style={estilosTotal}>Total: ${total}</div>
            </div>
        </div>
    </div>
   )
}