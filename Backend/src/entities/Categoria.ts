import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity({name:"categorias"})
export class Categoria{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    length:50,
    type:"varchar",
    unique:true,
    nullable:false
  })
  nombre:string;

  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}