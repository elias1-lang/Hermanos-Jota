const productosDestacados = [ 
    
    {
        id: 1,
        nombre: "Aparador Uspallata",
        descripcion: "Elegante aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón",
        precio: 12000,
        urlImagen: "../img/index-productos-destacados/PROD1.png"
    },
    {
        id: 2,
        nombre: "Escritorio Costa",
        descripcion: "Escritorio minimalista compacto con cajón organizado y tapa pasacables integrada en bambú laminado.",
        precio:12000,
        urlImagen: "../img/index-productos-destacados/PROD2.png"
    },
    {
        id: 3,
        nombre: "Butaca Mendoza",
        descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú.",
        precio: 12000,
        urlImagen: "../img/index-productos-destacados/PROD3.png"
    },
    {
        id: 4,
        nombre: "Biblioteca Recoleta",
        descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro.",
        precio: 12000,
        urlImagen: "../img/index-productos-destacados/PROD4.png"
    }
];

const contenedorProductosDestacados = document.querySelector('.index_main_destacados_Productos');
let elementoAñadir = '';

for(let i=0;i<productosDestacados.length;i++){

    elementoAñadir = 
    `
    <div class="index_productoDestacado_Producto">

        <div class="index_productoDestacado_Producto_Imagen">
            <img src="${productosDestacados[i].urlImagen}" alt="${productosDestacados[i].nombre}">
        </div>

        <div class="index_productoDestacado_Producto_Titulo">
            <h2>${productosDestacados[i].nombre}</h2>
            <p>${productosDestacados[i].descripcion}</p>
        </div>

        <div class="index_productoDestacado_Producto_Precio">
            <h2>$ ${productosDestacados[i].precio}</h2>
        </div>
                            
        <div class="index_productoDestacado_Producto_Boton">
            <button>Ver Detalle</button>
        </div>

    </div>
    `;

    contenedorProductosDestacados.innerHTML+=elementoAñadir;
}

const principalesCategorias = [

    {
        nombre: "MESAS",
        orden: 1,
        urlImagen: "../img/index-categorias/CAT1.png"
    },

    {
        nombre: "SILLAS",
        orden: 2,
        urlImagen: "../img/index-categorias/CAT2.png"
    },

    {
        nombre: "APARADORES",
        orden: 3,
        urlImagen: "../img/index-categorias/CAT3.png"
    },

    {
        nombre: "ESTANTERÍAS",
        orden: 4,
        urlImagen: "../img/index-categorias/CAT4.png"
    },

    {
        nombre: "SOFÁS Y SILLONES",
        orden: 5,
        urlImagen: "../img/index-categorias/CAT5.png"
    },

];

const contenedorCategorias = document.querySelector(".index_main_Categorias_Contenedor");

for(let i=0;i<principalesCategorias.length;i++){

    elementoAñadir = `

    <div class="index_main_Categorias_Contenedor_item" id="index_cat${principalesCategorias[i].orden}">
        <h2 class="index_cat_titulo">${principalesCategorias[i].nombre}</h2>
        <img class="index_cat_imagen" src="${principalesCategorias[i].urlImagen}" alt="${principalesCategorias[i].nombre}">
    </div>
    
    `;

    contenedorCategorias.innerHTML+=elementoAñadir;
}