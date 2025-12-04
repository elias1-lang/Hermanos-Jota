import React, { useEffect, useState } from "react";
import FormImputText from "./FormInputText";
import FormOption from "./FormOption";

export default function FormUser ({name="",email="",username="",role="",handlePost,enableSetPassword=true}){

    const [formData, setFormData] = useState({
        newName:  name||"",
        newEmail: email||"",
        newUsername: username||"",
        newRole: role||"",
        newPassword: ""
    });

    const [enableSend, setEnableSend] = useState(notEmptyString(formData.newName)&& notEmptyString(formData.newEmail)&&notEmptyString(formData.newUsername)&&notEmptyString(formData.newRole)&&(!enableSetPassword || notEmptyString(formData.newPassword)));
    
    useEffect(() => {
        setEnableSend(
            notEmptyString(formData.newName) &&
            notEmptyString(formData.newEmail) &&
            notEmptyString(formData.newUsername) &&
            notEmptyString(formData.newRole) &&
            (!enableSetPassword || notEmptyString(formData.newPassword))
        );
    }, [formData]);

    const manejadorCambios = (e) => {
        const {name,value} = e.target;
        setFormData(estadoPrevio=>({...estadoPrevio,[name]:value}));        
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !enableSend) {
            e.preventDefault(); // bloquea el submit
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!enableSend) {
            alert("Completa todos los campos correctamente");
            return;
        }
        setFormData({newName:"", newEmail: "", newUsername: "", newRole: ""});
        handlePost(formData);
    };

    return(
        <>
            <form onSubmit={handleSubmit} className="carga-form Predefect_Width_80">
                <fieldset>
                    <legend>Información del Usuario</legend>
                    <FormImputText nameLabel={"Nombre del Usuario"} nameCampo={"newName"} onChange={manejadorCambios} value={formData.newName} statusValid={notEmptyString(formData.newName)} onKeyDown={handleKeyDown}/>
                    <FormImputText nameLabel={"Email del Usuario"} nameCampo={"newEmail"} onChange={manejadorCambios} value={formData.newEmail} statusValid={notEmptyString(formData.newEmail)} onKeyDown={handleKeyDown}/>
                    <FormImputText nameLabel={"Nombre de Usuario"} nameCampo={"newUsername"} onChange={manejadorCambios} value={formData.newUsername} statusValid={notEmptyString(formData.newUsername)} onKeyDown={handleKeyDown}/>

                    <label htmlFor="newRole">Rol del Usuario</label>
                    <br/>
                    <select name="newRole" id="newRole" onChange={manejadorCambios} value={formData.newRole} className={!notEmptyString(formData.newRole)?"FORM_IMPUT_INVALID":""}>
                        <FormOption valueCampo={""} nameOption={"Selecciona un Rol"} selected={true} disabled={true}/>
                        <FormOption valueCampo={"user"} nameOption={"user"} selected={""} disabled={""}/>
                        <FormOption valueCampo={"admin"} nameOption={"admin"} selected={""} disabled={""}/>
                        <FormOption valueCampo={"editor"} nameOption={"editor"} selected={""} disabled={""}/>
                    </select>    
                    {enableSetPassword &&
                    <FormImputText nameLabel={"Contraseña"} nameCampo={"newPassword"} onChange={manejadorCambios} tipo={"password"} value={formData.newPassword} statusValid={notEmptyString(formData.newPassword)} onKeyDown={handleKeyDown}/>
                    }

                </fieldset>
                <button type="submit" disabled={!enableSend} className={enableSend?"carga-submit":"carga-submit Disable_Submit_button"}>Cargar Usuario</button>
            </form>
        </>
    );
}

const notEmptyString = (string) =>{
    return (string && string.trim().length !== 0);
}

