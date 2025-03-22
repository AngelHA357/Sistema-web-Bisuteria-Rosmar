import z from 'zod';
import { CategoriaSchema } from './categoria.schema';

export type CategoriaCreateDTO = z.infer<typeof CategoriaSchema>
export type CategoriaUpdateDTO = {
  id: number;
  nombre: string;
}
export type CategoriaDTO = {
  id: number;
  nombre: string;
  // productos: ProductoDTO[];
}
