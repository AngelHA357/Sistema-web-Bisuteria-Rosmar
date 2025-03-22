import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { CategoriaRoutes } from './routes/CategoriaRouter';
import { ProductoRouter } from './routes/ProductoRouter';

import path from 'path';
import { createFolder } from './config/ImageFolder';

const app = express();

function init(): void {
  initializeMiddlewares();
  initializeRoutes();
}

function initializeMiddlewares(): void {
  app.use(cors());
  app.use(express.json());
  // Parseo de formularios
  app.use(express.urlencoded({ extended: true }));
  createFolder();
  
  console.log(path.join(__dirname, '..','public'))
  app.use('/img', express.static(path.join(__dirname, '..','public')));
}


function initializeRoutes(): void {
  const categoriaRoutes = new CategoriaRoutes();
  const productoRoutes = new ProductoRouter();

  app.use(`/api/categoria`, categoriaRoutes.router);
  app.use(`/api/producto`, productoRoutes.router);
}

init();

export default app;
