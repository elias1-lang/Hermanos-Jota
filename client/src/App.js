//App.js es un componente
  //importa el logo react y las clases del tipico logo de react girando, se usará para manejar las direcciones con: react-router-dom (se debe instalar antes: npm install react-router-dom)
  //recordar que para iniciar react: npm run start

import './App.css';
import './styles/base/styles-base.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

  //necesario para que funcione react-router
import PaginaIndex from './pages/Index'
import PaginaFaq from './pages/faq'
import PaginaNosotros from './pages/Nosotros'
import PaginaContactoPruebaRutas from './pages/ContactoPruebaRutas'
import ProductDetail from './pages/ProductDetail';
import BaseHeader from './components/BaseHeader';
import BaseFooter from './components/BaseFooter';
import BaseMenu from './components/BaseMenu';
import { addCarrito, cantidadElementosCarrito} from './utils/carritoFunciones';

function App() {
  
  const [estadoMenu, setEstadoMenu] = useState(false);
  const cambiarEstado = () => {setEstadoMenu(!estadoMenu)};

  const [cantidadCarrito, setCantidadCarrito] = useState(0);

    useEffect(() => {
      setCantidadCarrito(cantidadElementosCarrito());
    }, []);

    const actualizarCantidadCarrito = (idCarrito) => {
      addCarrito(idCarrito)
      setCantidadCarrito(cantidadElementosCarrito());
    };


  return (
    <Router>
      <BaseMenu 
        estadoMenu={estadoMenu}
        cambiarEstado={cambiarEstado}
      />

      <BaseHeader 
        cambiarEstado={cambiarEstado}
        estadoMenu={estadoMenu}
        cantidadCarritoEstado={cantidadCarrito}
      />

      <Routes>
        <Route path="/" element={
          <PaginaIndex 
            estadoMenu={estadoMenu} 
            funcionAgregar={actualizarCantidadCarrito}
          />}/>

        <Route path="/contacto" element={<PaginaContactoPruebaRutas estadoMenu={estadoMenu}/>}/>
        <Route path="/faq" element={<PaginaFaq />}/>
        <Route path="/nosotros" element={<PaginaNosotros />}/>
        <Route path="/productos/:id" element={<ProductDetail />}/>
      </Routes>
      
      <BaseFooter 
        estadoMenu={estadoMenu}
      />
    </Router>
  )

}

export default App;