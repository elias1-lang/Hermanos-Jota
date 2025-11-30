/*
    Función: fetchStateFuncion()
    Uso: Permite fetch a APIs a las cuales se le pase como parámetro y guardar los datos en una variable de estado USANDO SU SETTER
    Tiene como parámetros:
        + urlFuente: Url de la cual se hará el fetch.
        + setterDatosFuncion: Es la función de set del estado (variable de estado) que guarda los datos del fetch exitoso
        + setterErrorFuncion: Es la función de set del estado (variable de estado) que guarda un string con un mensaje de error (si corresponde)
                              Este setter solo se ejecuta (guarda en el estado de error) si falla el fetch
        + mensajeError: Mensaje de error personalizado, si no se asigna como parámetro se pone por defecto: "Error en la captura de datos."
*/

async function fetchStateFuncion(urlFuente, setterDatosFuncion,setterErrorFuncion, mensajeError="Error en la captura de datos."){
    try {
        const response = await fetch(urlFuente);
        if(!response.ok){
            throw new Error(mensajeError);
        }
        const data = await response.json()
        setterDatosFuncion(data);
    } catch (error) {
        setterErrorFuncion(mensajeError);
    }
}

/*
    Función: fetchPostFormularioFuncion()
    Uso: Permite realizar operaciones de POST mediante formularios a la API indicada como endpoint
    Tiene como parámetros:

        + endpoint: Url de la api
        + formData: Todos los datos (ya validados) del formulario a cargar.
        + mensajeError: Mensaje de error personalizado para el caso de que se ejecute la excepcion durante el intento de post. 

    Este funcion retorna lo que devuelve la base de datos al hacer el post, revisar endpoint relativos al fetch de cada api a usar (puede asignarse el retorno o despreciarse)
*/
async function fetchPostFormularioFuncion(endpoint,formData,mensajeError="La carga a la base de datos falló."){

    const response = await fetch(endpoint, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), //objeto a json
    });

    if(!response.ok){
        throw new Error(mensajeError);
    }

    const result = await response.json(); //se recibe como json el producto creado y se parsea a json

    return result;
}


async function fetchPutFormularioFuncion(endpoint,formData,mensajeError="Error al actualizar el elemento"){
    
    const response = await fetch(endpoint, {
        method:"PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });

    if(!response.ok){
        throw new Error(mensajeError);
    }

    const result = await response.json();

    return result;
}


async function fetchDeleteElemento(endpoint,mensajeError="Error al eliminar el elemento"){
    try {
        const respuesta = await fetch(endpoint,{
            method: "DELETE",
            headers:{"Content-Type": "application/json"}
        });
        if(!respuesta.ok){
            throw new Error(`Error al eliminar: ${respuesta.status}`);
        }
        const data = await respuesta.json(); 
        return data;
        
    } catch (error) {
        alert(error.message)
        return null;
    }
}

export {fetchStateFuncion,fetchPostFormularioFuncion,fetchPutFormularioFuncion,fetchDeleteElemento}
