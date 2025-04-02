import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Direccion } from "./Direccion";
import { PedidoProducto } from "./PedidoProducto";
import { Cliente } from "./Cliente";

export enum TipoPedido{
  PENDIENTE="Pendiente",
  ENVIADO="Enviado",
  RECHAZADO="Rechazado",
  ENTREGADO="Entregado"
}

export enum MetodoPago{
  EFECTIVO="Efectivo",
  TRANSFERENCIA="Transferencia",
}

@Entity({name: 'pedidos'})
export class Pedido{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
      type:"enum",
      enum:TipoPedido,
      enumName:"tipo_pedido",
      name:"tipo",
      default:TipoPedido.PENDIENTE})
  tipo: TipoPedido;

  @ManyToOne(() => Direccion)
  @JoinColumn({name:"direccion_id"})
  direccion: Direccion;

  @Column({
      type:"date",
      name:"fecha_ordenado",
      default: new Date()
    })
  fechaOrdenado: Date;
  @Column({
      type:"date",
      name:"fecha_entrega",
      nullable:true
    })
  fechaEntrega: Date;

  @ManyToOne(() => Cliente)
  @JoinColumn({name:"cliente_id"})
  cliente: Cliente;

  @Column({
      type:"enum",
      enum:MetodoPago,
      enumName:"metodo_pago",
      name:"metodo_pago",
      default:MetodoPago.EFECTIVO})
  metodoPago: MetodoPago;

  @OneToMany(() => PedidoProducto, producto => producto.pedido, {eager:true})
  productos: PedidoProducto[];
}