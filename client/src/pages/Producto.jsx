import React,{ useState } from 'react';

import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";
import BaseMenu from "../components/BaseMenu";
import ProductoContenido from "../components/producto/ProductoContenido";
import ProductoModalImg from "../components/producto/ProductoModalImg";
import ProductoOtrosDestacados from "../components/producto/ProductoOtrosDestacados";
import ProductoOtrasCategorias from "../components/producto/ProductoOtrasCategorias";

function Producto(){
    const [estadoMenu, setEstadoMenu] = useState(false);
        const cambiarEstado = () => {setEstadoMenu(!estadoMenu)};
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
                
                <ProductoContenido />
                <ProductoModalImg />
                <ProductoOtrosDestacados />
                <ProductoOtrasCategorias />
                
                <BaseFooter 
                    estadoMenu={estadoMenu}
                />

            </React.Fragment>
        );
    }
    export default Producto;