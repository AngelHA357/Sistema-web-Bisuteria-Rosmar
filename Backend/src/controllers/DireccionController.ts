import { Request, Response } from "express";
import { ServiceError } from "../error/ServiceError";
import { DireccionService } from "../services/DireccionService";
import { DireccionCreateDTO, DireccionUpdateDTO } from "../domain/direccion/direccion.dto";
import { DireccionMap } from "../domain/direccion/direccion.mapper";


const direccionService = new DireccionService();
async function getDireccion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const direccion = await direccionService.getDireccion(id);
    res.status(200).json(direccion);
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al consultar la dirección" });
    }
  }
}

async function registerDireccion(req: Request<{},{},DireccionCreateDTO>, res: Response): Promise<void> {
  try {
    const dto = req.body;
    let direccion = DireccionMap.ToEntityFromCreate(dto);
    direccion = await direccionService.createDireccion(direccion);
    res.status(201).json(DireccionMap.ToDTO(direccion));
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al registrar la dirección" });
    }
  }
}

async function updateDireccion(req: Request, res: Response): Promise<void>{
  try {
    const id = parseInt(req.params.id);
    const dto: DireccionUpdateDTO = req.body;
    dto.id = id;
    console.log(dto);
    let direccion = DireccionMap.ToEntityFromUpdate(dto);
    direccion = await direccionService.updateDireccion(direccion);
    res.status(200).json(DireccionMap.ToDTO(direccion));
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al actualizar la direccion" });
    }
  }
}

async function getDireccionesCliente(req: Request, res: Response): Promise<void>{
  try {
    const id = parseInt(req.params.id);
    const direcciones = await direccionService.getDireccionesByCliente(id);
    res.status(200).json(direcciones);
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al buscar direcciones del cliente" });
    }
  }
}
async function deleteDireccion(req: Request, res: Response): Promise<void>{
  try {
    const id = parseInt(req.params.id);
    const direccion = await direccionService.deleteDireccion(id);
    res.status(200).json(direccion);
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al borrar la direccion" });
    }
  }
}

export {
  getDireccion,
  getDireccionesCliente,
  updateDireccion,
  registerDireccion,
  deleteDireccion
}