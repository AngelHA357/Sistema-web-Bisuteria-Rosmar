import { Request, Response } from "express";
import { ServiceError } from "../error/ServiceError";
import { ClienteCreateDTO, ClienteLogInDTO } from "../domain/cliente/cliente.dto";
import { ClienteService } from "../services/ClienteService";
import { ClienteMapper } from "../domain/cliente/cliente.mapper";
import { createJWT } from "../utils/jwt";

const clienteService = new ClienteService();
async function getCliente(req: Request, res: Response) {
  try {

  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al consultar al cliente" });
    }
  }
}

async function registerCliente(req: Request<{},{},ClienteCreateDTO>, res: Response): Promise<void> {
  try {
    const dto = req.body;
    let cliente = ClienteMapper.ToEntityFromCreate(dto);
    cliente = await clienteService.createCliente(cliente);
    // const clienteDTO = ClienteMapper.ToDTO(cliente);
    res.status(201).json({message: "Se creo exitosamente el cliente"})
  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al registrar al cliente" });
    }
  }
}

async function signOutCliente(req: Request, res: Response): Promise<void> {
  try {

  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al cerrar sesión" });
    }
  }
}

async function logInCliente(req: Request<{}, {}, ClienteLogInDTO>, res: Response): Promise<void> {
  try {
    const dto = req.body;
    let cliente = ClienteMapper.ToEntityFromLogIn(dto);

    const clienteCreado = await clienteService.existCliente(cliente);

    const clienteDTO = ClienteMapper.ToDTO(clienteCreado);
     res.status(200).json({token: createJWT(clienteDTO)})

  } catch (error) {
    if (error instanceof ServiceError) {
      res.status(400).send({ message: error.mensaje });
    } else {
      res.status(400).send({ message: "Error al iniciar sesión" });
    }
  }
}

export {
  getCliente,
  registerCliente,
  signOutCliente,
  logInCliente
}