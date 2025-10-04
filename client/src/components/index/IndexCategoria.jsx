import React from 'react';
import style_index from "../../styles/styles-index.css";

export default function IndexCategoria({orden, nombre,urlImagen}){
    const idConcatenado = "index_cat"+orden;
    const accionConcatenada = "window.location.href='"+urlImagen+"'";

    return (
        <div className="index_main_Categorias_Contenedor_item" id={idConcatenado} onclick={accionConcatenada}>
            <h2 className="index_cat_titulo">{nombre}</h2>
            <img className="index_cat_imagen" src={urlImagen} alt={nombre}/>
        </div>
    );
}