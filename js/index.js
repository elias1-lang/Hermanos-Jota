// const productosDestacados = [ 
    
//     {
//         id: 1,
//         nombre: "Aparador Uspallata",
//         descripcion: "Elegante aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón",
//         precio: 48000,
//         urlImagen: "../img/index-productos-destacados/PROD1.png",
//         urlProducto: "producto.html?id=aparador-uspallata"
//     },
//     {
//         id: 2,
//         nombre: "Escritorio Costa",
//         descripcion: "Escritorio minimalista compacto con cajón organizado y tapa pasacables integrada en bambú laminado.",
//         precio:70000,
//         urlImagen: "../img/index-productos-destacados/PROD2.png",
//         urlProducto: "producto.html?id=escritorio-costa"
//     },
//     {
//         id: 3,
//         nombre: "Butaca Mendoza",
//         descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú.",
//         precio: 60000,
//         urlImagen: "../img/index-productos-destacados/PROD3.png",
//         urlProducto: "producto.html?id=butaca-mendoza"
//     },
//     {
//         id: 4,
//         nombre: "Biblioteca Recoleta",
//         descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro.",
//         precio: 35000,
//         urlImagen: "../img/index-productos-destacados/PROD4.png",
//         urlProducto: "producto.html?id=biblioteca-recoleta"
//     }
// ];

function crearProductoDestacado(imagen,nombre,descripcion,precio,urlProducto){
    const producto = 
    `
        <div class="index_productoDestacado_Producto">

        <div class="index_productoDestacado_Producto_Imagen">
            <img src="${imagen}" alt="${nombre}">
        </div>

        <div class="index_productoDestacado_Producto_Titulo">
            <h2>${nombre}</h2>
            <p>${descripcion}</p>
        </div>

        <div class="index_productoDestacado_Producto_Precio">
            <h2>$ ${precio}</h2>
        </div>
                            
        <div class="index_productoDestacado_Producto_Boton">
           <button onclick="window.location.href='${urlProducto}'">Ver Detalle</button>
        </div>
    </div>
    `;
    return producto;
};

function crearCategoriaPrincipal(orden,nombre,urlImagen){
    const categoria = 
    `
        <div class="index_main_Categorias_Contenedor_item" id="index_cat${orden}">
            <h2 class="index_cat_titulo">${nombre}</h2>
            <img class="index_cat_imagen" src="${urlImagen}" alt="${nombre}">
        </div>
    `;
    return categoria;
}

const selectorDivProductosDestacados = document.querySelector('.index_main_destacados_Productos');
productosDestacados.forEach((p)=>{
    producto = productos.find(prod => prod.id === p);
    selectorDivProductosDestacados.innerHTML+=crearProductoDestacado(producto.image,producto.nombre,producto.descripcion,producto.precio,producto.link);
});


const selectorDivCategorias = document.querySelector(".index_main_Categorias_Contenedor");
principalesCategorias.forEach((c)=>{
    selectorDivCategorias.innerHTML+=crearCategoriaPrincipal(c.orden,c.nombre,c.urlImagen);
});


function configuracionesMenu(habilitacion){

    const selectorMenuHamb = document.querySelector(".menu_hamb");
    const selectorHeader = document.querySelector("header");
    const selectorFooter = document.querySelector("footer");
    const selectorContenido = document.querySelector(".base_main_envoltorio");

    if(habilitacion){
        selectorMenuHamb.classList.remove("menu_hamb_disable");
        selectorHeader.classList.add("disable_content");
        selectorFooter.classList.add("disable_content");
        selectorContenido.classList.add("disable_content");  
        return 1;
    }
    
    selectorMenuHamb.classList.add("menu_hamb_disable");
    selectorHeader.classList.remove("disable_content");
    selectorFooter.classList.remove("disable_content");
    selectorContenido.classList.remove("disable_content");
    return 1;
}

const selectorMenuBoton = document.querySelector(".base_menu");
const selectorMenuDisable = document.querySelector(".menu_hamb_disable_bot");

selectorMenuBoton.addEventListener('click', ()=>{configuracionesMenu(1)});
selectorMenuDisable.addEventListener('click',()=>{configuracionesMenu(0)});

