import { Repository } from "typeorm";
import { Cliente } from "../entities/Cliente";
import { contextDB } from "../config/database";
import { ServiceError } from "../error/ServiceError";


export class ClienteService {
  private readonly clienteRepository: Repository<Cliente>;

  constructor() {
    this.clienteRepository = contextDB.getRepository(Cliente);
  }

  async createCliente(cliente: Cliente) : Promise<Cliente>{
    if (await this.existClienteBy(cliente))
      throw new ServiceError("Ya existe esa un cliente con ese correo");
    const categoriaCreate = this.clienteRepository.create(cliente);
    return await this.clienteRepository.save(categoriaCreate);
  }

  private async existClienteBy(cliente: Cliente): Promise<boolean> {
    return await this.clienteRepository.existsBy({ correo: cliente.correo });
  }

  async existCliente(cliente: Cliente): Promise<Cliente>{
    const entity = await this.clienteRepository.findOne({
      where: {
        correo: cliente.correo,
        contrasena: cliente.contrasena
      }
    });

    if(!entity){
      throw new ServiceError("El cliente no existe");
    }
    return entity;
  }

}