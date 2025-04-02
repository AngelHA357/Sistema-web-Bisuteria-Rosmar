import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AccesoUsuario } from './components/accesoUsuario/AccesoUsuario';
import { UserProvider } from './context/UserContext';
import { CatalogoProductos } from './components/catalogoProductos/CatalogoProductos';
import { NuevoProducto } from './components/catalogoProductos/NuevoProducto';
import { BarraNavegacion } from './components/catalogoProductos/BarraNavegacion';
import { ProductoInfo } from './components/descripcionProducto/ProductoInfo';
import { PiePagina } from './components/piePagina/PiePagina';
import { Carrito } from './components/carrito/Carrito';
import  ResumenPedido from './components/realizarPedido/ResumenPedido';
import  RealizarPedido  from './components/realizarPedido/RealizarPedido';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AccesoUsuario />} />
          <Route path="/catalogo" element={<CatalogoProductos />} />
          <Route path="/nuevoProducto" element={<NuevoProducto />} />
          <Route path="/producto/:id" element={<><BarraNavegacion /><ProductoInfo /><PiePagina /></>} />
          <Route path="/carrito" element={<><BarraNavegacion /><Carrito /><PiePagina /></>} />
          <Route path="/realizarPedido" element={<RealizarPedido />} />
          <Route path="/resumenPedido" element={<ResumenPedido />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App;