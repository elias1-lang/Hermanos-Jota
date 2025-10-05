//App.js es un componente
  //importa el logo react y las clases del tipico logo de react girando, se usará para manejar las direcciones con: react-router-dom (se debe instalar antes: npm install react-router-dom)
  //recordar que para iniciar react: npm run start

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
  //necesario para que funcione react-router
import PaginaIndex from './pages/Index'

import PaginaContactoPruebaRutas from './pages/ContactoPruebaRutas'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaIndex />}/>
        <Route path="/contacto" element={<PaginaContactoPruebaRutas />}/>
      </Routes>
    </Router>
  )

}

export default App;




/*
//No se usará mas:
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
*/