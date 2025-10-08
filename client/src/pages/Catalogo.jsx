import React from 'react';
import Catalogo from "../components/index/Catalogo";
import productos from "../data/archivoProductos"; 

export default function PaginaCatalogo({funcionAgregar}) {
    return (
        <React.Fragment>
            <Catalogo productosArray={productos} loading={false} funcionAgregar={funcionAgregar}/>
        </React.Fragment>
    );
}





