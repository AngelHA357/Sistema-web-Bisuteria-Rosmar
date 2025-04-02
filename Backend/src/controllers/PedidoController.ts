import { Request, Response } from "express";
import { PedidoService } from "../services/PedidoService";
import { PedidoCreate } from "../domain/pedido/pedido.dto";
import { PedidoMap } from "../domain/pedido/pedido.mapper";
import { ServiceError } from "../error/ServiceError";


const pedidoService = new PedidoService();

async function createPedido(req: Request, res: Response): Promise<void> {
  try {
    const dto = req.body as PedidoCreate;
    let pedido = PedidoMap.ToEntityFromCreate(dto);
    pedido = await pedidoService.addPedido(pedido);
    res.status(201).json(pedido)
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al realizar el pedido" });
    }
  }
} 

async function findPedido(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    let pedido = await pedidoService.findPedido(id);
    console.log("Antes del desastre");
    let desc =  PedidoMap.ToDescPedido(pedido);

    console.log(desc);
    res.status(200).json(desc);
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al consultar el pedido" });
    }
  }
} 


export {
  createPedido,
  findPedido
}