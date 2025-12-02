import React,{ useState } from 'react';
import IndexPrincipalesCategorias from '../components/index/IndexPrincipalesCategorias';
import IndexProductosDestacados from '../components/index/IndexProductosDestacados';
import HeroBanner from '../components/index/HeroBanner';
import style_index from "../styles/styles-index.css";

export default function ContactoPruebaRutas({ onAgregar }){

    return (
        <div className="base_main_envoltorio">
            <main>
                <HeroBanner />
                <IndexPrincipalesCategorias />
                <IndexProductosDestacados 
                    funcionAgregar={onAgregar}
                />
            </main>
        </div>  
    );
}