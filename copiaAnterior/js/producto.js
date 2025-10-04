// si llamo al html como producto.html?id=silla-belgrano, obtengo el id de la url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
// productos está definido en archivo.js
const producto = productos.find(p => p.id === id);

// mostrar los datos en el HTML
if (producto) {
  const nameElement = document.querySelector("#name"); // en el HTML <h1 id="name">
  const imageElement = document.querySelector("#image"); // en el HTML <img id="image" alt="">
  const descriptionElement = document.querySelector("#description"); // en el HTML <p id="description">
  const priceElement = document.querySelector("#price"); // en el HTML <span id="price">

  nameElement.textContent = producto.nombre; 
  imageElement.src = producto.image; 
  imageElement.alt = producto.alt || producto.nombre;
  descriptionElement.textContent = producto.descripcion; 
  priceElement.textContent = producto.precio; 

  // como el resto son atributos variables según el producto:
  // atributos a excluir, que ya se los pasamos al HTML arriba
  const exclude = ["id", "nombre", "descripcion", "precio", "image", "alt", "link", "categoria"];
  // sección del HTML donde vamos a poner los atributos que faltan (<div id="atributos">)
  const atributosDiv = document.querySelector("#atributos");
  atributosDiv.innerHTML = "";
  // map es un diccionario para mostrar nombres formateados que está en archivo.js
  Object.entries(producto).forEach(([key, value]) => {  //para cada atributo y valor del producto
    if (!exclude.includes(key) && value) { // si no está en exclude y tiene valor
      const label = map[key] || (key.charAt(0).toUpperCase() + key.slice(1)); //key en formato correcto (o usando map o con mayúscula inicial)
      atributosDiv.innerHTML += `<p><strong>${label}:</strong> <span>${value}</span></p>`;
    }
  });

  // para ver la imagen en pantalla completa al clickear:
  const modal = document.querySelector('#modal-img');
  const modalImg = document.querySelector('#modal-img-content');
  const closeBtn = document.querySelector('#modal-img-close');
  let scale = 1;
  let originX = 0;
  let originY = 0;
  let zoomMode = false;
  // si clickeo una vez, se pone en pantalla completa
  imageElement.addEventListener('click', function() {
    modal.classList.add('active');
    modalImg.src = imageElement.src;
    scale = 1; lastX = 0; lastY = 0;
    modalImg.style.transform = 'scale(1)';
    zoomMode = false;
    modalImg.style.cursor = 'zoom-in';
  });
  // si clickeo otra vez, se activa el zoom
  modalImg.addEventListener('click', function(e) {
    if (!zoomMode) {
      scale = 2;
      modalImg.style.transform = `scale(${scale})`;
      zoomMode = true;
      modalImg.style.cursor = 'grab';
    } else {
      scale = 1;
      lastX = 0; lastY = 0;
      modalImg.style.transform = 'scale(1)';
      zoomMode = false;
      modalImg.style.cursor = 'zoom-in';
    }
    e.stopPropagation();
  });
  // cerrar fullscreen
  closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
  });
  // cerrar fullscreen si clickeo fuera de la imagen
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // zoom con rueda del mouse SOLO si está en modo zoom
  modalImg.addEventListener('wheel', function(e) {
    if (!zoomMode) return;
    e.preventDefault();
    if (e.deltaY < 0) {
      scale = Math.min(scale + 0.15, 3);
    } else {
      scale = Math.max(scale - 0.15, 1.1);
    }
    modalImg.style.transform = `scale(${scale}) translate(${lastX/scale}px,${lastY/scale}px)`;
  });

  // arrastrar para mover la imagen cuando está ampliada
  let isDragging = false, startX, startY, lastX = 0, lastY = 0;
  modalImg.addEventListener('mousedown', function(e) {
    if (!zoomMode) return;
    isDragging = true;
    startX = e.clientX - lastX;
    startY = e.clientY - lastY;
    modalImg.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', function(e) {
    if (!isDragging || !zoomMode) return;
    lastX = e.clientX - startX;
    lastY = e.clientY - startY;
    modalImg.style.transform = `scale(${scale}) translate(${lastX/scale}px,${lastY/scale}px)`;
  });
  document.addEventListener('mouseup', function() {
    isDragging = false;
    if (zoomMode) modalImg.style.cursor = 'grab';
    else modalImg.style.cursor = 'zoom-in';
  });
  // reset posición al cerrar
  closeBtn.addEventListener('click', function() {
    lastX = 0; lastY = 0;
    modalImg.style.transform = 'scale(1)';
    zoomMode = false;
    modalImg.style.cursor = 'zoom-in';
  });
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      lastX = 0; lastY = 0;
      modalImg.style.transform = 'scale(1)';
      zoomMode = false;
      modalImg.style.cursor = 'zoom-in';
    }
  });
  // botón agregar al carrito
  const botonComprar = document.querySelector('.boton-comprar');
  if (botonComprar) {
    botonComprar.addEventListener('click', function() {
      if (typeof agregarAlCarrito === 'function') {
        agregarAlCarrito(producto.id);
      }
    });
  }

} else {
  const detalleProductoDiv = document.querySelector("#detalle-producto");
  detalleProductoDiv.innerHTML = "<p>Producto no encontrado.</p>";
}

// mostrar productos destacados:
const selectorDivProductosDestacados = document.querySelector('#producto-otros-destacados_contenedor');
if (selectorDivProductosDestacados) {
  productosDestacados.forEach((p) => { // productosDestacados está en archivo.js
    if (p === id) return; // no mostrar el mismo producto
    const producto_destacado = productos.find(prod => prod.id === p); //productos está en archivo.js
    if (producto_destacado) {
      selectorDivProductosDestacados.innerHTML += `
        <a href="${producto_destacado.link}" class="producto-otros-destacados_Producto" style="text-decoration:none;color:inherit;">
          <div class="producto-otros-destacados_Producto_Imagen">
            <img src="${producto_destacado.image}" alt="${producto_destacado.nombre}">
          </div>
          <div class="producto-otros-destacados_Producto_Titulo">
            <h2>${producto_destacado.nombre}</h2>
          </div>
        </a>
      `;
    }
  });
}
// mostrar categorías principales:
const selectorDivCategorias = document.querySelector('#producto-otros-categorias_contenedor');
if (selectorDivCategorias) {
  principalesCategorias.forEach((c) => { // principalesCategorias está en archivo.js
    selectorDivCategorias.innerHTML += `
        <div class="producto-otros-categorias_Categoria" id="producto-otros-categorias-${c.orden}" onclick="window.location.href='${c.urlCat}'">
            <h2 class="producto-otros-categorias_Categoria_Titulo">${c.nombre}</h2>
            <img class="producto-otros-categorias_Categoria_Imagen" src="${c.urlImagen}" alt="${c.nombre}">
        </div>
    `;
  });
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

const selectorBarraBusqueda = document.querySelector("#header_barra_busq");
const selectorBotonBusqueda = document.querySelector("#header_bot_busq");
selectorBotonBusqueda.addEventListener("click",()=>{
    const textoBuscado = selectorBarraBusqueda.value.toLowerCase();
    const url = `../html/productos.html?busc=${textoBuscado}`;
    window.open(url, '_self');
});