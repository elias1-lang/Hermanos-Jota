import React, { useContext, useEffect, useState } from "react";
import { fetchDeleteElemento, fetchPostFormularioFuncion, fetchPutFormularioFuncion, fetchStateFuncion } from "../utils/fetchFunciones";
import ModalGenerico from "./ModalGenerico";
import URL_BASE from "../config/api";
import FormProducto from "../components/carga/FormProducto";
import FormCategoria from "../components/carga/FormCategoria";
import FormEditarProducto from "../components/carga/FormEditarProducto";

import "../styles/tablero-admin.css"
import { useNavigate } from "react-router-dom";
import FormUser from "../components/carga/FormUser";
import FormSetUserPassword from "../components/carga/FormSetUserPassword";
import { AuthContext } from "../context/AuthContext";

function PaginaTablero ({estadoMenu}){
    const [tableroConfiguraciones, setTableroConfiguraciones] = useState("Productos");
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
        const[errorFetchConjunto,setErrorFetchConjunto] = useState("");
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    //ESTADOS DE MODALES PARA FORMULARIOS DE REGISTRO:

    //FIN ESTADOS DE MODALES
    
    //MANEJADORES DE CAMBIOS
        const handleDeleteProducto = (idProducto) => {
            const indiceEliminar = productos.findIndex(p=>p.id===idProducto);

            if(indiceEliminar!==-1){ //si existe el indice
                //ACA VA LA LÓGICA PARA ELIMINAR EL PRODUCTO DE LA BDD, NO SE IMPLEMENTA AHORA POR QUE SE ESTA PROBANDO
                const data = fetchDeleteElemento(`${URL_BASE}/productos/${idProducto}`,"Error al eliminar el producto");

                if(data){
                    const productosFiltrado = productos.filter(p=>p.id!==idProducto);
                    setProductos(productosFiltrado);
                }

            }
        }

        const handleActualizaciones = async (formData,endpoint,IDProducto) => {
            try {
                const result = await fetchPutFormularioFuncion(endpoint,formData);
                const elementoActualizado = result.producto;
                const indiceProducto = productos.findIndex(p=>p.id===IDProducto);
                const productosActualizados = [...productos];
                productosActualizados[indiceProducto]=elementoActualizado;
                setProductos(productosActualizados);
            } catch (error) {
                alert(error.message);            
            }
        };

        const handleCargasProducto = async (formData,endpoint)=>{
            try {
                const result = await fetchPostFormularioFuncion(endpoint,formData,"La carga del producto falló");
                navigate(result.link);
            } catch (error) {
                alert(error.message);
            }
        }

        const handleCargarCategoria = async (formData,endpoint) => {
            try {
                const result = await fetchPostFormularioFuncion(endpoint,formData,"La carga de la categoria falló");
                const nuevasCategorias = [...categorias,result];
                setCategorias(nuevasCategorias);
            } catch (error) {
                alert(error.message);
            }
        }

        const handleActualizacionesUsuarios = async (formData,endpoint,username) => {
            try {
                const result = await fetchPutFormularioFuncion(endpoint,formData);
                const elementoActualizado = result.user;
                const indiceUser = usuarios.findIndex(user=>user.username==username);
                const usuariosActualizados = [...usuarios];
                usuariosActualizados[indiceUser]=elementoActualizado;
                setUsuarios(usuariosActualizados);
            } catch (error) {
                alert(error.message);            
            }
        };

        const handleDeleteUser = (endpoint, username) => {
            const indiceEliminar = usuarios.findIndex(u=>u.username == username);
            if(indiceEliminar!==-1){
                const data = fetchDeleteElemento(endpoint,"Error al eliminar el usuario");
                    if(data){
                        const usuariosFiltrados = usuarios.filter(u=>u.username!==username);
                        setUsuarios(usuariosFiltrados);
                    }
            }
        }

        const handleCargarUsuario = async (formData,endpoint) =>{
            try {
                const result = await fetchPostFormularioFuncion(endpoint,formData,"La carga del usuario falló");
                const newUsers = [...usuarios, result];
                setUsuarios(newUsers);
            } catch (error) {
                alert(error.message);
            }
        };
    //FIN MANEJADORES DE CAMBIOS

    //FUNCIONES VARIAS:--->
        const datosGeneralesProductos = (idProducto) => { //Para indicar los datos que se tienen de un producto a la hora de editar sus campos.
            const productoEncontrado = productos.find(p=>(p.id === idProducto));
            const dataGeneralModificaciones = {productoEditar: productoEncontrado, categorias:categorias};
            return dataGeneralModificaciones;
        }
    //FIN FUNCIONES VARIAS

    const urlAPIProductos = `${URL_BASE}/productos`;
    const urlAPICategorias = `${URL_BASE}/categorias`;
    const urlAPIUsuarios = `${URL_BASE}/users`;
    
    const userRole = currentUser?currentUser.role:"";

    useEffect(()=>{
        if(!userRole){return} //mostrar error en el div: Tablero_DIV_Info_API
        if(userRole=="editor"||userRole=="admin")fetchStateFuncion(urlAPIProductos,setProductos,setErrorFetchConjunto,"Error en la conexión con el servidor");
        if(userRole=="editor"||userRole=="admin")fetchStateFuncion(urlAPICategorias,setCategorias,setErrorFetchConjunto,"Error en la conexión con el servidor");
        if(userRole=="admin")fetchStateFuncion(urlAPIUsuarios,setUsuarios,setErrorFetchConjunto,"Error en la conexión con el servidor");
    },[userRole]);
    
    if(estadoMenu)return null;
    if(!currentUser){return <div className="Tablero_Wrapper_Principal"><div className="Tablero_DIV_Info_API">NO AUTENTICADO</div></div>}
    if(currentUser.role=="user"){return <div className="Tablero_Wrapper_Principal"><div className="Tablero_DIV_Info_API">SIN PERMISOS SUFICIENTES</div></div>}; //Resolver despues con respuesta del middleware del backend
    
    return (
        <>
        <div className="Tablero_Wrapper_Principal">
            <div className="Tablero_DIV_Principal">
                <h3>Tablero de {tableroConfiguraciones}</h3>
                <div className="TABLERO_DIV_SELECTOR_TABLAS">
                    <button className={tableroConfiguraciones=="Productos"?"TABLERO_DIV_SELECTOR_TABLAS_BOTON_SELECCIONADO":""} onClick={()=>setTableroConfiguraciones("Productos")}>PRODUCTOS</button>
                    {userRole=="admin"?<button className={tableroConfiguraciones=="Usuarios"?"TABLERO_DIV_SELECTOR_TABLAS_BOTON_SELECCIONADO":""} onClick={()=>setTableroConfiguraciones("Usuarios")}>USUARIOS</button>:""}
                </div>
                <div>
                </div>
                    
                    {tableroConfiguraciones=="Productos"?
                        <TablaProductoConfiguraciones
                            datosGeneralesProductos = {datosGeneralesProductos}
                            manejadorCargasProducto = {handleCargasProducto}
                            handleCargarCategoria={handleCargarCategoria}
                        />
                    :
                        <TableroUsuariosConfiguraciones 
                            manejadorCargaUsuarios={handleCargarUsuario}
                        />
                    }

                    <table className="Tablero_Etiqueta_Tabla">
                        {tableroConfiguraciones=="Productos"?
                        <>
                            <TablaProductoHeaders />
                            {mappingProductosFilas(productos,handleDeleteProducto,datosGeneralesProductos,handleActualizaciones)}
                        </>
                        :
                        <>
                            <TablaUsuariosHeaders />
                            {mappingUsuariosFilas(usuarios,handleActualizacionesUsuarios,handleDeleteUser)}
                        </>
                        }

                    </table>

            </div>
        </div>
        </>
    );

}


