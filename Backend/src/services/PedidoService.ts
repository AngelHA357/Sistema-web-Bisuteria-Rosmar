import { DataSource, QueryRunner, Repository } from "typeorm";
import { Pedido } from "../entities/Pedido";
import { contextDB } from "../config/database";
import { Carrito } from "../entities/Carrito";
import { ServiceError } from "../error/ServiceError";
import { PedidoProducto } from "../entities/PedidoProducto";

export class PedidoService{
  private dataSource: DataSource;
  private readonly repositoryPedido: Repository<Pedido>;
  private transaccion: QueryRunner;

  constructor(){
    this.repositoryPedido = contextDB.getRepository(Pedido);
    this.dataSource = contextDB
  }

  async addPedido(pedido: Pedido): Promise<Pedido>{
    return this.dataSource.transaction(async (transaccionalEntityManager) => {
      const carrito = await transaccionalEntityManager.find(Carrito,{
        where: {
          cliente: {
            id: pedido.cliente.id
          }
        },
        order: {
          id: "ASC"
        }
      })

      if(carrito.length === 0) throw new ServiceError("El carrito esta vacio");

      
      pedido = transaccionalEntityManager.create(Pedido, pedido);
      let pedidoGuardado = await transaccionalEntityManager.save(pedido);


      let productos: PedidoProducto[] = []
      carrito.forEach(car => {
        let p: PedidoProducto;
        p = transaccionalEntityManager.create(PedidoProducto);
        p.producto = car.producto;
        p.pedido = pedidoGuardado;
        p.precio = car.producto.precio;
        p.cantidad = car.cantidad;
        productos.push(p);
      });
      
      await transaccionalEntityManager.save(productos);
      await transaccionalEntityManager.remove(carrito);

      return await transaccionalEntityManager.findOne(Pedido, {
        where: { id: pedidoGuardado.id },
        relations: ["productos", "productos.producto"]
      }) as Pedido;
    });

  }

  async findPedido(id: number): Promise<Pedido>{
    const entities = await this.repositoryPedido.findOne({where: {
      id: id
    }});

    // console.log(entities)
    if(!entities) throw new ServiceError("Pedido con id enviada no existe");
    return entities;
  }
}