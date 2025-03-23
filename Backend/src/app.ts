import express from 'express';
import cors from 'cors';
import { CategoriaRoutes } from './routes/CategoriaRouter';
import { ProductoRouter } from './routes/ProductoRouter';

import path from 'path';
import { createFolder } from './config/ImageFolder';
import { ClienteRouter } from './routes/ClienteRouter';

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
  const categoriaRoutes = new CategoriaRoutes();
  const productoRoutes = new ProductoRouter();
  const clienteRoutes = new ClienteRouter();

  app.use('/api/categoria', categoriaRoutes.router);
  app.use('/api/producto', productoRoutes.router);
  app.use('/api/cliente', clienteRoutes.router);
}

init();

export default app;
