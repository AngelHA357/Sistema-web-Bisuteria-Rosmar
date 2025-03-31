import { Router } from 'express';
import { addCarrito, decrementProducto, incrementProducto } from '../controllers/CarritoController';

export class CarritoRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.inicializeRoutes();
  }

  private inicializeRoutes() {
    // this.router.get('/:id', getDireccion);
    this.router.post('/', addCarrito);
    this.router.put('/agregar', incrementProducto)
    this.router.put('/quitarUno', decrementProducto)
    this.router.delete('/:id')
    // this.router.put('/:id', validateWithZod(DireccionUpdateSchema), updateDireccion);
    // this.router.delete('/', deleteDireccion);
  }
}