import React, { useState } from "react";

function FormLogin({endpoint,actualizarPagina}){
    const [formData, setFormData] = useState({
        username: "", email: "", password: ""
    });
    
    // const manejadorCambios = (e) => {
    //     const {name,value} = e.target;
    //     setFormData(estadoPrevio =>());
    // };

    
    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // formData contiene { email, password }
    });
 
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
 
    // ¡Éxito! Aquí recibimos el token desde el backend.
    console.log('Login exitoso, token:', data.token);
    localStorage.setItem('authToken', data.token); // Guardamos el token
    props.onLoginSuccess(data.user); // Actualizamos el estado de App.js

    // El siguiente paso es guardar este token en el cliente.
 
  } catch (error) {
    alert(`Error en el login: ${error.message}`);
  }
};

    return(
        <>
            <form className="carga-form" onSubmit={handleSubmit}>    
                <fieldset>
                    <legend>Cargue una Categoria Nueva</legend>
                    <div>
                        <FormImputText
                            nameCampo={"nombre"}
                            nameLabel={"Escriba el nombre de la Categoria"}
                            onChange={manejadorCambios}
                            value={formData.nombre}
                        />
                    </div>
                    <button type="submit" className="carga-submit">Cargar Categoria</button>
                </fieldset>
            </form>
        </>
    );
}

export default FormLogin;