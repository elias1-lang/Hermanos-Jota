import React, { useEffect, useState } from "react";
import "../styles/styles-index.css";
import "../styles/form.css";
import FormProducto from "../components/carga/FormProducto";
import FormCategoria from "../components/carga/FormCategoria";
import URL_BASE from "../config/api";

function CargaForm({ estadoMenu }){
    const [categoria, setCategoria] = useState([]);
    const [refrescarPagina, setrefrescarPagina] = useState(0);
    const [endpointProducto, endpointCategoria] = [`${URL_BASE}/productos/`,`${URL_BASE}/categorias/`];
    
    const manejadorRefresco = ()=>{
        setrefrescarPagina(prevEstado => prevEstado + 1);
        categoria.splice(0, categoria.length); //borra todos los elementos existentes en el array de categorias.
    };

    const getCategorias = async () => {
        const response = await fetch(`${URL_BASE}/categorias`);
        const data = await response.json(); //transforma de json a objeto
        setCategoria(data);
    }

    const mostrarFormularios = () => {
        return(
            <>
                <FormProducto
                    endpoint={endpointProducto}
                    categorias={categoria}
                />
                <FormCategoria
                    endpoint={endpointCategoria}
                    actualizarPagina={manejadorRefresco}
                />
            </>
        )
    }

    useEffect(()=>{
        getCategorias();
    }, [refrescarPagina]);
    
    if(estadoMenu) return null;

    return (
        <div className="index_main_envoltorio">
            <main className="indexMain">
                <div className="indexMain_background_color">
                    {categoria.length?mostrarFormularios():"Cargando..."}
                </div>
            </main>
        </div>
    );

}

export default CargaForm;