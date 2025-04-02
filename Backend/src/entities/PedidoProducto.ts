import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido";
import { Producto } from "./Producto";

@Entity({name: 'pedidos_productos'})
export class PedidoProducto {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({name: 'cantidad', type: "int"})
  cantidad: number;

  @Column({
    type:"float",
    nullable:false
  })
  precio: number;
  
  @ManyToOne(() => Pedido, pedido => pedido.productos)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}