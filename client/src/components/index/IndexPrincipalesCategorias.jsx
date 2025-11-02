import React, { useState, useEffect } from 'react';
import IndexCategoria from './IndexCategoria';
import URL_BASE from '../../config/api';

export default function IndexPrincipalesCategorias(){

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [categorias, setCategorias] = React.useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(`${URL_BASE}/categorias`);
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías');
                }
                const data = await response.json();
                setCategorias(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategorias();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }
    if (loading) {
        return <p>Cargando categorías...</p>;
    }

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