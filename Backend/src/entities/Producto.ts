import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./Categoria";

@Entity({name:"productos"})
export class Producto{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      length:50,
      type:"varchar",
      unique:true,
      nullable:false
    })
  nombre: string;

  @Column({
      length:255,
      type:"varchar",
      nullable:true
    })
  descripcion: string;

  @Column({
    length:50,
    type:"varchar",
    array:true,
    nullable:true
  })
  colores: string[];

  @Column({
      type:"float",
      nullable:false
    })
  precio: number;
  
  @Column({
    type: "text",
    array: true,
  })
  imagenes: string[];
  
  @ManyToOne(() => Categoria, categoria => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}