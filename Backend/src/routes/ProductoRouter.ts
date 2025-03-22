import { Router } from 'express';
import { createProducto, deleteProducto, getProducto, getProductos, updateProducto } from '../controllers/ProductoController';
import { controlImages } from '../middlewares/uploadImages';

export class ProductoRouter {
  public router: Router;
    private upload = controlImages('productos');

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', getProductos);
    this.router.get('/:id', getProducto);
    this.router.post('/', this.upload.single('file'), createProducto);
    this.router.put('/:id', updateProducto);
    this.router.delete('/:id', deleteProducto);
  }
}