import { Cliente, TipoCliente } from "../../entities/Cliente";
import { createHashPassword } from "../../utils/encrypt";
import { ClienteCreateDTO, ClienteDTO, ClienteLogInDTO } from "./cliente.dto";


export class ClienteMapper{

  static ToDTO(cliente: Cliente): ClienteDTO{
    return {
      id: cliente.id,
      nombre: cliente.nombre,
      apellidoMaterno: cliente.apellidoMaterno,
      apellidoPaterno: cliente.apellidoPaterno,
      correo: cliente.correo,
      tipo: cliente.tipo.toString()
    }
  }

  static ToEntityFromCreate(clienteDTO: ClienteCreateDTO): Cliente{
    const cliente = new Cliente();
    cliente.tipo = TipoCliente.NORMAL;
    cliente.contrasena = createHashPassword(clienteDTO.contrasena);
    cliente.apellidoMaterno = clienteDTO.apellidoMaterno;
    cliente.apellidoPaterno = clienteDTO.apellidoPaterno;
    cliente.correo = clienteDTO.correo;
    cliente.nombre = clienteDTO.nombre;
    return cliente;
  }
  static ToEntityFromLogIn(clienteDTO: ClienteLogInDTO): Cliente{
    const cliente = new Cliente();
    cliente.contrasena = createHashPassword(clienteDTO.contrasena);
    cliente.correo = clienteDTO.correo;
    return cliente;
  }
}