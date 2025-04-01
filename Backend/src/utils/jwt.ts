import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { ClienteDTO } from '../domain/cliente/cliente.dto';

const SECRET_KEY = process.env.CLAVE_SUPER_SECRETOSA as string;

export function createJWT(cliente: ClienteDTO){
  return jwt.sign({
    cliente_id: cliente.id,
    tipo: cliente.tipo,
    nombre: `${cliente.nombre} ${cliente.apellidoPaterno}`
  },
  SECRET_KEY,{
    expiresIn: 100
  });
}
