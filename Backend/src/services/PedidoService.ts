import { Repository } from "typeorm";
import { Pedido } from "../entities/Pedido";
import { contextDB } from "../config/database";

export class PedidoService{
  private readonly repository: Repository<Pedido>;

  constructor(){
    this.repository = contextDB.getRepository(Pedido);
  }

  async addPedido(pedido: Pedido): Promise<Pedido>{
    const entity = this.repository.create(pedido);
    return await this.repository.save(entity);
  }

  // async changeStatePedido(pedido: Pedido): Promise<Pedido>{
  //   const entity = this.repository.update({
  //     tipo: Tipo
  //   })
  // }


}