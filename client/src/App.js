import './App.css';
import './styles/base/styles-base.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'; 
import { useState, useEffect, useRef } from 'react';

import PaginaIndex from './pages/Index'
import PaginaFaq from './pages/faq'
import PaginaNosotros from './pages/Nosotros'
import PaginaCarga from "./pages/CargaForm"
import PaginaContactoPruebaRutas from './pages/ContactoPruebaRutas'
import ProductDetail from './pages/ProductDetail';
import BaseHeader from './components/BaseHeader';
import BaseFooter from './components/BaseFooter';
import BaseMenu from './components/BaseMenu';
import PaginaCatalogo from './pages/Catalogo';
import BaseCarritoModal from "./components/BaseCarritoModal"

function App() {
  
  const [estadoMenu, setEstadoMenu] = useState(false);
  const cambiarEstado = () => {setEstadoMenu(!estadoMenu)};

  const [estadoCarrito, setEstadoCarrito] = useState(false);
  const cambiarEstadoCarrito = ()=> {setEstadoCarrito(!estadoCarrito)};

  const [carrito, setCarrito] = useState({});

  useEffect(()=>{
    const carritoAuxiliar = JSON.parse(sessionStorage.getItem("carrito")) || {};
    setCarrito(carritoAuxiliar);
  }, []); 

  const sitioMontado = useRef(false);

  useEffect(()=>{
    if(sitioMontado.current){
      sessionStorage.setItem("carrito",JSON.stringify(carrito));
    }else{
      sitioMontado.current = true;
    }
  }, [carrito]);

  const actualizarCarrito = (idProducto,cantidad) => {
    const nuevoCarrito = {...carrito};
    if(nuevoCarrito[idProducto]){
      nuevoCarrito[idProducto]+=cantidad;
      if(nuevoCarrito[idProducto]==0){
        delete nuevoCarrito[idProducto];
      }
    }else{
      nuevoCarrito[idProducto] = cantidad;
    }
    setCarrito(nuevoCarrito);
  }

  const cantidadItemsCarrito = ()=>{
    let cantidad = 0;
    for(const key in carrito){
      cantidad += carrito[key];
    }
    return cantidad;
  }

  return (
    <BrowserRouter>
      <BaseMenu 
        estadoMenu={estadoMenu}
        cambiarEstado={cambiarEstado}
        />

      <BaseHeader 
        cambiarEstado={cambiarEstado}
        estadoMenu={estadoMenu}
        cantidadElementosCarrito={cantidadItemsCarrito()}
        cambiarEstadoCarrito={cambiarEstadoCarrito}
        />

      <Routes>
        <Route path="/" element={<PaginaIndex estadoMenu={estadoMenu}/>}/>
        <Route path="/contacto" element={<PaginaContactoPruebaRutas estadoMenu={estadoMenu}/>}/>
        <Route path="/faq" element={<PaginaFaq />}/>
        <Route path="/nosotros" element={<PaginaNosotros />}/>
        <Route path="/productos/:id" element={<ProductDetail funcionAgregar={actualizarCarrito}/>}/>
        <Route path="/catalogo/:cat/:busq" element={<PaginaCatalogo funcionAgregar={actualizarCarrito} />}/>
        <Route path="/catalogo" element={<PaginaCatalogo funcionAgregar={actualizarCarrito} />}/>
        <Route path="/admin/crear-producto" element={<PaginaCarga estadoMenu={estadoMenu} />}/>
      </Routes>
      
      <BaseFooter 
        estadoMenu={estadoMenu}
        />

      <BaseCarritoModal 
        estadoCarrito={estadoCarrito}
        cambiarEstadoCarrito={cambiarEstadoCarrito}
        carrito={carrito}
        funcionActualizarCarrito={actualizarCarrito}
        />
    </BrowserRouter>
  )

}

export default App;