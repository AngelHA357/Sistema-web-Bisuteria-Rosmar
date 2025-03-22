import { Repository } from "typeorm";
import { Producto } from "../entities/Producto";
import { contextDB } from "../config/database";

export class ProductoService{
  private readonly productoRepository: Repository<Producto>;
  
  constructor(){
    this.productoRepository = contextDB.getRepository(Producto);
  }

  async createProducto(producto: Producto){

  }

  async getProductos(nombreCategoria: string, pagina: number): Promise<Producto[]>{
      return await this.productoRepository.find({
        order: {
            id: "ASC",
        },
        skip: pagina * 10,
        take: 10,
    })
  }

  async getProducto(producto: Producto){
    return await this.productoRepository.findOneBy({id: producto.id});
  }


}