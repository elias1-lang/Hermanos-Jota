function configuracionesMenu(habilitacion){
            const selectorMenuHamb = document.querySelector(".menu_hamb");
            const selectorHeader = document.querySelector("header");
            const selectorFooter = document.querySelector("footer");
            const selectorContenido = document.querySelector(".base_main_envoltorio");

            if(habilitacion){
                selectorMenuHamb.classList.remove("menu_hamb_disable");
                selectorHeader.classList.add("disable_content");
                selectorFooter.classList.add("disable_content");
                selectorContenido.classList.add("disable_content");  
                return 1;
            }
            
            selectorMenuHamb.classList.add("menu_hamb_disable");
            selectorHeader.classList.remove("disable_content");
            selectorFooter.classList.remove("disable_content");
            selectorContenido.classList.remove("disable_content");
            return 1;
        }

        const selectorMenuBoton = document.querySelector(".base_menu");
        const selectorMenuDisable = document.querySelector(".menu_hamb_disable_bot");

        selectorMenuBoton.addEventListener('click', ()=>{configuracionesMenu(1)});
        selectorMenuDisable.addEventListener('click',()=>{configuracionesMenu(0)});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    
    const campos = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        mensaje: document.getElementById('mensaje')
    };

    campos.nombre.addEventListener('blur', () => validarCampo('nombre'));
    campos.email.addEventListener('blur', () => validarCampo('email'));
    campos.mensaje.addEventListener('blur', () => validarCampo('mensaje'));
    
    campos.nombre.addEventListener('input', () => limpiarError('nombre'));
    campos.email.addEventListener('input', () => limpiarError('email'));
    campos.mensaje.addEventListener('input', () => limpiarError('mensaje'));

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            simularEnvioFormulario();
        }
    });

    function validarFormulario() {
        let valido = true;
        
        valido = validarCampo('nombre') && valido;
        valido = validarCampo('email') && valido;
        valido = validarCampo('mensaje') && valido;
        
        return valido;
    }

    function validarCampo(campo) {
        const valor = campos[campo].value.trim();
        let valido = true;
        let mensajeError = '';

        switch(campo) {
            case 'nombre':
                if (valor.length < 2) {
                    mensajeError = 'El nombre debe tener al menos 2 caracteres';
                    valido = false;
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                    mensajeError = 'El nombre solo puede contener letras y espacios';
                    valido = false;
                }
                break;
                
            case 'email':
                if (!valor.includes('@') || !valor.includes('.')) {
                    mensajeError = 'Ingrese un email válido (ej: usuario@dominio.com)';
                    valido = false;
                }
                break;
                
            case 'mensaje':
                if (valor.length < 10) {
                    mensajeError = 'El mensaje debe tener al menos 10 caracteres';
                    valido = false;
                } else if (valor.length > 500) {
                    mensajeError = 'El mensaje no puede exceder los 500 caracteres';
                    valido = false;
                }
                break;
        }

        if (!valido) {
            mostrarError(campo, mensajeError);
        } else {
            limpiarError(campo);
        }

        return valido;
    }

    function mostrarError(campo, mensaje) {
        const errorElement = document.getElementById(`error-${campo}`);
        if (errorElement) {
            errorElement.textContent = mensaje;
            campos[campo].style.borderColor = '#dc3545';
        }
    }

    function limpiarError(campo) {
        const errorElement = document.getElementById(`error-${campo}`);
        if (errorElement) {
            errorElement.textContent = '';
            campos[campo].style.borderColor = '#e2e2e2';
        }
    }

    function simularEnvioFormulario() {
        const botonEnviar = formulario.querySelector('.boton-enviar');
        const textoOriginal = botonEnviar.querySelector('span').textContent;
        
        botonEnviar.disabled = true;
        botonEnviar.querySelector('span').textContent = 'Enviando...';
        botonEnviar.style.opacity = '0.7';
        
        setTimeout(() => {
            mostrarNotificacionExito();
            formulario.reset();
            setTimeout(() => {
                botonEnviar.disabled = false;
                botonEnviar.querySelector('span').textContent = textoOriginal;
                botonEnviar.style.opacity = '1';
            }, 2000);
            
        },2000);
    }
    function mostrarNotificacionExito() {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-exito';
        notificacion.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>Mensaje enviado con éxito! Te contactaremos pronto.</span>
            </div>
        `;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.classList.add('saliendo');
                    setTimeout(() => {
                        if (notificacion.parentNode) {
                            document.body.removeChild(notificacion);
                        }
                    }, 300);
            }
        }, 5000);
    }
})