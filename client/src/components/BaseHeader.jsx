import React,{useContext, useState} from "react";
import {Link, Navigate, useNavigate} from 'react-router-dom';
    //Se importa Link, es analogo a <a> pero maneja mejor las direcciones dentro de react y no recarga la pagina por cada clic. Recordar que se trabaja sobre un solo archivo index.js que 
    //representa al componente App.js
        //adicionalmente, mantiene la memoria

import stylesbase from "../styles/base/styles-base.css";
//Imagenes que usara el sitio que no estan en la carpeta publica: 
import logoSitio from "../img/header-footer/logo.svg";
import menuIco from "../img/header-footer/list.svg";
import carritoIco from "../img/header-footer/cart.svg";
import botonbuscarIco from "../img/header-footer/search.svg";

import {addCarrito, cantidadElementosCarrito} from "../utils/carritoFunciones"
import { AuthContext } from "../context/AuthContext";

export default function BaseHeader({cambiarEstado, estadoMenu, cantidadElementosCarrito,cambiarEstadoCarrito}){
    const [busqueda,setBusqueda] = useState('');
    const navigate = useNavigate();
    const {currentUser, logout} = useContext(AuthContext);

    const manejadorTeclaEnter = (e) => {
        if(e.key === "Enter"){
            manejadorBusqueda(e);
        }
    };

    const manejadorBusqueda = (e) => {
        e.preventDefault();
        const termino = busqueda.trim().toLowerCase();
        if(termino){
            setBusqueda("");
            navigate(`/catalogo/a/${termino}`);
        }
    }


if(estadoMenu) return null; //Si el menu esta abierto, que no renderice nada
const [inicio, catalogo, nosotros, contacto, faq, carga] = ["/","/catalogo","/nosotros","/contacto","/faq","/admin/crear-producto"];
    return (
        <header>
        <div className="base_header_contenedor">
            <div className="base_menu" onClick={cambiarEstado}>
                <img src={menuIco} alt="Menu del sitio" />
            </div>

            <div className="base_logo">
                <Link to={inicio}><img src={logoSitio} alt="Logo del Sitio Web" /></Link>
            </div>

            <div className="base_carrito">
                <div className="base_carrito_content_grid">
                    <div className="base_carrito_img_div" onClick={cambiarEstadoCarrito}>
                        <img src={carritoIco} alt="Carrito de compras" />
                        {/*El contador debe ser un componente que se implementa con localstoragge y se calcula por cada renderizado*/}
                        { Boolean(cantidadElementosCarrito) && <p id="carrito-contador">{cantidadElementosCarrito>99?"99+":cantidadElementosCarrito}</p>}
                    </div>
                </div>
            </div>

            <div className="base_barraBusqueda">
                <input type="text" placeholder="Buscar" id="header_barra_busq" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} onKeyDown={manejadorTeclaEnter}/>
                <button id="header_bot_busq" onClick={manejadorBusqueda}>
                    <img src={botonbuscarIco} alt="Boton buscar" />
                </button>
            </div>

            <nav className="base_header_nav">
                <ul>
                    <li><Link to={inicio}>Inicio</Link></li>
                    <li><Link to={catalogo}>Catálogo</Link></li>
                    <li><Link to={nosotros}>Nosotros</Link></li>
                    <li><Link to={contacto}>Contacto</Link></li>
                    <li><Link to={faq}>FAQ</Link></li>
                    <li><Link to={carga}>Cargas</Link></li>
                    {currentUser ? (
                        <>
                        <li className="HEADER_LOGGED_LI_NAV">
                        <Link to="/profile" className="HEADER_LOGOUT_A">
                            <span className="HEADER_LOGOUT_SPAN">
                                Mi Perfil
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                            </span>
                         </Link>

                         <span onClick={logout} className="HEADER_LOGOUT_SPAN">
                                Salir
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>
                        </span>
                        </li>
                        </>
                    ) : (
                        <>
                        <li className="HEADER_LOGGED_LI_NAV">
                            <Link to="/login"><span className="HEADER_LOGOUT_SPAN">Iniciar</span></Link>
                            <Link to="/register"><span className="HEADER_LOGOUT_SPAN">Registrar</span></Link>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    </header>
    );

}

