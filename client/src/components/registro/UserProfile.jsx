import React, { useContext, useEffect, useState } from "react";
import URL_BASE from "../../config/api";
import { AuthContext } from "../../context/AuthContext";

export default function UserProfile({estadoMenu}){

    const [errorProfile, setErrorProfile] = useState("Aguarde...");
    const [user, setUser] = useState({name:"" , username: "", email: "", role:""});
    const {currentUser} = useContext(AuthContext);

    const fetchUserProfile = async () => {
        try {
            // 1. Obtenemos el token guardado
            const token = localStorage.getItem('authToken');
        
            if (!token) {
                // Manejar el caso en que no hay token (ej: redirigir a login)
                console.error("No se encontró token de autenticación.");
                setErrorProfile("No se encontró token de autenticación.");
                return;
            }

            // 2. Hacemos la petición, añadiendo el encabezado 'Authorization'
            const response = await fetch(`${URL_BASE}/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // 3. ¡Aquí enviamos el token!
            },
            });
        
            if (!response.ok) {
                throw new Error('No se pudo acceder al perfil.');
                setErrorProfile("No se pudo acceder al perfil.");
            }
        
            const profileData = await response.json();
            setUser(profileData.user);
            setErrorProfile("");

        } catch (error) {
            console.error(error);
            setErrorProfile("Error en la recuperación del perfil.");
        }
    };
    
    useEffect(() => {
        fetchUserProfile();
    }, [errorProfile]);

    if(estadoMenu)return null;

    return(
        <>
            <div className="Tablero_Wrapper_Principal">
                <div className="Tablero_DIV_Info_API">
                    
                    {currentUser?
                        errorProfile?<p>{errorProfile}</p>:
                        <div className="Profile_Data_DIV">
                            <h2>Perfil de Usuario</h2>
                            <div className="Content_Data"><p className="Profile_Data_P_Header">Nombre</p><p className="Profile_Data_P_Data">{user.name}</p></div>
                            <div className="Content_Data"><p className="Profile_Data_P_Header">Nombre de Usuario</p><p className="Profile_Data_P_Data">{user.username}</p></div>
                            <div className="Content_Data"><p className="Profile_Data_P_Header">Correo Electrónico</p><p className="Profile_Data_P_Data">{user.email}</p></div>
                            <div className="Content_Data"><p className="Profile_Data_P_Header">Tipo de Usuario</p><p className="Profile_Data_P_Data">{user.role}</p></div>
                        </div>
                    :"SIN PERMISOS SUFICIENTES"
                    }
                </div>
            </div>
        </>
    );
}