export default PaginaTablero;



//FUNCION DE MAPPING DE PRODUCTOS: GENERA FILAS DE TABLA DE PRODUCTOS: ...>

const mappingProductosFilas = (productos,handleDeleteProducto,datosGeneralesProductos,handleActualizaciones) => {
    return(
        <>
        <tbody>
        {productos.map((prod)=>(
            <TableroProductoFila
            key={prod._id}
            nombre={prod.nombre}
            categoria={prod.categoria.nombre}
            precio={prod.precio}
            stock={prod.stock}
            destacado={prod.destacado}
            IDProducto={prod.id}
            OBIDCategoria={prod.categoria.id}
            OBIDProducto={prod._id}
            handleDeleteProducto={handleDeleteProducto}
            datosGeneralesProductos={datosGeneralesProductos}
            handleActualizaciones={handleActualizaciones}
            />
        ))}
        </tbody>
        </>
    );
}

//FUNCION DE MAPPING DE USUARIOS: GENERA FILAS DE TABLA DE USUARIOS: ...>

const mappingUsuariosFilas = (usuarios,handleActualizacionesUsuarios,handleDeleteUser) => {
    return(
        <tbody>
            {
                usuarios.map(user => (
                    <TablaUsuariosFila 
                        key={user._id}
                        name={user.name}
                        email={user.email}
                        username={user.username}
                        role={user.role}
                        handleActualizacionesUsuarios={handleActualizacionesUsuarios}
                        handleDeleteUser={handleDeleteUser}
                    />
                ))
            }
        </tbody>
    );
};


