import React, { useContext } from 'react';
import "../../styles/productos.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

function filtrarCatologo(catalogo,categoria,busqueda){
    if(!catalogo.length){return};
    if(!categoria || !busqueda){return catalogo;}; //en caso de que categoria o busqueda sean undefined cargar todo el catalogo
                                                                    //son undefined cuando no existe el parámetro en la url
    let catalogoFiltrado = catalogo;

    if(categoria.length && categoria!=="a"){ //si hay una categoria configurada y no es "a" (all), filtrar el catalogo
        catalogoFiltrado = catalogoFiltrado.filter(producto => producto.categoria.nombre == categoria);
    }
    if(busqueda.trim().length && busqueda!=="&"){ //si hay una busqueda y la busqueda es distingo de "&" filtrar el catalogo
        catalogoFiltrado = catalogoFiltrado.filter(producto => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    }
    return catalogoFiltrado;
}

export default function Catalogo({ productosArray, loading }) {
  const params = useParams();
  const productosFiltrados = filtrarCatologo(productosArray,params.cat,params.busq);
  
  const { AddItemToCart } = useContext(CartContext);

  const navigate = useNavigate();
  const irProducto = (url) => {navigate(url)}

    return (
    <>
      <main className='productosMain'>
        <section className="catalogo">
          <h2>TODOS LOS PRODUCTOS</h2>
          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
              <article key={producto.id} id={producto.id}>

                <Link to={`/productos/${producto.id}`}>
                  <figure>
                    <img
                      src={producto.imageUrl}
                      alt={producto.nombre || "Producto"}
                    />
                  </figure>
                  <h3>{producto.nombre}</h3>
                  <p className="price">
                    ${producto.precio.toLocaleString("es-AR")}
                  </p>
                </Link>

                <div className="acciones">
                  <button className="btn btn-carrito" onClick={(e) => {
                    e.preventDefault();
                    AddItemToCart(producto.id);
                }}>
                    Agregar al carrito
                  </button>

                  <button className="btn btn-comprar" onClick={(e) => {e.preventDefault(); 
                    console.log(`Compra directa: ${producto.nombre}`);
                    irProducto(`/productos/${producto.id}`);
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



 

