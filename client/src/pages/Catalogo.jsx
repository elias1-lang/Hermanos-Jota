import React, { useEffect, useState } from 'react';
import Catalogo from "../components/index/Catalogo";

export default function PaginaCatalogo({funcionAgregar}) {

    const [catalogo, setCatalogo] = useState([]);

    const getProductos = async () => {
        const response = await fetch("/api/productos");
        const data = await response.json(); //transforma de json a objeto
        setCatalogo(data);
    }

    useEffect(()=>{
        getProductos();
    }, []);

    const mostrarCatalogo = ()=>{
        return(
            <Catalogo productosArray={catalogo} loading={false} funcionAgregar={funcionAgregar}/>
        );
    }

    return (
        <React.Fragment>
            {catalogo.length?mostrarCatalogo():"Cargando productos..."}
        </React.Fragment>
    );
}





