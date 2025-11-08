import React, { useState } from "react";
import FormImputText from "./FormInputText";
import { fetchPostFormularioFuncion } from "../../utils/fetchFunciones";

function FormCategoria({endpoint,actualizarPagina}){
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
        event.preventDefault();
        try {
            validarNombre(formData.nombre);
            await fetchPostFormularioFuncion(endpoint,formData,"La carga de la categoria falló.");
            alert("Se cargo la nueva categoria: " + formData.nombre);
            setFormData({nombre:""});
            actualizarPagina();
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

export default FormCategoria;