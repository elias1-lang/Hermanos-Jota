import React from 'react';
import "../../styles/productos.css";

export default function Catalogo({ productos, loading, funcionAgregar }) {
    return (
    <>
      <main>
        <section className="catalogo">
          <h2>TODOS LOS PRODUCTOS</h2>

          <div className="productos-grid">
            {productos.map((producto) => (
              <article key={producto.id} id={producto.id}>
                <a href={`/productos/${producto.id}`}>
                  <figure>
                    <img
                      src={producto.image}
                      alt={producto.nombre || "Producto"}
                    />
                  </figure>
                  <h3>{producto.nombre}</h3>
                  <p className="price">
                    ${producto.precio.toLocaleString("es-AR")}
                  </p>
                </a>

                <div className="acciones">
                  <button className="btn btn-carrito" onClick={(e) => {
                    e.preventDefault();
                    funcionAgregar(producto.id,1);
                }}>
                    Agregar al carrito
                  </button>

                  <button className="btn btn-comprar" onClick={(e) => {e.preventDefault(); 
                    console.log(`Compra directa: ${producto.nombre}`);
                    window.location.href = `/productos/${producto.id}`;
                    }}>
                    Comprar ahora
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}



 

