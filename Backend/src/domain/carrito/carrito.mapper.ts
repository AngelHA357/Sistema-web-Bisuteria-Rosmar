import { Carrito } from "../../entities/Carrito";
import { Cliente } from "../../entities/Cliente";
import { Producto } from "../../entities/Producto";
import { CarritoDTO, ProductoCarritoCreateDTO } from "./carrito.dto";


export class CarritoMap{

  static ToEntityFromCreate(dto: ProductoCarritoCreateDTO): Carrito{
    let entity = new Carrito();
    entity.cantidad = dto.cantidad;

    let cliente = new Cliente();
    cliente.id = dto.idCliente;
    entity.cliente = cliente;

    let producto = new Producto();
    producto.id = dto.idProducto;
    entity.producto = producto;

    return entity;
  }

  static X(lista: Carrito[]): CarritoDTO{
    return {
      listado: lista,
      total: lista.reduce((total,e)=> total += e.producto.precio * e.cantidad, 0),
    }
  }
}