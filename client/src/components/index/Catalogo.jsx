import React from 'react';
import "../../styles/productos.css";
import { useParams } from 'react-router-dom';

function filtrarProductos(productosArray,categoria,buscado){
  let productosFiltrados = {};
  if(categoria && categoria!="a"){ //cuando se busque por la barra, lo normal es que la categoria sea all. Ejemplo: catalogo/a/mesas, busca mesas de todo el catalogo
    productosFiltrados = productosArray.filter(producto=>(producto.categoria==categoria));
  }else{productosFiltrados=productosArray;}
  if(buscado && buscado!="&"){
    const productosBuscado = productosFiltrados.filter(producto=>{
      return producto.nombre.toLowerCase().includes(buscado.toLowerCase());
    });
    productosFiltrados = productosBuscado; //cambio la referencia
  }
  //para buscar una categoria, indexar, ejemplo: catalogo/SILLA/&, ampersand indica que se debe mostrar todo, si es distinto de ampersand, busca sobre esa categoria
  return productosFiltrados;
}

export default function Catalogo({ productosArray, loading, funcionAgregar }) {
  const {cat,busq} = useParams();
  const productos = filtrarProductos(productosArray,cat,busq);

    return (
    <>
      <main className='productosMain'>
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



 

