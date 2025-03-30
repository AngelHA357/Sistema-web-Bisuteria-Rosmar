import { Router } from 'express';
import { deleteDireccion, getDireccion, getDireccionesCliente, registerDireccion, updateDireccion } from '../controllers/DireccionController';
import { validateWithZod } from '../middlewares/validation';
import { DireccionCreateSchema, DireccionUpdateSchema } from '../domain/direccion/direccion.schema';

export class DireccionRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.inicializeRoutes();
  }

  private inicializeRoutes() {
    this.router.get('/:id', getDireccion);
    this.router.post('/', validateWithZod(DireccionCreateSchema), registerDireccion);
    this.router.put('/:id', validateWithZod(DireccionUpdateSchema), updateDireccion);
    this.router.delete('/', deleteDireccion);
  }
}