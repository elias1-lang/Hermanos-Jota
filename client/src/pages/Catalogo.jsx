import React, { useEffect, useState } from 'react';
import Catalogo from "../components/index/Catalogo";
import URL_BASE from '../config/api';
import { fetchStateFuncion } from '../utils/fetchFunciones';

export default function PaginaCatalogo() {

    const [catalogo, setCatalogo] = useState([]);
    const [errorState,setErrorState] = useState("");

    useEffect(()=>{
        fetchStateFuncion(`${URL_BASE}/productos`,setCatalogo,setErrorState,"Error en la recuperación del catalogo.");
    }, []);

    const mostrarCatalogo = ()=>{
        return(
            <Catalogo productosArray={catalogo} loading={false}/>
        );
    }

    return (
        <React.Fragment>
            {errorState?errorState:catalogo.length?mostrarCatalogo():"Cargando productos..."}
        </React.Fragment>
    );
}