//COMPONENTES PARA LOS HEADERS DE LA TABLA DE USUARIOS



const TablaUsuariosHeaders = () => {
    return(
        <thead>
            <tr>
                <th style={{width:"auto"}}>Nombre</th>
                <th style={{width:"25%"}}>Email</th>
                <th style={{width:"auto"}}>Usuario</th>
                <th style={{width:"auto"}}>Rol</th>
                <th style={{width:"40%"}}>Acciones</th>
            </tr>
        </thead>
    );
}

const TableroUsuariosConfiguraciones = ({manejadorCargaUsuarios}) =>{

    const [estadoModalCargaUsuario, setEstadoModalCargaUsuario] = useState(false);
    const URLAPIPostUser = `${URL_BASE}/users/register`;
    const handlePostUser = (formData) => {
        const formDataEstandarPost = {name:formData.newName,email:formData.newEmail,username:formData.newUsername,role:formData.newRole,password:formData.newPassword}
        manejadorCargaUsuarios(formDataEstandarPost,URLAPIPostUser);
        setEstadoModalCargaUsuario(false);
    }

    return (
        <div className="TABLERO_CONFIGURACIONES_PRODUCTOS">
            <button onClick={()=>setEstadoModalCargaUsuario(true)}>Crear Usuario</button>

            <ModalGenerico
                titulo={`Creacion de Usuario`}
                estado={estadoModalCargaUsuario}
                cambiarEstado={setEstadoModalCargaUsuario}
            >

                <FormUser
                    handlePost={handlePostUser}
                />

            </ModalGenerico>

        </div>
    );
}

