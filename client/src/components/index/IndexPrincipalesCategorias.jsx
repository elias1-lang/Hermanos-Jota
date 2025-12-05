import React, { useState, useEffect } from 'react';
import IndexCategoria from './IndexCategoria';
import URL_BASE from '../../config/api';

export default function IndexPrincipalesCategorias({categorias}){
    
    return (
        <div className="index_main_divInfo" id="index_main_Categorias">
            <h2>PRINCIPALES CATEGORIAS</h2>
                <div className="index_main_Categorias_Contenedor">
                    {
                        categorias.map((cat) => (
                            <IndexCategoria 
                                key={cat._id}
                                orden={cat.orden}
                                nombre={cat.nombre}
                                urlImagen={cat.imageUrl}
                                urlCategoria={cat.catUrl}
                            />
                        ))
                    }
                </div>
        </div>
    );
}