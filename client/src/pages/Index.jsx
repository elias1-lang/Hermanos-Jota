import React from 'react';
import IndexPrincipalesCategorias from '../components/index/IndexPrincipalesCategorias';
import IndexProductosDestacados from '../components/index/IndexProductosDestacados';
import HeroBanner from '../components/index/HeroBanner';
import "../styles/styles-index.css";

export default function Index({ estadoMenu }){
    if(estadoMenu) return null;

    return (
        <div className="index_main_envoltorio">
            <main className='indexMain'>
                <HeroBanner />
                <div className='indexMain_background_color'>
                    <IndexPrincipalesCategorias />
                    <IndexProductosDestacados />
                </div>
            </main>
        </div>  
    );
}