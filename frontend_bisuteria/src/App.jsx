import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AccesoUsuario } from './components/accesoUsuario/AccesoUsuario';
import RealizarPedido  from './components/realizarPedido/RealizarPedido';


function App() {
  return (
    <RealizarPedido  />
  )
}

export default App;