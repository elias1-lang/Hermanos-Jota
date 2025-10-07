import React from 'react';
import IndexCategoria from './IndexCategoria';
import principalesCategorias from '../../data/principalesCategorias.js';


export default function IndexPrincipalesCategorias(){

    return (
        
        <div className="index_main_divInfo" id="index_main_Categorias">
            <h2>PRINCIPALES CATEGORIAS</h2>
                <div className="index_main_Categorias_Contenedor">
                    {
                        principalesCategorias.map( cat => (
                            <IndexCategoria 
                                key={cat.orden}
                                orden={cat.orden}
                                nombre={cat.nombre}
                                urlImagen={cat.urlImagen}
                                urlCategoria={cat.urlCat}
                            />
                        ))
                    }
                </div>
        </div>
    );
}