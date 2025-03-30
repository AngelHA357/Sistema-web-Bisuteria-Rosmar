import z from 'zod';
import { DireccionCreateSchema } from './direccion.schema';

type DireccionCreateDTO = z.infer<typeof DireccionCreateSchema>;

type DireccionUpdateDTO = {
  id: number;
  colonia?: string;
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  estado?: string;
  codigoPostal?: string;
  ciudad?: string;
}

type DireccionDTO = {
  id: number;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  estado: string;
  codigoPostal: string;
  ciudad: string;
}

export {DireccionCreateDTO, DireccionUpdateDTO, DireccionDTO}