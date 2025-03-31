import { Repository } from "typeorm";
import { contextDB } from "../config/database";
import { Direccion } from "../entities/Direccion";
import { ServiceError } from "../error/ServiceError";

export class DireccionService{
  private direccionRepository: Repository<Direccion>;

  constructor(){
    this.direccionRepository = contextDB.getRepository(Direccion)
  }

  async getDireccionesByCliente(id: number): Promise<Direccion[]>{
    const entities = await this.direccionRepository.find({
      where: {
        cliente: {
          id: id
        }
      },
      order: {
        id: "ASC"
      }
    })

    return entities;
  }


  async getDireccion(id: number): Promise<Direccion>{
    const entity = await this.direccionRepository.findOneBy({id: id});

    if(!entity) throw new ServiceError(`La direccion con id: ${id} no existe`);

    return entity;
  }

  async existDireccion(id: number): Promise<boolean>{
    return await this.direccionRepository.existsBy({id: id});
  }


  async createDireccion(direccion: Direccion): Promise<Direccion>{
    const entity = this.direccionRepository.create(direccion);
    return await this.direccionRepository.save(entity);
  }

  async updateDireccion(direccion: Direccion): Promise<Direccion>{
    if(!await this.existDireccion(direccion.id)) throw new ServiceError("Direccion no existe")
    return await this.direccionRepository.save(direccion);
  }

  async deleteDireccion(id: number) : Promise<Direccion>{
      const entity = await this.getDireccion(id);
      return await this.direccionRepository.remove(entity);
    }
}