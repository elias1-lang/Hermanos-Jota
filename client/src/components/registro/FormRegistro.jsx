import React, { useEffect, useState } from "react";
import FormImputText from "../carga/FormInputText"
import URL_BASE from "../../config/api";
import { useNavigate } from "react-router-dom";

function FormRegistro({}){
    const [formData, setFormData] = useState({name:"", username: "", email: "", password: ""});
    const [enableSend, setEnableSend] = useState(false);
    const APIURLRegister = `${URL_BASE}/users/register`;
    
    const manejadorCambios = (e) => {
        const {name,value} = e.target;
        setFormData(estadoPrevio => ({...estadoPrevio,[name]:value}));
     };

     const handleKeyDown = (e) => {
        if(e.key === "enter" && !enableSend){
            e.preventDefault();
        }
     }

     useEffect(()=>{
        setEnableSend(notEmptyString(formData.name)&&notEmptyString(formData.email)&&notEmptyString(formData.username)&&notEmptyString(formData.password));
     },[formData]);
    
     const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(APIURLRegister, { // Apunta a tu endpoint de backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el registro');
        };
        const data = await response.json();
        alert("Registro exitoso.");
        setFormData({name:"", username: "", email: "", password: ""});
        navigate("/login");
    } catch (error) {
        alert(error.message);
    }
};

    return(
        <>
            <form className="carga-form" onSubmit={handleSubmit}>    
                <fieldset>
                    <legend>Regístrese</legend>
                        <FormImputText
                            nameCampo={"name"}
                            nameLabel={"Ingrese un nombre"}
                            onChange={manejadorCambios}
                            value={formData.name}
                            statusValid={notEmptyString(formData.name)}
                            onKeyDown={handleKeyDown}
                        />

                        <FormImputText
                            nameCampo={"email"}
                            nameLabel={"Ingrese un correo electronico"}
                            onChange={manejadorCambios}
                            value={formData.email}
                            statusValid={notEmptyString(formData.email)}
                            onKeyDown={handleKeyDown}
                        />

                        <FormImputText
                            nameCampo={"username"}
                            nameLabel={"Ingrese un nombre de usuario"}
                            onChange={manejadorCambios}
                            value={formData.username}
                            statusValid={notEmptyString(formData.username)}
                            onKeyDown={handleKeyDown}
                        />

                        <FormImputText
                            nameCampo={"password"}
                            nameLabel={"Ingrese una contraseña"}
                            onChange={manejadorCambios}
                            value={formData.password}
                            tipo={"password"}
                            statusValid={notEmptyString(formData.password)}
                            onKeyDown={handleKeyDown}
                        />

                </fieldset>
                <button type="submit" disabled={!enableSend} className={enableSend?"carga-submit":"carga-submit Disable_Submit_button"}>Registrarse</button>
            </form>
        </>
    );
}

export default FormRegistro;

const notEmptyString = (string) =>{
    return (string && string.trim().length !== 0);
}