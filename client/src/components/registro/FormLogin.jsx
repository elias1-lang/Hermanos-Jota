import React, { useEffect, useState } from "react";
import FormImputText from "../carga/FormInputText";
import URL_BASE from "../../config/api";
import { useNavigate } from "react-router-dom";

function FormLogin({onLoginSuccess}){
    const [formData, setFormData] = useState({email: "", password: ""});
    const [enableSend, setEnableSend] = useState(notEmptyString(formData.email)&&notEmptyString(formData.password));
    const APIURLLogin = `${URL_BASE}/users/login`;
    const manejadorCambios = (e) => {
        const {name,value} = e.target;
        setFormData(estadoPrevio =>({...estadoPrevio,[name]:value}));
    };

    const handleKeyDown = (e) => { //si es invalido, que no se pueda enviar en formulario con un enter
        if(e.key === "entrer" && !enableSend){
            e.preventDefault();
        }
    }

    useEffect(()=>{ //para cambiar el color del boton con cada cambio en el formulario
        setEnableSend(notEmptyString(formData.email)&&notEmptyString(formData.password));
    },[formData]);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(APIURLLogin, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // formData contiene { email, password }
            });
        
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
        
            // ¡Éxito! Aquí recibimos el token desde el backend.
            console.log('Login exitoso, token:', data.token);
            setFormData({email: "", password: ""});
            onLoginSuccess(data.token); // Actualizamos el estado de App.js -> onLoginSuccess es una funcion del contexto de decodifica el payload y lo asigna a un estado global
            navigate("/");
            // El siguiente paso es guardar este token en el cliente. e ir a la pagina de perfil
        
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };


    return(
        <>
            <form className="carga-form" onSubmit={handleSubmit}>    
                <fieldset>
                    <legend>Iniciar Sesion</legend>

                        <FormImputText
                            nameCampo={"email"}
                            nameLabel={"Ingrese su correo electronico"}
                            onChange={manejadorCambios}
                            value={formData.email}
                            statusValid={notEmptyString(formData.email)}
                            onKeyDown={handleKeyDown}

                        />

                        <FormImputText
                            nameCampo={"password"}
                            tipo={"password"}
                            nameLabel={"Ingrese su contraseña"}
                            onChange={manejadorCambios}
                            value={formData.password}
                            statusValid={notEmptyString(formData.password)}
                            onKeyDown={handleKeyDown}
                        />
                </fieldset>
                    <button type="submit" disabled={!enableSend} className={enableSend?"carga-submit":"carga-submit Disable_Submit_button"}>Iniciar Sesion</button>
            </form>
        </>
    );
}

export default FormLogin;

const notEmptyString = (string) =>{
    return (string && string.trim().length !== 0);
}