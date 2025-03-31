import { CategoriaDTO } from '../categoria/categoria.dto';


export type ProductoCreateDTO = {
  nombre: string;
  descripcion: string;
  colores: string[];
  precio: number;
  imagenes: string[];
  categoria: number;
}
export type ProductoDTO = {
  id: number;
  nombre: string;
  descripcion: string;
  colores: string[];
  precio: number;
  imagenes: string[];
  categoria: CategoriaDTO;
}