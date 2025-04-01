import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm";
import { Cliente } from "./Cliente";

@Entity({name: 'direcciones'})
export class Direccion{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
      length:100,
      type:"varchar",
    })
  calle: string;

  @Column({
    length:15,
    type:"varchar",
  })
  numeroExterior: string;

  @Column({
    length:15,
    type:"varchar",
    nullable:true
  })
  numeroInterior: string;
  @Column({
    length:100,
    type:"varchar",
  })
  colonia: string;
  @Column({
    length:100,
    type:"varchar",
  })
  ciudad: string;
  @Column({
    length:50,
    type:"varchar",
  })
  estado: string;
  @Column({
    length:10,
    type:"varchar",
  })
  codigoPostal: string;

  @ManyToOne(() => Cliente,{eager:false, onDelete:"SET NULL"})
  @JoinColumn({name:"cliente_id"})
  cliente: Cliente;
}