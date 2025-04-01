import { Router } from 'express';
import { deleteDireccion, getCodigoPostal, getColonia, getDireccion, getEstado, getMunicipio, registerDireccion, updateDireccion } from '../controllers/DireccionController';
import { validateWithZod, validateWithZodQuery } from '../middlewares/validation';
import { DireccionCreateSchema, DireccionUpdateSchema, QueryColonia, QueryCP, QueryMunicipio } from '../domain/direccion/direccion.schema';

export class DireccionRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.inicializeRoutes();
  }

  private inicializeRoutes() {
    this.router.get('/codigo_postal',validateWithZodQuery(QueryCP),getCodigoPostal);
    this.router.get('/estados',getEstado);
    this.router.get('/municipio',validateWithZodQuery(QueryMunicipio),getMunicipio);
    this.router.get('/colonia',validateWithZodQuery(QueryColonia),getColonia);
    
    this.router.get('/:id', getDireccion);
    this.router.post('/', validateWithZod(DireccionCreateSchema), registerDireccion);
    this.router.put('/:id', validateWithZod(DireccionUpdateSchema), updateDireccion);
    this.router.delete('/', deleteDireccion);
  }
}