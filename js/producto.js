
// si llamo al html como producto.html?id=silla-belgrano, obtengo el id de la url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
// productos está definido en archivo.js
const producto = productos.find(p => p.id === id);

// mostrar los datos en el HTML
if (producto) {
  document.getElementById("name").textContent = producto.nombre;
  document.getElementById("image").src = producto.image;
  document.getElementById("image").alt = producto.alt || producto.nombre;
  document.getElementById("description").textContent = producto.descripcion;
  document.getElementById("price").textContent = producto.precio;

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

  // Atributos a excluir
  const exclude = ["id", "nombre", "descripcion", "precio", "image", "alt", "link"];
  const atributosDiv = document.getElementById("atributos");
  atributosDiv.innerHTML = "";

  Object.entries(producto).forEach(([key, value]) => {
    if (!exclude.includes(key) && value) {
      const label = map[key] || (key.charAt(0).toUpperCase() + key.slice(1));
      atributosDiv.innerHTML += `<p><strong>${label}:</strong> <span>${value}</span></p>`;
    }
  });
} else {
  document.getElementById("detalle-producto").innerHTML = "<p>Producto no encontrado.</p>";
}



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
