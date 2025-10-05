import react from "react";
import IndexPrincipalesCategorias from "./IndexPrincipalesCategorias";
import IndexProductosDestacados from "./IndexProductosDestacados";

import HeroBanner from "./HeroBanner";
import style_index from "../../styles/styles-index.css";

export default function Index_Main({estadoMenu}){
if(estadoMenu) return null; //Si el menu esta abierto, que no renderice nada

    return (
        <div className="base_main_envoltorio">
            <main>
                <HeroBanner />
                <IndexPrincipalesCategorias />
                <IndexProductosDestacados />
            </main>
        </div>  
    );
}
