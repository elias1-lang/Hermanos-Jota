import React, { useContext } from "react";
import FormRegistro from "../components/registro/FormRegistro";
import FormLogin from "../components/registro/FormLogin";
import { AuthContext } from "../context/AuthContext";

export default function LoginRegisterPage({typeForm="register"}){
    const { login } = useContext(AuthContext);
    return(
        <>
        {typeForm=="login"?
            <FormLogin
                onLoginSuccess={login}
            />
        :
            <FormRegistro
            />
        }
        </>
    );
}