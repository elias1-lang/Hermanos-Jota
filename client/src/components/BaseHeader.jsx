import React,{useState} from "react";
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

export default function BaseHeader({cambiarEstado, estadoMenu, cantidadElementosCarrito,cambiarEstadoCarrito}){
    const [busqueda,setBusqueda] = useState('');
    const navigate = useNavigate();

    const manejadorBusqueda = (e)=>{
        e.preventDefault();
        const termino = busqueda.trim().toLowerCase();
        if(termino){
            setBusqueda("");
            navigate(`/catalogo/a/${termino}`);
        }
    }

if(estadoMenu) return null; //Si el menu esta abierto, que no renderice nada
const [inicio, catalogo, nosotros, contacto, faq] = ["/","/catalogo","/nosotros","/contacto","/faq"];
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
                    <div className="base_carrito_img_div">
                        <img src={carritoIco} alt="Carrito de compras" />
                        {/*El contador debe ser un componente que se implementa con localstoragge y se calcula por cada renderizado*/}
                        { Boolean(cantidadElementosCarrito) && <p id="carrito-contador">{cantidadElementosCarrito>99?"99+":cantidadElementosCarrito}</p>}
                    </div>
                </div>
            </div>

            <div className="base_barraBusqueda">
                <input type="text" placeholder="Buscar" id="header_barra_busq" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)}/>
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
                </ul>
            </nav>
        </div>
    </header>
    );

}

