import { Router, Request, Response } from 'express';
import { getCliente, logInCliente, registerCliente, signOutCliente } from '../controllers/ClienteController';
import {validateWithZod} from '../middlewares/validation';
import { ClienteCreateSchema, ClienteLogInSchema } from '../domain/cliente/cliente.schema';
import { verifyAuth } from '../middlewares/token';
import { getDireccionesCliente } from '../controllers/DireccionController';
import { emptyCarrito, getCarritoByCliente } from '../controllers/CarritoController';

export class ClienteRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', verifyAuth,getCliente);
    // this.router.get('/:id/carrito',verifyAuth)
    // this.router.get('/:id/direcciones',verifyAuth)
    this.router.post('/login', validateWithZod(ClienteLogInSchema), logInCliente);
    this.router.post('/', validateWithZod(ClienteCreateSchema), registerCliente);
    this.router.get('/:id/direcciones', getDireccionesCliente);
    this.router.get('/:id/carrito', getCarritoByCliente);
    this.router.delete('/:id/carritoVaciar', emptyCarrito);
    this.router.put('/', signOutCliente);
  }
}