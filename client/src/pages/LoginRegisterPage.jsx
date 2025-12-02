import React from "react";
import FormRegistro from "../components/registro/FormRegistro";
import FormLogin from "../components/registro/FormLogin";

export default function LoginRegisterPage({typeForm="register", onLoginSuccess}){
    return(
        <>
        {typeForm=="login"?
            <FormLogin
            />
        :
            <FormRegistro
            />
        }
        </>
    );
}