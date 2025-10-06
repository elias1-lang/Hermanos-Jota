import React,{ use, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";
import BaseMenu from "../components/BaseMenu";
import ProductoContenido from "../components/producto/ProductoContenido";
import ProductoOtrosDestacados from "../components/producto/ProductoOtrosDestacados";
import ProductoOtrasCategorias from "../components/producto/ProductoOtrasCategorias";

import '../styles/producto.css';

function ProductDetail({funcionAgregar}){
    const [estadoMenu, setEstadoMenu] = useState(false);
    const cambiarEstado = () => {setEstadoMenu(!estadoMenu)};

    const params = useParams();
    const id = params.id; // obtengo id de producto desde URL

    return (
        <React.Fragment>

            <ProductoContenido id={id} funcionAgregar={funcionAgregar}/>
            
            <ProductoOtrosDestacados id={id} />
            <ProductoOtrasCategorias />
            
        </React.Fragment>
    );
}
export default ProductDetail;