import React, { useState } from "react";

function UserProfile({endpoint,actualizarPagina}){
    const [user, setUser] = useState({
            username: "", email: ""
    });
    
    React.useEffect(() => {
        fetchUserProfile();
    }, []);
    
    const fetchUserProfile = async () => {
        try {
            // 1. Obtenemos el token guardado
            const token = localStorage.getItem('authToken');
        
            if (!token) {
            // Manejar el caso en que no hay token (ej: redirigir a login)
            console.error("No se encontró token de autenticación.");
            return;
            }
        
            // 2. Hacemos la petición, añadiendo el encabezado 'Authorization'
            const response = await fetch('/api/users/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // 3. ¡Aquí enviamos el token!
            },
            });
        
            if (!response.ok) {
            throw new Error('No se pudo acceder al perfil.');
            }
        
            const profileData = await response.json();
            console.log(profileData);
        
        } catch (error) {
            console.error(error);
        }
};

    return(
        <>
            <div>
                <h2>Perfil de Usuario</h2>
                <p>Nombre de usuario: {user.username}</p>
                <p>Email: {user.email}</p>
            </div>
        </>
    );
}