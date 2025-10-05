import react, { useState } from "react";
import stylesbase from "../styles/base/styles-base.css";
import {Link} from 'react-router-dom';


export default function BaseMenu({estadoMenu,cambiarEstado}){

    if(!estadoMenu) return null; //no renderiza la pagina directamente si el estado es null

    const [inicio, catalogo, nosotros, contacto, faq] = ["/","/catalogo","/nosotros","/contacto","/faq"];

    return (
        <section className="menu_hamb">
         <div className="menu_hamb_div_botones">
             <button onClick={cambiarEstado} className="menu_hamb_disable_bot" >X</button>
         </div>
        <nav className="menu_hamb_nav">
            <ul>
                <li><Link to={inicio}>Inicio</Link></li>
                <li><Link to={catalogo}>Catálogo</Link></li>
                <li><Link to={nosotros}>Nosotros</Link></li>
                <li><Link to={contacto}>Contacto</Link></li>
                <li><Link to={faq}>FAQ</Link></li>
            </ul>
        </nav>
    </section>
    );
}
