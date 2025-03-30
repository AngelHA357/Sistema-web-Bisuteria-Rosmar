import { Cliente } from "../../entities/Cliente";
import { Direccion } from "../../entities/Direccion";
import { DireccionCreateDTO, DireccionDTO, DireccionUpdateDTO } from "./direccion.dto";


export class DireccionMap{
  static ToDTO(direccion: Direccion): DireccionDTO{
    return {
      id: direccion.id,
      calle: direccion.calle,
      codigoPostal: direccion.codigoPostal,
      colonia: direccion.colonia,
      estado: direccion.estado,
      numeroExterior: direccion.numeroExterior,
      numeroInterior: direccion.numeroInterior,
      ciudad: direccion.ciudad,
    }
  }


  static ToEntityFromUpdate(dto: DireccionUpdateDTO): Direccion{
    let entity = {...dto} as Direccion;
    return entity;
  }

  static ToEntityFromCreate(dto: DireccionCreateDTO): Direccion{
    let entity = new Direccion();
    entity.calle = dto.calle;
    entity.numeroExterior = dto.numeroExterior;
    entity.numeroInterior = dto.numeroInterior ?? "";
    entity.codigoPostal = dto.codigoPostal;
    entity.colonia = dto.colonia;
    entity.estado = dto.estado;
    entity.ciudad = dto.ciudad;
    const cliente = new Cliente();
    cliente.id = dto.idCliente;
    entity.cliente = cliente;


    return entity;
  }
}