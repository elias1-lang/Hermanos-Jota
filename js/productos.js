function fetchProductos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 1000); //simula un retraso de 1 segundo 
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("productos");
  if (!grid) return;

  document.body.insertAdjacentHTML("beforeend", `<div class="loading">Cargando productos...</div>`); // mensaje de carga 

  //espera la simulación de carga
  const productosCargados = await fetchProductos();

  if (!Array.isArray(productosCargados) || productosCargados.length === 0) {
    grid.innerHTML = `<p>No hay productos disponibles.</p>`;
    return;
  }

  const frag = document.createDocumentFragment();

  productos.forEach((producto) => {
    const article = document.createElement("article");
    article.id = producto.id;

    const a = document.createElement("a");
    a.href = `../html/producto.html?id=${encodeURIComponent(producto.id)}`;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = producto.image;
    img.alt = producto.alt || producto.nombre || "Producto";
    figure.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = producto.nombre || "Producto";

    const price = document.createElement("p");
    price.className = "price";
    const monto = Number(producto.precio) || 0;
    price.textContent = `$${monto.toLocaleString("es-AR")}`;

    a.appendChild(figure);
    a.appendChild(h3);
    a.appendChild(price);

    // Botones de acción
    const actions = document.createElement("div");
    actions.className = "acciones";

    const btnCarrito = document.createElement("button");
    btnCarrito.className = "btn btn-carrito";
    btnCarrito.textContent = "Agregar al carrito";
    btnCarrito.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof agregarAlCarrito === "function") {
        agregarAlCarrito(producto.id);
      } else {
        console.log(`Producto agregado: ${producto.nombre} (ID: ${producto.id})`);
      }
    });

    const btnComprar = document.createElement("button");
    btnComprar.className = "btn btn-comprar";
    btnComprar.textContent = "Comprar ahora";
    btnComprar.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(`Compra directa: ${producto.nombre}`);
      window.location.href = `../html/carrito.html?id=${producto.id}`;
    });

    actions.appendChild(btnCarrito);
    actions.appendChild(btnComprar);

    article.appendChild(a);
    article.appendChild(actions);
    frag.appendChild(article);
  });

  // reemplaza el "Cargando" por los productos
  document.querySelector(".loading")?.remove();
  grid.appendChild(frag);
});