import React from 'react';
import Catalogo from "../components/index/Catalogo";
import productos from "../data/archivoProductos"; 
import { addCarrito } from '../utils/carritoFunciones';

export default function PaginaCatalogo() {
    return (
        <React.Fragment>
            <Catalogo productos={productos} loading={false} funcionAgregar={addCarrito}/>
        </React.Fragment>
    );
}





