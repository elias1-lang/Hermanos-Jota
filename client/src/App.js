import "./App.css";
import "./styles/base/styles-base.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from "react";
  
import PaginaIndex from "./pages/Index";
import PaginaFaq from "./pages/faq";
import PaginaNosotros from "./pages/Nosotros";
import PaginaContactoPruebaRutas from "./pages/ContactoPruebaRutas";
import ProductDetail from "./pages/ProductDetail";
import BaseHeader from "./components/BaseHeader";
import BaseFooter from "./components/BaseFooter";
import BaseMenu from "./components/BaseMenu";
import PaginaCatalogo from "./pages/Catalogo";
import BaseCarritoModal from "./components/BaseCarritoModal";
import PaginaTablero from "./pages/PaginaTablero";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import UserProfile from "./components/registro/UserProfile";

function App() {

  const [estadoMenu, setEstadoMenu] = useState(false);

  const cambiarEstado = () => {
    setEstadoMenu(!estadoMenu);
  };


  return (
    <>
      <BaseMenu 
        estadoMenu={estadoMenu} 
        cambiarEstado={cambiarEstado} 
      />

      <BaseHeader
        cambiarEstadoMenuModal={cambiarEstado}
      />

      <Routes>

        <Route path="/" 
          element={<PaginaIndex />} 
        />
      
        <Route
          path="/contacto"
          element={<PaginaIndex />}
        />

        <Route path="/faq" 
          element={<PaginaFaq />} 
        />
        
        <Route path="/nosotros" 
          element={<PaginaNosotros />} 
        />
        
        <Route
          path="/productos/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/catalogo/:cat/:busq"
          element={<PaginaCatalogo />}
        />

        <Route
          path="/catalogo"
          element={<PaginaCatalogo />}
        />

        <Route 
          path="/admin/crear-producto"
          element={<PaginaTablero />}
        />
        
        <Route
          path="/login"
          element={<LoginRegisterPage typeForm={"login"}/>}
        />

        <Route
          path="/register"
          element={<LoginRegisterPage typeForm={"register"} />}
        />

        <Route 
          path="/profile"
          element={<UserProfile />}
        />
        
      </Routes>

      <BaseFooter />

      <BaseCarritoModal
      />

    </>
  );
}

export default App;
