import React from "react";
import stylesbase from "../styles/base/styles-base.css";
import { eliminarCarrito } from "../utils/carritoFunciones";

export default function BaseCarritoItem({nombre,cantidad,precio,id,actualizarCarrito}){
    
    const estilosContenedor = {
        marginBottom:"1rem",
        borderBottom:"1px solid #eee",
        paddingBbottom: "0.5rem",
    };

    const estilosPrecio = {
        fontSize:"0.95em",
        color:"#b85c2e",
    };

    const estilosSubtotal = {
        fontSize:"0.95em",
    };

    const estilosBoton = {
        marginTop:"4px",
        background:"#b85c2e",
        color:"#fff",
        border:"none",
        borderRadius:"4px",
        padding:"2px 8px",
        cursor:"pointer",
        fontSize:"0.7em",
        height:"2em"
    };

    return (
        <>
            <div style={estilosContenedor}>
                <strong>{nombre}</strong><br />
                 Cantidad: {cantidad}<br />
                <span style={estilosPrecio}>${precio}</span><br />
                <span style={estilosSubtotal}>Subtotal: ${precio*cantidad}</span><br />
                <button className='carrito-eliminar' data-id={id} style={estilosBoton} onClick={()=>{actualizarCarrito(id,-1)}}>Eliminar</button>
            </div>
        </>
    );
}