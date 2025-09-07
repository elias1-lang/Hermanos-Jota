const productos = [
  {
    id: "silla-belgrano",
    nombre: "Silla de Trabajo Belgrano",
    descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
    medidas: "60 × 60 × 90-100 cm",
    terminacion: "Base cromada, tapizado premium",
    material: "Malla técnica, tejido reciclado",
    regulacion: "Altura + inclinación respaldo",
    certificacion: "Ergonomía europea EN 1335",
    precio: 25000,
    image: "../img/Silla de Trabajo Belgrano.png",
    alt: "Silla ergonómica de trabajo modelo Belgrano",
    link: "../html/producto.html?id=silla-belgrano",
    categoria: "SILLAS"
  },
  {
    id: "aparador-uspallata",
    nombre: "Aparador Uspallata",
    descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    medidas: "180 × 45 × 75 cm",
    terminacion: "Aceite natural ecológico",
    material: "Nogal macizo FSC®, herrajes de latón",
    peso: "68 kg",
    capacidad: "6 compartimentos interiores",
    precio: 48000,
    image: "../img/Aparador Uspallata.png",
    alt: "Aparador Uspallata",
    link: "../html/producto.html?id=aparador-uspallata",
    categoria: "APARADORES"
  },
  {
    id: "biblioteca-recoleta",
    nombre: "Biblioteca Recoleta",
    descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    medidas: "100 × 35 × 200 cm",
    terminacion: "Laca mate ecológica",
    material: "Estructura de acero, estantes de roble",
    capacidad: "45 kg por estante",
    modular: "5 estantes ajustables",
    precio: 35000,
    image: "../img/Biblioteca Recoleta.png",
    alt: "Biblioteca Recoleta",
    link: "../html/producto.html?id=biblioteca-recoleta",
    categoria: "ESTANTERÍAS"
  },
  {
    id: "butaca-mendoza",
    nombre: "Butaca Mendoza",
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    medidas: "80 × 75 × 85 cm",
    terminacion: "Cera vegetal, tapizado premium",
    material: "Guatambú macizo, tela bouclé",
    tapizado: "Repelente al agua y manchas",
    confort: "Espuma alta densidad",
    precio: 60000,
    image: "../img/Butaca Mendoza.png",
    alt: "Butaca Mendoza",
    link: "../html/producto.html?id=butaca-mendoza",
    categoria: "SILLAS"
  },
  {
    id: "escritorio-costa",
    nombre: "Escritorio Costa",
    descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
    medidas: "120 × 60 × 75 cm",
    terminacion: "Laca mate resistente",
    material: "Bambú laminado, herrajes ocultos",
    storage: "1 cajón con organizador",
    cables: "Pasacables integrado",
    precio: 70000,
    image: "../img/Escritorio Costa.png",
    alt: "Escritorio Costa",
    link: "../html/producto.html?id=escritorio-costa",
    categoria: "ESCRITORIOS"
  },
  {
    id: "mesa-comedor-pampa",
    nombre: "Mesa Comedor Pampa",
    descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
    medidas: "160-240 × 90 × 75 cm",
    terminacion: "Aceite-cera natural",
    material: "Roble macizo FSC®, mecanismo alemán",
    capacidad: "6-10 comensales",
    extension: "Sistema de mariposa central",
    precio: 80000,
    image: "../img/Mesa Comedor Pampa.png",
    alt: "Mesa Comedor Pampa",
    link: "../html/producto.html?id=mesa-comedor-pampa",
    categoria: "MESAS"
  },
  {
    id: "mesa-centro-araucaria",
    nombre: "Mesa de Centro Araucaria",
    descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
    medidas: "90 × 90 × 45 cm",
    terminacion: "Mármol pulido, aceite natural en madera",
    material: "Sobre de mármol Patagonia, patas de nogal",
    peso: "42 kg",
    carga: "25 kg distribuidos",
    precio: 80000,
    image: "../img/Mesa de Centro Araucaria.png",
    alt: "Mesa de Centro Araucaria",
    link: "../html/producto.html?id=mesa-centro-araucaria",
    categoria: "MESAS"
  },
  {
    id: "mesa-noche-aconcagua",
    nombre: "Mesa de Noche Aconcagua",
    descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
    medidas: "45 × 35 × 60 cm",
    terminacion: "Barniz mate de poliuretano",
    material: "Roble macizo FSC®, herrajes soft-close",
    almacenamiento: "1 cajón + repisa inferior",
    caracteristicas: "Cajón con cierre suave",
    precio: 40000,
    image: "../img/Mesa de Noche Aconcagua.png",
    alt: "Mesa de Noche Aconcagua",
    link: "../html/producto.html?id=mesa-noche-aconcagua",
    categoria: "MESAS"
  },
  {
    id: "silla-belgrano-premium",
    nombre: "Silla de Trabajo Belgrano",
    descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
    medidas: "60 × 60 × 90-100 cm",
    terminacion: "Base cromada, tapizado premium",
    material: "Malla técnica, tejido reciclado",
    regulacion: "Altura + inclinación respaldo",
    certificacion: "Ergonomía europea EN 1335",
    precio: 250000,
    image: "../img/Silla de Trabajo Belgrano.png",
    alt: "Silla ergonómica de trabajo modelo Belgrano",
    link: "../html/producto.html?id=silla-belgrano-premium",
    categoria: "SILLAS"
  },
  {
    id: "sillas-cordoba",
    nombre: "Sillas Córdoba",
    descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
    medidas: "45 × 52 × 80 cm (cada una)",
    terminacion: "Laca mate, pintura epoxi",
    material: "Contrachapado nogal, tubo de acero",
    apilables: "Hasta 6 sillas",
    incluye: "Set de 4 sillas",
    precio: 30000,
    image: "../img/Sillas Córdoba.png",
    alt: "Sillas modelo Córdoba",
    link: "../html/producto.html?id=sillas-cordoba",
    categoria: "SILLAS"
  },
  {
    id: "sillon-copacabana",
    nombre: "Sillón Copacabana",
    descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    medidas: "90 × 85 × 95 cm",
    terminacion: "Cuero anilina premium",
    material: "Cuero curtido vegetal, acero pintado",
    rotacion: "360° silenciosa y suave",
    garantia: "10 años en estructura",
    precio: 120000,
    image: "../img/Sillón Copacabana.png",
    alt: "Sillón modelo Copacabana",
    link: "../html/producto.html?id=sillon-copacabana",
    categoria: "SOFÁS Y SILLONES"
  },
  {
    id: "sofa-patagonia",
    nombre: "Sofá Patagonia",
    descripcion: "",
    medidas: "",
    terminacion: "",
    material: "",
    precio: 150000,
    image: "../img/Sofá Patagonia.png",
    alt: "Sofá modelo Patagonia",
    link: "../producto.html?id=sofa-patagonia",
    categoria: "SOFÁS Y SILLONES"
  }
];

