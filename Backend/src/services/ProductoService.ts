import { Repository } from "typeorm";
import { Producto } from "../entities/Producto";
import { contextDB } from "../config/database";
import { ServiceError } from "../error/ServiceError";
import { queryGetProductos } from "../types/query.types";

export class ProductoService{
  private readonly productoRepository: Repository<Producto>;
  
  constructor(){
    this.productoRepository = contextDB.getRepository(Producto);
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

  async createProducto(producto:Producto): Promise<Producto>{
    if (await this.existClienteBy(producto))
      throw new ServiceError("Ya existe esa un producto con ese nombre");
    const productoCreate = this.productoRepository.create(producto);
    return await this.productoRepository.save(productoCreate);
  }

  async getProducto(id: number): Promise<Producto>{
    const entity = await this.productoRepository.findOne({
      relations: {
        categoria: true,
      },
      where: {id: id}
    });
    if(!entity){
      throw new ServiceError(`No existe producto con id: ${id}`)
    }
    return entity;
  }


  async getProductosCategoria(nombre: string){
    const productos = await this.productoRepository.find({
     relations: {
      categoria: true
     },
     where:{
      categoria: {
        nombre : nombre
      }
     }
    })

    if(!productos){
      throw new ServiceError("No existen productos en la categoria")
    }
    return productos;
  }

  private async existClienteBy(producto: Producto): Promise<boolean> {
      return await this.productoRepository.existsBy({ nombre: producto.nombre });
  }


  // async getProductosCategoria2(query: queryGetProductos){
  //   const productos = await this.productoRepository.find({
  //    relations: {
  //     categoria: true
  //    },
  //    where:{
  //     categoria: {
  //       nombre : query.nombres
  //     }
  //    }
  //   })

  //   console.log(productos);

  //   if(!productos){
  //     throw new ServiceError("No existen productos en la categoria")
  //   }
  //   return productos;
  // }
}