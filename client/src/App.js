//App.js es un componente
  //importa el logo react y las clases del tipico logo de react girando, se usará para manejar las direcciones con: react-router-dom (se debe instalar antes: npm install react-router-dom)
  //recordar que para iniciar react: npm run start

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
  //necesario para que funcione react-router
import PaginaIndex from './pages/Index'
import PaginaFaq from './pages/faq'
import PaginaNosotros from './pages/Nosotros'
import PaginaContactoPruebaRutas from './pages/ContactoPruebaRutas'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaIndex />}/>
        <Route path="/contacto" element={<PaginaContactoPruebaRutas />}/>
        <Route path="/faq" element={<PaginaFaq />}/>
        <Route path="/nosotros" element={<PaginaNosotros />}/>
      </Routes>
    </Router>
  )

}

export default App;