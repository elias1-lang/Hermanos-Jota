import React from 'react';
import IndexPrincipalesCategorias from '../components/index/IndexPrincipalesCategorias';
import IndexProductosDestacados from '../components/index/IndexProductosDestacados';
import HeroBanner from '../components/index/HeroBanner';
import style_index from "../styles/styles-index.css";

export default function Index({ estadoMenu }){
    if(estadoMenu) return null;

    return (
        <div className="base_main_envoltorio">
                <HeroBanner />
                <IndexPrincipalesCategorias />
                <IndexProductosDestacados />
        </div>  
    );
}