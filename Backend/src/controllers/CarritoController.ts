import { Request, Response } from "express";
import { ServiceError } from "../error/ServiceError";
import { CarritoMap } from "../domain/carrito/carrito.mapper";
import { CarritoUpdateDTO, ProductoCarritoCreateDTO } from "../domain/carrito/carrito.dto";
import { CarritoService } from "../services/CarritoService";

const serviceCarrito = new CarritoService();
async function addCarrito(req: Request<{}, {}, ProductoCarritoCreateDTO>, res: Response) {
  try {
    const dto = req.body;

    let carrito = CarritoMap.ToEntityFromCreate(dto);
    carrito = await serviceCarrito.addCarrito(carrito);
    res.status(200).json({message: "Se agrego satisfactoriamente"});
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al consultar producto" });
    }
  }
}

async function getCarritoByCliente(req: Request, res: Response){
  try {
    const id = parseInt(req.params.id);
    let listadoProductos = await serviceCarrito.showCarrito(id);
    const carrito = CarritoMap.X(listadoProductos);
    res.status(200).json(carrito);
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al consultar producto" });
    }
  }
}

async function incrementProducto(req: Request<{},{},CarritoUpdateDTO>, res: Response){
  try {
    const dto = req.body;
    const carrito = await serviceCarrito.incrementProducto(dto.idCliente, dto.idProducto);

    res.status(200).json(carrito);
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al consultar producto" });
    }
  }
}
async function decrementProducto(req: Request<{},{},CarritoUpdateDTO>, res: Response){
  try {
    const dto = req.body;
    const carrito = await serviceCarrito.decrementProducto(dto.idCliente, dto.idProducto);

    if(carrito.cantidad === 0){
      res.status(204).json({message: `De producto id: ${carrito.producto.id} quedan ${carrito.cantidad}`});
    }else{
      res.status(200).json({message: `De producto id: ${carrito.producto.id} quedan ${carrito.cantidad}`});
    }
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al consultar producto" });
    }
  }
}

async function emptyCarrito(req: Request, res: Response){
  try {
    const idCliente = parseInt(req.params.id);
    let productoBorrados = await serviceCarrito.emptyCarrito(idCliente);
    res.status(200).json({message: `En total ${productoBorrados} productos borrados`});
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al vaciar el carrito" });
    }
  }
}

export {
  addCarrito,
  getCarritoByCliente,
  decrementProducto,
  incrementProducto,
  emptyCarrito
}