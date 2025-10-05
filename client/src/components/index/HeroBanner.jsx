//import react from "react";
import { useNavigate } from 'react-router-dom';
import heroBannerImg from "../../img/herobanner/unsplash_spacejoy.jpg"
//import style_index from "../../styles/styles-index.css";

export default function HeroBanner(){

    const navigate = useNavigate();
    const irCatalogo = ()=>{
        navigate('/catalogo');
    };

    return (
        <div className="index_heroBanner_div">
            <img src={heroBannerImg} alt="Imagen de salon decorado con sillones y cuadros" />
            <div className="index_heroBanner_divTexto"> 
                <h1>Los Hermanos Jota</h1>
                <p> Mas de tres décadas dando forma al diseño: madera, tradición y estilo contemporáneo en cada pieza.
                    <br />
                    Diseñamos más que muebles: creamos escenarios para tu vida.
                </p>
                    <button onClick={irCatalogo}>Ver Catálogo</button>
                </div>
        </div>
    );
}