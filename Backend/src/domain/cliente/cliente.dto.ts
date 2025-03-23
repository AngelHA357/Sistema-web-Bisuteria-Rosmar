import z from 'zod';
import { ClienteCreateSchema, ClienteLogInSchema, } from './cliente.schema';

export type ClienteCreateDTO = z.infer<typeof ClienteCreateSchema>;
export type ClienteLogInDTO = z.infer<typeof ClienteLogInSchema>;


export type ClienteDTO = {
  id:number;
  tipo:string;
  correo:string;
  nombre:string;
  apellidoPaterno:string;
  apellidoMaterno:string;
}