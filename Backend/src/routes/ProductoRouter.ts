import { Router } from 'express';
import { createProducto, deleteProducto, getProducto, getProductosCategoria } from '../controllers/ProductoController';
import { controlImages } from '../middlewares/uploadImages';
import  { validateAndUpload, validateWithZod } from '../middlewares/validation';
import { ProductoCreateSchema } from '../domain/producto/producto.schema';

export class ProductoRouter {
  public router: Router;
  private upload = controlImages('productos');
  // private irBody = multer();
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // this.router.get('/', getProductos);
    this.router.get('/', getProductosCategoria);
    this.router.get('/:id', getProducto);
    // this.router.post('/', this.irBody.none(),validateWithZod(ProductoCreateSchema),this.upload.single('files'), createProducto);
    this.router.post('/',this.upload.array('files'), createProducto);
    this.router.delete('/:id', deleteProducto);
  }
}