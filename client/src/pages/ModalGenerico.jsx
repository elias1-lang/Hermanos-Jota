import React from "react";
import "../styles/base/styles-base.css"

export default function ModalGenerico({children,titulo = "Modal Generico",estado,cambiarEstado}){

    return(
        <>
            {estado && 
                <div className="ModalGenerico_DIV_FondoDifuso">

                    <div className="ModalGenerico_DIV_Contenido">
                        <div className="ModalGenerico_DIV_Encabezado">
                            <h3>{titulo}</h3>
                        </div>
                        
                        <button className="ModalGenerico_BotonCerrar" onClick={()=>{cambiarEstado(!estado)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>

                        <div className="ModalGenerico_Elementos_Contenido">
                            {children}
                        </div>

                    </div>
                    
                </div>
            }
        </>
    );
};