const TablaUsuariosFila = ({name,email,username,role,handleActualizacionesUsuarios,handleDeleteUser}) => {
    
    const [estadoModalEditar, setEstadoModalEditar] = useState(false);
    const [estadoModalCambiarContraseña, setEstadoModalCambiarContraseña] = useState(false);
    const [estadoModalEliminar, setEstadoModalEliminar] = useState(false);

    const URLAPIUpdateUser = `${URL_BASE}/users/change/data/${username}`;
    const URLAPIDeleteUser = `${URL_BASE}/users/${username}`;

    const handlePostUpdate = (formData) => {
        handleActualizacionesUsuarios(formData,URLAPIUpdateUser,username);
        setEstadoModalEditar(false);
        setEstadoModalCambiarContraseña(false);
    }

    const handleConfirmDeleteUser = () => {
        handleDeleteUser(URLAPIDeleteUser,username);
        setEstadoModalEliminar(false);
    }

    return(
        <>
        
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{username}</td>
            <td>{role}</td>
            <td>
                <div className="Tablero_Etiqueta_Contenedor_TD_Boton">
                    <button className="Tablero_Etiqueta_Boton_Editar" onClick={()=>(setEstadoModalEditar(true))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                        Editar
                    </button>

                    <button className="Tablero_Etiqueta_Boton_Editar" onClick={()=>(setEstadoModalCambiarContraseña(true))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                        Cambiar Contraseña
                    </button>
                    <button className="Tablero_Etiqueta_Boton_Borrar" onClick={()=>setEstadoModalEliminar(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>

            <ModalGenerico
                titulo={`Editar al Usuario "${username}"`}
                estado={estadoModalEditar}
                cambiarEstado={setEstadoModalEditar}
            >
                <FormUser
                    name={name}
                    email={email}
                    username={username}
                    role={role}
                    handlePost={handlePostUpdate}
                    enableSetPassword={false}
                />

            </ModalGenerico>
            
            <ModalGenerico
                titulo={`Asignar contraseña al Usuario "${username}"`}
                estado={estadoModalCambiarContraseña}
                cambiarEstado={setEstadoModalCambiarContraseña}
            >
                <FormSetUserPassword 
                    handlePost={handlePostUpdate}
                />

            </ModalGenerico>

            <ModalGenerico
                titulo={`Se eliminará al usuario "${username}"`}
                estado={estadoModalEliminar}
                cambiarEstado={setEstadoModalEliminar}
            >
                <div className="TABLERO_DIV_MODAL_CONFIRMACION_ELIMINAR">
                    <button className="TABLERO_DIV_MODAL_CONFIRMACION_BOT_ELIMINAR" onClick={()=>handleConfirmDeleteUser()}>ELIMINAR</button>   
                    <button className="TABLERO_DIV_MODAL_CONFIRMACION_BOT_MANTENER" onClick={()=>setEstadoModalEliminar(false)}>MANTENER</button>
                </div>
            </ModalGenerico>
        </>
    );
}



//COMPONENTE PARA CONFIGURACIONES REALIONADAS A LA TABLA DE PRODUCTOS: (POR AHORA SOLO AGREGAR UN PRODUCTO):
const TablaProductoConfiguraciones = ({datosGeneralesProductos,manejadorCargasProducto,handleCargarCategoria}) => {
    const [estadoModalCargarProducto, setEstadoModalCargarProducto] = useState(false);
    const [estadoModalCargarCategoria, setEstadoModalCargarCategoria] = useState(false);
    const categorias = datosGeneralesProductos("").categorias;

    return (
        <>
            <div className="TABLERO_CONFIGURACIONES_PRODUCTOS"> 
                <button className="" onClick={()=>setEstadoModalCargarProducto(true)}>CREAR PRODUCTO</button>
                <button className="" onClick={()=>setEstadoModalCargarCategoria(true)}>CREAR CATEGORIA</button>
                
                <ModalGenerico
                    titulo={`Cargue un Producto`}
                    estado={estadoModalCargarProducto}
                    cambiarEstado={setEstadoModalCargarProducto}
                >
                    <FormEditarProducto
                        endpoint={`${URL_BASE}/productos`}
                        productoData={null}
                        categorias={categorias}
                        cambiarEstadoModal={setEstadoModalCargarProducto}
                        handleActualizaciones={manejadorCargasProducto}
                        tituloBoton={"Cargar Producto"}
                    />
                </ModalGenerico>

                <ModalGenerico
                    titulo={`Cargue una categoria`}
                    estado={estadoModalCargarCategoria}
                    cambiarEstado={setEstadoModalCargarCategoria}
                >
                    <FormCategoria
                        endpoint={`${URL_BASE}/categorias`}
                        handleCargarCategoria={handleCargarCategoria}
                        cambiarEstadoModal={setEstadoModalCargarCategoria}
                    />
                </ModalGenerico>

            </div>
        </>
    );
}


//COMPONENTE PARA LOS ENCABEZADOS DE UNA TABLA DE PRODUCTOS: ...>

const TablaProductoHeaders = () => {
    return (
        <>
        <thead>
        <tr>
            <th style={{width:"35%"}}>Producto</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Destacado</th>
            <th style={{width:"20%"}}>Acciones</th>
        </tr>
        </thead>
        </>
    )
}

//COMPONENTE PARA UNA FILA DE UNA TABLA DE PRODUCTOS: ...>

const TableroProductoFila = ({nombre,categoria,precio,stock,destacado,IDProducto,OBIDCategoria,OBIDProducto,handleDeleteProducto,datosGeneralesProductos,handleActualizaciones}) => {

    const [estadoDestacado,setEstadoDestacado] = useState(destacado);
    const [estadoModalEditarProducto,setEstadoModalEditarProducto] = useState(false);
    const [estadoModalConfirmacionEliminar, setEstadoModalConfirmacionEliminar] = useState(false);
        const [eliminarProducto, setEliminarProducto] = useState(false);
    const datosProducto = datosGeneralesProductos(IDProducto);

    let claseDestacadoSVG = estadoDestacado?"Tablero_Etiqueta_Bot_SVG_Destacar ProductoDestacado":"Tablero_Etiqueta_Bot_SVG_Destacar";
    const urlDestacado = `${URL_BASE}/productos/destacar/${IDProducto}`;
    
    const manejadorDestacar = async () => {
        try {
            const response = await fetch(urlDestacado,{method:"PUT"});
            if(!response.ok){
                throw new Error("Error al destacar el producto");
            }
            //refrescarPagina();
            setEstadoDestacado(!estadoDestacado);
        } catch (error) {
            console.error(error.message);
        }
    };

    const manejadorConfirmarEliminacion = () => {
        setEstadoModalConfirmacionEliminar(!estadoModalConfirmacionEliminar);
        handleDeleteProducto(IDProducto); //componente principal maneja la eliminacion
    }

    return(
        <>
        <tr>
            <td>{nombre}</td>
            <td>{categoria}</td>
            <td>${precio}</td>
            <td>{stock}</td>

            <td>
                <div className="Tablero_Etiqueta_Contenedor_TD_Boton">
                    <button onClick={manejadorDestacar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-fill" viewBox="0 0 16 16" className={claseDestacadoSVG}>
                            <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
                        </svg>
                        <spam className="claseDestacadoSpam">{estadoDestacado?"SI":"NO"}</spam>
                    </button>
                </div>
            </td>
            
            <td>
                <div className="Tablero_Etiqueta_Contenedor_TD_Boton">
                    <button className="Tablero_Etiqueta_Boton_Editar Predefect_Width_40" onClick={()=>setEstadoModalEditarProducto(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                        Editar
                    </button>
                    
                    <button className="Tablero_Etiqueta_Boton_Borrar Predefect_Width_45" onClick={()=>setEstadoModalConfirmacionEliminar(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>

        <ModalGenerico
            titulo={`Se eliminará el Producto "${nombre}"`}
            estado={estadoModalConfirmacionEliminar}
            cambiarEstado={setEstadoModalConfirmacionEliminar}
        >
            <div className="TABLERO_DIV_MODAL_CONFIRMACION_ELIMINAR">
                <button className="TABLERO_DIV_MODAL_CONFIRMACION_BOT_ELIMINAR" onClick={()=>manejadorConfirmarEliminacion()}>ELIMINAR</button>   
                <button className="TABLERO_DIV_MODAL_CONFIRMACION_BOT_MANTENER" onClick={()=>setEstadoModalConfirmacionEliminar(!estadoModalConfirmacionEliminar)}>MANTENER</button>
            </div>
        </ModalGenerico>

        <ModalGenerico
            titulo={`Edición del Producto "${nombre}"`}
            estado={estadoModalEditarProducto}
            cambiarEstado={setEstadoModalEditarProducto}
        >
            {
            <FormEditarProducto
                endpoint={`${URL_BASE}/productos/${IDProducto}`}
                productoData={datosProducto.productoEditar}
                categorias={datosProducto.categorias}
                cambiarEstadoModal={setEstadoModalEditarProducto}
                handleActualizaciones={handleActualizaciones}
            />
            }

        </ModalGenerico>

        </>
    );
}



