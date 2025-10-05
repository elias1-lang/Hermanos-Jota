import React from 'react';
import "../../styles/nosotros.css";

export default function IndexNosotros() {
    return (
            <div className="contentInfo_Main">
                <section id="presentacion">
                    <h2>Hermanos Jota</h2>
                    <div className="nosotros-list">
                        <div className="nosotros-item">
                            <h3>¿Quiénes somos?</h3><p>
                                 Somos una empresa familiar que ha crecido junto a sus clientes, adaptándose a las tendencias del mercado sin perder la esencia artesanal que nos caracteriza.
                                Con más de 30 años de experiencia, ofrecemos soluciones integrales en mobiliario para hogares, oficinas, locales comerciales y proyectos personalizados.
                                En Mueblería Hermanos Jota, llevamos más de tres décadas dedicados a crear ambientes que combinan comodidad, diseño y calidad.
                                Desde nuestros inicios, nos hemos consolidado como una empresa referente en el rubro del mobiliario, gracias a nuestro compromiso con la excelencia, la innovación y la satisfacción de nuestros clientes.
                            </p>
                        </div>

                        <div className="nosotros-item">
                            <h3>Nuestra propuesta</h3>
                            <p>
                                - Diseño funcional y estético: Cada mueble está pensado para ser práctico, duradero y visualmente armonioso. <br />
                                - Materiales de calidad: Trabajamos con maderas seleccionadas, herrajes resistentes y acabados de primera. <br />
                                - Atención personalizada: Escuchamos a nuestros clientes y los asesoramos para encontrar la mejor solución para sus espacios. <br />
                                 - Fabricación a medida: Adaptamos cada diseño a las necesidades y gustos de nuestros clientes.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
    );
}
