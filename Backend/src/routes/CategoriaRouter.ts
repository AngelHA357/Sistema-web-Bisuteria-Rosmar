import { Router } from 'express';
import { createCategoria, deleteCategoria, getCategoria, getCategorias, updateCategoria } from '../controllers/CategoriaController';
import {validateWithZod} from '../middlewares/validation';
import { CategoriaSchema, UpdateCategoriaSchema } from '../domain/categoria/categoria.schema';


export class CategoriaRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/',getCategorias);
    this.router.get('/:id', getCategoria);
    this.router.post('/', validateWithZod(CategoriaSchema), createCategoria);
    this.router.put('/', validateWithZod(UpdateCategoriaSchema),updateCategoria);
    this.router.delete('/:id', deleteCategoria);
  }
}