import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Direccion } from "./Direccion";
import { Carrito } from "./Carrito";

export enum TipoCliente{
  NORMAL ="Normal",
  ADMINISTRADOR="Administrador"
}

@Entity({name: 'clientes'})
export class Cliente{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({
    type:"enum",
    enum:TipoCliente,
    enumName:"tipo_cliente",
    name:"tipo",
    default:TipoCliente.NORMAL})
  tipo:TipoCliente;

  @Column({length:80,type:"varchar"})
  contrasena:string;
  @Column({length:100,type:"varchar"})
  correo:string;
  @Column({length:50,type:"varchar"})
  nombre:string;
  @Column({length:50,type:"varchar"})
  apellidoPaterno:string;
  @Column({length:50,type:"varchar"})
  apellidoMaterno:string;

  @OneToMany(() => Carrito, carrito => carrito.cliente,{eager:false})
  @JoinColumn({name: "carrito_id"})
  carrito?: Carrito[];

  @OneToMany(() => Direccion, direccion => direccion.cliente,{eager:false,orphanedRowAction:"soft-delete"})
  @JoinColumn({name: "direccion_id"})
  direcciones?:Direccion[];
}