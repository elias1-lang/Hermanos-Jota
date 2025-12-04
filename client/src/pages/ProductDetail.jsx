import React,{ use, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductoContenido from "../components/producto/ProductoContenido";
import ProductoOtrosDestacados from "../components/producto/ProductoOtrosDestacados";
import ProductoOtrasCategorias from "../components/producto/ProductoOtrasCategorias";

import '../styles/producto.css';

function ProductDetail(){
    const [estadoMenu, setEstadoMenu] = useState(false);
    const cambiarEstado = () => {setEstadoMenu(!estadoMenu)};

    const params = useParams();
    const id = params.id; // obtengo id de producto desde URL

    return (
        <React.Fragment>

            <ProductoContenido id={id} />
            
            <ProductoOtrosDestacados id={id} />
            <ProductoOtrasCategorias />
            
        </React.Fragment>
    );
}
export default ProductDetail;