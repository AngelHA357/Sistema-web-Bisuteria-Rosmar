import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Cliente } from "./Cliente";

@Entity({name: 'carritos'})
export class Carrito{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'cantidad',
    default: 1,
  })
  cantidad: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Producto,{eager:true})
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}