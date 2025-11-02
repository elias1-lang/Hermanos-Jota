import React, { useState } from "react";
import FormImputText from "./FormInputText";

function FormCategoria({endpoint}){
    const [formData, setFormData] = useState({
        nombre:""
    });

    const manejadorCambios = (e) => {
        const {name,value} = e.target;
        setFormData(estadoPrevio =>({...formData,[name]:value}));
    };

    const validarNombre = (name) => {
        if(!name.trim().length){
            throw new Error("El nombre de la categoria no puede ser nulo.");
        }
    };

    const manejadorEnvio = async (event) => {
        try {
            validarNombre(formData.nombre);
            
            const response = await fetch(endpoint, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if(!response.ok){
                throw new Error("La carga de la categoria falló.");
            }
            //const result = await response.json(); //el endpoint retorna res.status().send(...), no json, daria error esta conversión
            
            alert("Se cargo la nueva categoria: " + formData.nombre);
            setFormData({nombre:""});
        } catch (error) {
            alert(error.message);
        }
    };

    return(
        <>
            <form onSubmit={manejadorEnvio}>    
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
                    <button type="submit">Cargar Categoria</button>
                </fieldset>
            </form>
        </>
    );
}

export default FormCategoria;