// Diccionario de mapeo para mostrar nombres amigables
  const map = {
    medidas: "Medidas",
    terminacion: "Terminación",
    material: "Material",
    regulacion: "Regulación",
    certificacion: "Certificación",
    peso: "Peso",
    capacidad: "Capacidad",
    modular: "Modularidad",
    tapizado: "Tapizado",
    confort: "Confort",
    storage: "Almacenamiento",
    cables: "Pasacables",
    precio: "Precio",
    extension: "Extensión",
    carga: "Carga máxima",
    apilables: "Apilables",
    incluye: "Incluye",
    rotacion: "Rotación",
    garantia: "Garantía"
  };
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

const productosDestacados = ["aparador-uspallata", "escritorio-costa", "butaca-mendoza", "biblioteca-recoleta"];

let contadorCarrito = {};
// inicializa el objeto desde sessionStorage
if (sessionStorage.getItem('contadorCarrito')) {
    try {
        contadorCarrito = JSON.parse(sessionStorage.getItem('contadorCarrito'));
    } catch(e) {
        contadorCarrito = {};
    }
} else {
    contadorCarrito = {};
}

function actualizarContadorCarrito() {
    // suma todas las cantidades de todos los productos
    let cantidad = 0;
    for (const key in contadorCarrito) {
        cantidad += contadorCarrito[key];
    }
    const contador = document.querySelector('.base_carrito_img_div #carrito-contador');
    if (contador) {
        contador.textContent = cantidad > 99 ? '99+' : cantidad;
        contador.style.display = cantidad > 0 ? 'flex' : 'none';
    }
}

function agregarAlCarrito(idProducto) {
    // suma 1 al producto correspondiente
    if (!contadorCarrito[idProducto]) {
        contadorCarrito[idProducto] = 1;
    } else {
        contadorCarrito[idProducto]++;
    }
    sessionStorage.setItem('contadorCarrito', JSON.stringify(contadorCarrito));
    actualizarContadorCarrito();
}

window.addEventListener('DOMContentLoaded', actualizarContadorCarrito);