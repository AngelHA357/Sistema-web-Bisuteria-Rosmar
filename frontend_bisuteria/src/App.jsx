import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route,  Routes, Navigate  } from "react-router-dom";
import { AccesoUsuario } from './components/accesoUsuario/AccesoUsuario';
import { CatalogoProductos } from './components/catalogoProductos/CatalogoProductos';
import { ProductoInfo } from './components/descripcionProducto/ProductoInfo';
import { BarraNavegacion } from './components/barraNavegacion/BarraNavegacion';
import { PiePagina } from './components/piePagina/PiePagina';
import { Carrito } from './components/carrito/Carrito';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/acceso" />} />
          
          <Route path="/acceso" element={<AccesoUsuario />} />
          
          <Route path="/catalogo" element={<><BarraNavegacion /><CatalogoProductos /><PiePagina /></>} />
          <Route path="/producto/:id" element={<><BarraNavegacion /><ProductoInfo /><PiePagina /></>} />
          <Route path="/carrito" element={<><BarraNavegacion /><Carrito /><PiePagina /></>} />
        </Routes>
    </Router>
  );
}

export default App;