import React, { useState } from "react";
import FormImputText from "./FormInputText";
import FormOption from "./FormOption";
import { useNavigate } from "react-router-dom";
import { fetchPostFormularioFuncion } from "../../utils/fetchFunciones";


function FormProducto({endpoint,categorias}){
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        nombre:'',
        categoria:'',
        precio:'',
        stock:'',
        imageUrl:'',
        descripcion:'',
        medidas:"",
        material:"",
        terminacion:"",
        almacenamiento:"",
        capacidad:"",
        peso:""
    });

    const manejadorCambios = (e) => { //e de memotécnico para event?? tal vez
        const {name,value} = e.target; //asigna en nombre: el nombre del campo de cambio, y en value, el valor que tiene se campo cambiado, captura los objetivos del evento
        setFormData(estadoPrevio=>({...estadoPrevio,[name]:value})); //return implicito de objeto, copia el estado previo con sobreescritura del cambiado "name"
    };

    const validacionesRevelantes = (data) => {
        if(!data.nombre.trim().length){
            throw new Error("El nombre del producto no puede ser vacio.");
        }
        if(!data.categoria.length){
            throw new Error("Debe elegir una categoria.");
        }
        if(data.precio<=0){            
            throw new Error("El precio no puede ser nulo ni negativo.");
        }
        if(data.stock<=0){
            throw new Error("El stock no puede ser nulo ni negativo.");
        }
        if(!data.imageUrl.length){
            throw new Error("Debe indicar la fuente de la imagen del producto.");
        }
        if(!data.descripcion.length){
            throw new Error("Debe dar las especificaciones del producto.");
        }
    };

    const manejadorEnvio = async (event) => {
        event.preventDefault();
        try {
            validacionesRevelantes(formData);
            const result = await fetchPostFormularioFuncion(endpoint,formData,"La carga del producto falló.")
            setFormData({nombre:"", categoria:"", precio:"", stock:"", imageUrl:"", descripcion:"",medidas:"",material:"",terminacion:"",almacenamiento:"",capacidad:"",peso:""}); //reinicia el formulario
            navigate(result.link);
        } catch (error) {
            alert(error.message);            
        }
    };

    return(
        <>
            <form className="carga-form" onSubmit={manejadorEnvio}>
                <fieldset>
                    <legend>Informacion del Producto</legend>
                    <FormImputText nameLabel={"Nombre del Producto"} nameCampo={"nombre"} onChange={manejadorCambios} value={formData.nombre}/>
                    <div>
                        <label htmlFor="categoria">Categoria del Producto</label>
                        <br/>
                        <select name="categoria" id="categoria" onChange={manejadorCambios} value={formData.categoria}>
                            <FormOption valueCampo={""} nameOption={"Selecciona una Categoria"} selected={"true"} disabled={"true"}/>
                            {categorias.map(cat=>(
                                <FormOption
                                    key={cat._id}
                                    valueCampo={cat._id}
                                    nameOption={cat.nombre}
                                    selected={""}
                                    disabled={""}
                                />
                            ))
                            }
                        </select>
                    </div>

                    <FormImputText nameLabel={"Precio del Producto"} nameCampo={"precio"} onChange={manejadorCambios} tipo={"number"} value={formData.precio}/>
                    <FormImputText nameLabel={"Stock del Producto"} nameCampo={"stock"} onChange={manejadorCambios} tipo={"number"} value={formData.stock}/>
                    <FormImputText nameLabel={"Imagen del Producto"} nameCampo={"imageUrl"} onChange={manejadorCambios} tipo={"text"} value={formData.imageUrl}/>
                    <div>
                        <label htmlFor="descripcion">Descripción del Producto</label>
                        <br/>
                        <textarea name="descripcion" id="descripcion" row="4" cols="50" placeholder="Añada descripcion adicional" onChange={manejadorCambios} value={formData.descripcion}></textarea>
                    </div>
                <fieldset>
                <legend> Descripciones Adicionales </legend>
                    <FormImputText nameLabel={"Medidas"} nameCampo={"medidas"} onChange={manejadorCambios} value={formData.medidas}/>
                    <FormImputText nameLabel={"Material"} nameCampo={"material"} onChange={manejadorCambios} value={formData.material}/>
                    <FormImputText nameLabel={"Terminación"} nameCampo={"terminacion"} onChange={manejadorCambios} value={formData.terminacion}/>
                    <FormImputText nameLabel={"Almacenamiento"} nameCampo={"almacenamiento"} onChange={manejadorCambios} value={formData.almacenamiento}/>
                    <FormImputText nameLabel={"Capacidad"} nameCampo={"capacidad"} onChange={manejadorCambios} value={formData.capacidad}/>
                    <FormImputText nameLabel={"Peso"} nameCampo={"peso"} onChange={manejadorCambios} value={formData.peso}/>
                </fieldset>
            
                <button type="submit" className="carga-submit">Cargar Producto</button>

                </fieldset>
            </form>
            <div>
            </div>
        </>
    );
}

export default FormProducto;