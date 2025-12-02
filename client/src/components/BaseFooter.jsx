import react from "react";
import stylesbase from "../styles/base/styles-base.css";
import {Link} from 'react-router-dom';
    //Se importa Link, es analogo a <a> pero maneja mejor las direcciones dentro de react y no recarga la pagina por cada clic. Recordar que se trabaja sobre un solo archivo index.js que 
    //representa al componente App.js
        //adicionalmente, mantiene la memoria

//Imagenes que usara el sitio que no estan en la carpeta publica: 
import logoSitio from "../img/header-footer/logo.svg";
import ubicacionIco from "../img/header-footer/location-dot-solid-full.svg";
import instagramIco from "../img/header-footer/instagram-brands-solid-full.svg";
import telefonoIco from "../img/header-footer/phone-solid-full.svg";
import relojIco from "../img/header-footer/clock-solid-full.svg";
import correoIco from "../img/header-footer/envelope-solid-full.svg";


export default function BaseFooter({}){

    const [inicio, catalogo, nosotros, contacto, faq, carga] = ["/","/catalogo","/nosotros","/contacto","/faq","/admin/crear-producto"];
    const [enviosDevoluciones, formasPago, terminosCondiciones, garantiasUso] = ["/faq#envios","/faq#pagos","/faq#terminos","/faq#garantias"];


    return (
        <footer>
            <div className="base_footer_contenedor">
                <div className="base_footer_logo">
                    <img src={logoSitio} alt="Logo del sitio web" />
                </div>


                <div className="base_footer_infoPagina">
                    <div className="base_footer_infoElem">
                        <h2>Hermanos Jota</h2>
                        <p>Es el redescubrimiento de un arte olvidado: crear muebles que no solo sirven una función, sino que alimentan el alma.</p>
                    </div>

                    <div className="base_footer_infoElem">
                        <h2>Navegación</h2>
                        <ul>
                            <li><Link to={inicio}>Inicio</Link></li>
                            <li><Link to={catalogo}>Catálogo</Link></li>
                            <li><Link to={nosotros}>Nosotros</Link></li>
                            <li><Link to={contacto}>Contacto</Link></li>
                            <li><Link to={faq}>FAQ</Link></li>
                            <li><Link to={carga}>Cargas</Link></li>
                        </ul>
                    </div>

                    <div className="base_footer_infoElem">
                        <h2>Contacto</h2>
                        <ul>
                            <li><img src={instagramIco} alt="Instagram del negocio" /><a
                                    href="https://alt-5a31a0302d72d.blackboard.com/bbcswebdav/pid-982156-dt-content-rid-14612411_1/courses/FSD.00-43441/Instagram%20copy/index.html?one_hash=6967BD068213D25797444EA0669D2F94&f_hash=6F6AD1194D5FD4C6A0D0771CCCB68860">
                                @hermanosjota_ba
                                </a>
                            </li>
                            <li><img src={telefonoIco} alt="Numero de Telefono" />+54 11 4567-8900</li>
                            <li> <img src={correoIco} alt="Email de contacto" />info@hermanosjota.com.ar</li>
                            <li> <img src={correoIco} alt="Email de contacto" />ventas@hermanosjota.com.ar</li>
                        </ul>
                    </div>


                    <div className="base_footer_infoElem">
                        <h2>Dónde encontrarnos</h2>
                            <ul>
                                <li>
                                    <img src={ubicacionIco} alt="Ubicacion del local" />Av. San Juan 2847,<br />San Cristóbal (C1232AAB),<br />CABA, Argentina
                                </li>

                                <li>
                                    <img src={relojIco} alt="Horario dias habiles" />Lunes a Viernes: 10 a 19hs
                                </li>
                                
                                <li>
                                    <img src={relojIco} alt="Horario sabados." />Sábados: 10 a 14hs
                                </li>
                            </ul>
                    </div>

                    <div className="base_footer_infoElem">
                        <h2>Información Adicional</h2>
                        <ul>
                            <li><Link to={enviosDevoluciones}>Envíos y Devoluciones</Link></li>
                            <li><Link to={formasPago}>Formas de Pago</Link></li>
                            <li><Link to={terminosCondiciones}>Términos y Condiciones</Link></li>
                            <li><Link to={garantiasUso}>Garantias de Servicio</Link></li>
                        </ul>
                    </div>
                </div>


                <div className="base_footer_infoDesarrollo">
                    <p>©2025 Mueblería Hermanos Jota. Todos los derechos reservados. | Diseñado por grupo 12</p>
                </div> 
            
            </div>
        </footer>
    );
}
