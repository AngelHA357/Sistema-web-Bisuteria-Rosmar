import {Router} from 'express'
import { createPedido, findPedido } from '../controllers/PedidoController';
import { validateWithZod } from '../middlewares/validation';
import { PedidoCreateSchema } from '../domain/pedido/pedido.schema';

export class PedidoRouter{
  public router: Router;

  constructor(){
    this.router = Router();
    this.inicializeRoutes()
  }

  inicializeRoutes(){
    this.router.get('/:id',findPedido)
    this.router.get('/')
    this.router.post('/',validateWithZod(PedidoCreateSchema), createPedido)
  }
}