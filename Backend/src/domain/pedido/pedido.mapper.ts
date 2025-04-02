import { Cliente } from "../../entities/Cliente";
import { Direccion } from "../../entities/Direccion";
import { MetodoPago, Pedido } from "../../entities/Pedido";
import { PedidoCreate, PedidoDesc } from "./pedido.dto";

export class PedidoMap{
  static ToEntityFromCreate(dto: PedidoCreate): Pedido{
    const pedido = new Pedido();
    const cliente = new Cliente();
    const direccion = new Direccion();
    cliente.id = dto.idCliente;
    direccion.id = dto.idDireccion;

    pedido.cliente = cliente;
    pedido.metodoPago = dto.metodoPago; 
    pedido.direccion = direccion;

    return pedido;
  }

  static ToDescPedido(entity: Pedido): PedidoDesc{
    let productos = entity.productos;
    console.log(entity)
    let desc: PedidoDesc = {
      total_productos: productos.length,
      total: productos.reduce((total,e)=> total += e.precio * e.cantidad, 0),
      envio: 70,
    }

    return desc;
  }
}