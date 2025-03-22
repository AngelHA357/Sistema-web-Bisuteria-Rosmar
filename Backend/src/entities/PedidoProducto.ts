import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido";
import { Producto } from "./Producto";

@Entity({name: 'pedidos_productos'})
export class PedidoProducto {
  @PrimaryGeneratedColumn()
  id: number;
  
  cantidad: number;
  precio: number;
  total: number;

  @ManyToOne(() => Pedido, pedido => pedido.productos)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}