import express from 'express';
import cors from 'cors';
import { CategoriaRouter } from './routes/CategoriaRouter';
import { ProductoRouter } from './routes/ProductoRouter';

import path from 'path';
import { createFolder } from './config/ImageFolder';
import { ClienteRouter } from './routes/ClienteRouter';
import { DireccionRouter } from './routes/DireccionRouter';
import { CarritoRouter } from './routes/CarritoRouter';
import { PedidoRouter } from './routes/PedidoRouter';

const app = express();

function init(): void {
  initializeMiddlewares();
  initializeRoutes();
}

function initializeMiddlewares(): void {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  createFolder();
  
  console.log(path.join(__dirname, '..','public'))
  app.use('/img', express.static(path.join(__dirname, '..','public')));
}


function initializeRoutes(): void {
  const categoriaRoutes = new CategoriaRouter();
  const productoRoutes = new ProductoRouter();
  const clienteRoutes = new ClienteRouter();
  const direccionRoutes = new DireccionRouter();
  const carritoRoutes = new CarritoRouter();
  const pedidoRoutes = new PedidoRouter();

  app.use('/api/categoria', categoriaRoutes.router);
  app.use('/api/producto', productoRoutes.router);
  app.use('/api/cliente', clienteRoutes.router);
  app.use('/api/direccion', direccionRoutes.router);
  app.use('/api/carrito', carritoRoutes.router);
  app.use('/api/pedido', pedidoRoutes.router);
}

init();

export default app;
