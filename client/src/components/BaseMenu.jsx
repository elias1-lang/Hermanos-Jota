import react from "react";
import stylesbase from "../styles/base/styles-base.css";


export default function BaseMenu(){
    const [inicio, catalogo, nosotros, contacto, faq] = ["#","#","#","#","#"];
    return (
        <section className="menu_hamb menu_hamb_disable">
         <div className="menu_hamb_div_botones">
             <button className="menu_hamb_disable_bot">X</button>
         </div>
        <nav className="menu_hamb_nav">
            <ul>
                <li><a href={inicio}>Inicio</a></li>
                <li><a href={catalogo}>Catálogo</a></li>
                <li><a href={nosotros}>Nosotros</a></li>
                <li><a href={contacto}>Contacto</a></li>
                <li><a href={faq}>FAQ</a></li>
            </ul>
        </nav>
    </section>
    );
}
