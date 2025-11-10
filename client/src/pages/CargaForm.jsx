import React, { useEffect, useState } from "react";
import "../styles/styles-index.css";
import "../styles/form.css";
import FormProducto from "../components/carga/FormProducto";
import FormCategoria from "../components/carga/FormCategoria";
import URL_BASE from "../config/api";
import { fetchStateFuncion } from "../utils/fetchFunciones";

function CargaForm({ estadoMenu }){
    const [categoria, setCategoria] = useState([]);
    const [refrescarPagina, setrefrescarPagina] = useState(0);
    const [endpointProducto, endpointCategoria] = [`${URL_BASE}/productos/`,`${URL_BASE}/categorias/`];
    const [errorState,setErrorState] = useState("");
    
    const manejadorRefresco = ()=>{
        setrefrescarPagina(prevEstado => prevEstado + 1);
        categoria.splice(0, categoria.length); //borra todos los elementos existentes en el array de categorias.
    };
    
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
                <FormRegistro
                    endpoint={`${URL_BASE}/users/register`}
                    actualizarPagina={manejadorRefresco}
                />
            </>
        )
    }

    useEffect(()=>{
        fetchStateFuncion(`${URL_BASE}/categorias`,setCategoria,setErrorState,"Error al obtener las categorias de la base de datos.");
    }, [refrescarPagina]);
    
    if(estadoMenu) return null;

    return (
        <div className="index_main_envoltorio">
            <main className="indexMain">
                <div className="indexMain_background_color">
                    {errorState?errorState:categoria.length?mostrarFormularios():"Cargando..."}
                </div>
            </main>
        </div>
    );

}

export default CargaForm;