import z from 'zod';
import { ClienteCreateSchema, ClienteLogInSchema, } from './cliente.schema';
import { CategoriaDTO } from '../categoria/categoria.dto';

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