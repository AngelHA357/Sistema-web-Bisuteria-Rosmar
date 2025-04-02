import { Repository } from "typeorm";
import { contextDB } from "../config/database";
import { ServiceError } from "../error/ServiceError";
import { Carrito } from "../entities/Carrito";

export class CarritoService{
  private carritoRepository: Repository<Carrito>;

  constructor(){
    this.carritoRepository = contextDB.getRepository(Carrito)
  }

  async getProductosCliente(id: number): Promise<Carrito[]>{
    const entities = await this.carritoRepository.find({
      where: {
        cliente: {
          id: id
        }
      },
      order: {
        id: "ASC"
      }
    })

    return entities;
  }


  async getCarrito(id: number): Promise<Carrito[]>{
    const entity = await this.carritoRepository.find({
      relations: {
        producto: true
      },
      where: {
        cliente: {
          id: id
        }
      }
    });

    if(!entity) throw new ServiceError(`La direccion con id: ${id} no existe`);

    return entity;
  }

  async existProductoEnCarrito(idCliente: number, idProducto: number): Promise<Carrito | null>{
    return await this.carritoRepository.findOne({
      where: {
        cliente: {
          id: idCliente
        },
        producto: {
          id: idProducto
        }
      }
    })
  }

  async existCarrito(id: number): Promise<boolean>{
    return await this.carritoRepository.existsBy({id: id});
  }

  async addCarrito(carrito: Carrito): Promise<Carrito>{
    let entity = await this.existProductoEnCarrito(carrito.cliente.id, carrito.producto.id); 
    if(!entity){
      entity =  this.carritoRepository.create(carrito);
    }else{
      entity.cantidad = entity.cantidad + carrito.cantidad;  
    }
    return await this.carritoRepository.save(entity);
  }

  async showCarrito(idCliente: number): Promise<Carrito[]>{
    const entities = await this.carritoRepository.find({
      relations: {
        producto: {
          categoria: true,
        }
      },
      where: {
        cliente: {
          id: idCliente
        }
      }
    });
    return entities;
  }

  async incrementProducto(idCliente: number, idProducto: number): Promise<Carrito>{
    
    const entity = await this.existProductoEnCarrito(idCliente, idProducto);

    if(!entity){
      throw new ServiceError("No existe ese producto asociado al cliente");
    }
    entity.cantidad += 1;
    return await this.carritoRepository.save(entity); 
  }

  async decrementProducto(idCliente: number, idProducto: number): Promise<Carrito>{
    
    const entity = await this.existProductoEnCarrito(idCliente, idProducto);

    if(!entity){
      throw new ServiceError("No existe ese producto asociado al cliente");
    }
    entity.cantidad = 0;
    if(entity.cantidad === 0){
      return this.deleteProductoForReach0(entity);
    }
    
    return await this.carritoRepository.save(entity); 
  }

  async deleteProductoForReach0(carrito: Carrito){
    return await this.carritoRepository.remove(carrito);
  }

  async emptyCarrito(idCliente: number): Promise<number>{
    const result = await this.carritoRepository.delete({cliente:{id : idCliente}})
     if(result.affected === null || result.affected === undefined){
      throw new ServiceError("Error al vaciar carrito");
     }
     return result.affected;
  }
  // async updateDireccion(carrito: Carrito): Promise<boolean>{
  //   if(!await this.existCarrito(carrito.id)) throw new ServiceError("Producto del carrito no existe")
  //   return await this.carritoRepository.save(carrito);
  // }

  // async deleteDireccion(id: number) : Promise<Direccion>{
  //     const entity = await this.getDireccion(id);
  //     return await this.carritoRepository.remove(entity);
  //   }
}