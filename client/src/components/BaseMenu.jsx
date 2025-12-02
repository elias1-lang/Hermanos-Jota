import react, { useContext, useState } from "react";
import stylesbase from "../styles/base/styles-base.css";
import {Link} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";


export default function BaseMenu({estadoMenu,cambiarEstado}){
 
    const [inicio, catalogo, nosotros, contacto, faq, carga] = ["/","/catalogo","/nosotros","/contacto","/faq","/admin/crear-producto"];
    
    const {currentUser, logout} = useContext(AuthContext);
    
    if(!estadoMenu) return null; //no renderiza la pagina directamente si el estado es null

    return (
        <section className="menu_hamb">
         <div className="menu_hamb_div_botones">
             <button onClick={cambiarEstado} className="menu_hamb_disable_bot" >X</button>
         </div>
        <nav className="menu_hamb_nav">
            <ul>
                <li onClick={cambiarEstado}><Link to={inicio}>Inicio</Link></li>
                <li onClick={cambiarEstado}><Link to={catalogo}>Catálogo</Link></li>
                <li onClick={cambiarEstado}><Link to={nosotros}>Nosotros</Link></li>
                <li onClick={cambiarEstado}><Link to={contacto}>Contacto</Link></li>
                <li onClick={cambiarEstado}><Link to={faq}>FAQ</Link></li>
                <li onClick={cambiarEstado}><Link to={carga}>Cargas</Link></li>
                 {currentUser ? (
                    <>
                    <li className="HEADER_LOGGED_LI_NAV">
                        <Link to="/profile">
                            <span className="HEADER_LOGOUT_SPAN" onClick={cambiarEstado}>
                                Mi Perfil
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                            </span>
                        </Link>

                        <span onClick={()=>{logout();cambiarEstado();}} className="HEADER_LOGOUT_SPAN">
                            Salir
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                            </svg>
                        </span>
                    </li>
                    </>
                ) : (
                    <>
                    <li className="HEADER_LOGGED_LI_NAV">
                        <Link to="/login"><span className="HEADER_LOGOUT_SPAN" onClick={cambiarEstado}>Iniciar</span></Link>
                        <Link to="/register"><span className="HEADER_LOGOUT_SPAN" onClick={cambiarEstado}>Registrar</span></Link>
                    </li>
                    </>
                )}


            </ul>
        </nav>
    </section>
    );
}
