import React, { useEffect, useState } from "react";
import FormImputText from "./FormInputText";


export default function FormSetUserPassword({handlePost}){

    const formData = {newName:"", newEmail:"", newUsername:"", newRole:"", newPassword:""};
    const [estatusPassword, setStatusPassword] = useState("");    
    const [enableSend, setEnableSend] = useState(notEmptyString(estatusPassword));

    const manejadorCambios = (e) => {
        //const {name,value} = e.target;
        //setFormData(estadoPrevio=>({...estadoPrevio,[name]:value}));        
        setStatusPassword(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !enableSend) {
            e.preventDefault(); // bloquea el submit
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!enableSend){
            alert("Completa todos los campos correctamente");
            return;
        }
        formData.newPassword = estatusPassword;
        handlePost(formData);
        setStatusPassword("");
    }

    useEffect(() => {
            setEnableSend(notEmptyString(estatusPassword));
    }, [estatusPassword]);

    return(
        <>
            <form onSubmit={handleSubmit} className="carga-form Predefect_Width_80" autoComplete="off">
                <fieldset>
                    <legend>Asignación de Contraseña</legend>
                    <FormImputText nameLabel={"Contraseña"} nameCampo={"newPassword"} onChange={manejadorCambios} tipo={"password"} value={estatusPassword} statusValid={notEmptyString(estatusPassword)} onKeyDown={handleKeyDown}/>
                </fieldset>
                <button type="submit" disabled={!enableSend} className={enableSend?"carga-submit":"carga-submit Disable_Submit_button"}>Establecer Contraseña</button>
            </form>
        </>
    );
}

const notEmptyString = (string) =>{
    return (string && string.trim().length !== 0);
}