import React, { useState } from "react";

function FormRegistro({endpoint,actualizarPagina}){
    const [formData, setFormData] = useState({
        username: "", email: "", password: ""
    });
    
    // const manejadorCambios = (e) => {
    //     const {name,value} = e.target;
    //     setFormData(estadoPrevio =>());
    // };

    
    const manejadorEnvio = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/users/register', { // Apunta a tu endpoint de backend
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
    } catch (error) {
        alert(error.message);
    }
};

    return(
        <>
            <form className="carga-form" onSubmit={manejadorEnvio}>    
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

export default FormRegistro;