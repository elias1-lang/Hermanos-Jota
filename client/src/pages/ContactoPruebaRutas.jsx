import React,{ useState } from 'react';

import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";
import BaseMenu from "../components/BaseMenu";
import IndexMain from "../components/index/IndexMain";

export default function Index(){
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

            <BaseFooter 
                estadoMenu={estadoMenu}
            />
            
            <BaseFooter 
                estadoMenu={estadoMenu}
            />
        </React.Fragment>
    );
}