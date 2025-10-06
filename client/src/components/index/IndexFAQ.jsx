import React from 'react';
import "../../styles/faq.css";

export default function IndexFAQ() {
    return (
        <div className="contentInfo_Main">
            <section id="faq">
                <h2>Preguntas Frecuentes</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h3>¿Cuánto tarda en llegar el pedido?</h3>
                        <p>
                            Los muebles tienen un tiempo de despacho al transporte de <strong>hasta 5 días hábiles.</strong>
                            Para mayor tranquilidad, Correo Argentino te enviará por mail un código de seguimiento para que puedas ver la trazabilidad completa de tu pedido.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>¿Puedo retirar mi pedido por fábrica?</h3>
                        <p>
                            ¡Sí! Seleccionando "Retiro en fábrica".
                            Una vez que te avisemos que tu pedido está listo, podés retirarlo sin costo por nuestra fábrica.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>¿Dónde puedo recibir mi pedido?</h3>
                        <p>
                            Realizamos <strong>envíos a todo el país.</strong>
                            Trabajamos con Correo Argentino para garantizar una entrega segura y eficiente.
                        </p>
                    </div>
                </div>
            </section>

            <section id="envios">
                <h2>Envíos y Devoluciones</h2>
                <p>
                    Realizamos <strong>envíos a todo el país</strong>. El tiempo de entrega varía según la ubicación y el producto seleccionado. <br />
                    El plazo de entrega contempla dos etapas:<br />
                    -<strong>5 días hábiles</strong> para el despacho del producto desde nuestra fábrica.<br />
                    -De <strong>5 a 7 días hábiles</strong>* adicionales correspondientes al traslado, según la localidad de destino y la planificación logística de la empresa de transporte. <br />
                    <em>*Mendoza, Córdoba, Tucumán, Neuquén, Ushuaia y Bahía Blanca hasta <strong>15 días hábiles.</strong></em> <br />
                    Si el producto no cumple con tus expectativas, puedes solicitar la <strong>devolución</strong> dentro de los 10 días hábiles posteriores a la recepción. Para iniciar un proceso de devolución, comunícate con nuestro equipo de atención al cliente.
                </p>
            </section>

            <section id="pagos">
                <h2>Formas de Pago</h2>
                <p>
                    Aceptamos pagos con <strong>tarjetas de crédito, débito, transferencias bancarias y Mercado Pago.</strong> <br />
                    También ofrecemos la posibilidad de abonar en <strong>cuotas sin interés</strong> con bancos seleccionados.<br />
                    Todos los pagos se procesan de forma segura.
                </p>
            </section>

            <section id="terminos">
                <h2>Términos y Condiciones</h2>
                <p>
                    Al realizar una compra en Mueblería Hermanos Jota, aceptas nuestros términos y condiciones. <br />
                    Los precios y promociones pueden variar sin previo aviso.<br />
                    Mueblería Hermanos Jota se reserva el derecho de repactar los plazos de entrega consignados.<br />
                    Para más información, consulta el documento completo de términos en nuestro sitio web.
                </p>
            </section>

            <section id="garantias">
                <h2>Garantías de Servicio</h2>
                <p>
                    Todos nuestros productos cuentan con <strong>garantía de fábrica</strong> por 12 meses.<br />
                    Si tu producto presenta algún defecto de fabricación, lo repararemos o reemplazaremos sin costo.<br />
                    La garantía no cubre daños por mal uso o desgaste natural.
                </p>
            </section>

            
        </div>

        
    );
}
