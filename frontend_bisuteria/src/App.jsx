import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AccesoUsuario } from './components/accesoUsuario/AccesoUsuario';
import { UserProvider } from './context/UserContext';
import { CatalogoProductos } from './components/catalogoProductos/CatalogoProductos';
import { NuevoProducto } from './components/catalogoProductos/NuevoProducto';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AccesoUsuario />} />
          <Route path="/catalogo" element={<CatalogoProductos />} />
          <Route path="/nuevoProducto" element={<NuevoProducto />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App;