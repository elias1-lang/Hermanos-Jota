import React, { useEffect, useState } from 'react';
import IndexPrincipalesCategorias from '../components/index/IndexPrincipalesCategorias';
import IndexProductosDestacados from '../components/index/IndexProductosDestacados';
import HeroBanner from '../components/index/HeroBanner';
import "../styles/styles-index.css";
import { fetchStateFuncion } from '../utils/fetchFunciones';
import URL_BASE from '../config/api';

export default function Index(){

    const [productosDestacados, setProductosDestacados] = useState([]);
    const [categoriasPrincipales, setCategoriasPrincipales] = useState([]);
    const [errorFetch, setErrorFetch] = useState("");

    const handleSetterProductosDestacados = (data) => {
        if(!data){throw new Error("No hay productos para mostrar");}
        const destacados = data.filter(p=>p.destacado == true);
        // if(!destacados || !destacados.length){throw new Error("No hay productos para mostrar");}
        setProductosDestacados(destacados.slice(0,4));
    };

    const obtenerProductosDestacado = () => {
        fetchStateFuncion(`${URL_BASE}/productos`,handleSetterProductosDestacados,setErrorFetch,"Error en la captura elementos.");
    }

    const obtenerCategoriasPrincipales = () => {
        fetchStateFuncion(`${URL_BASE}/categorias`,setCategoriasPrincipales,setErrorFetch,"Error en la captura elementos.");
    }

    useEffect(()=>{
        obtenerProductosDestacado();
        obtenerCategoriasPrincipales();
    },[]);


    return (
        <>
            <div className="index_main_envoltorio">
                <main className='indexMain'>
                    <HeroBanner />
                    {errorFetch?<p align="center">{errorFetch}</p>:
                        <div className='indexMain_background_color'>
                            {(categoriasPrincipales.length>4)&&<IndexPrincipalesCategorias categorias={categoriasPrincipales.slice(0,5)}/>}
                            {(productosDestacados.length>0)&&<IndexProductosDestacados productosDestacados={productosDestacados}/>}
                        </div>
                    }
                </main>
            </div>
        </>
    );
}

