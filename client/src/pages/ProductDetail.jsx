import React,{ use, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";
import BaseMenu from "../components/BaseMenu";
import ProductoContenido from "../components/producto/ProductoContenido";
import ProductoModalImg from "../components/producto/ProductoModalImg";
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
            
            <BaseMenu 
                estadoMenu={estadoMenu}
                cambiarEstado={cambiarEstado}
            />
            <BaseHeader 
                cambiarEstado={cambiarEstado}
                estadoMenu={estadoMenu}
            />

            <ProductoContenido id={id} />
            
            <ProductoOtrosDestacados id={id} />
            <ProductoOtrasCategorias />
            
            <BaseFooter 
                estadoMenu={estadoMenu}
            />

        </React.Fragment>
    );
}
export default ProductDetail;