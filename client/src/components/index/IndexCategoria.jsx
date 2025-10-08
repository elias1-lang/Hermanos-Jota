import React from 'react';
//import style_index from "../../styles/styles-index.css";
import { useNavigate } from 'react-router-dom';

export default function IndexCategoria({orden, nombre,urlImagen,urlCategoria}){
    const idConcatenado = "index_cat"+orden;
    const navigate = useNavigate();
    const irCategoria = () => {navigate(urlCategoria); window.scrollTo(0, 0);}

    return (
        <div className="index_main_Categorias_Contenedor_item" id={idConcatenado} onClick={irCategoria}>
            <h2 className="index_cat_titulo">{nombre}</h2>
            <img className="index_cat_imagen" src={urlImagen} alt={nombre}/>
        </div>
    );
}