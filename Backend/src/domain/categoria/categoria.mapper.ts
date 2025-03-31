import { Categoria } from "../../entities/Categoria";
import { CategoriaCreateDTO, CategoriaDTO, CategoriaUpdateDTO } from "./categoria.dto";

export class CategoriaMapper{

  static ToDTO(categoria: Categoria): CategoriaDTO{
    return {
      id: categoria.id,
      nombre: categoria.nombre
    }
  }

  static ToEntityFromCreate(categoriaDTO: CategoriaCreateDTO): Categoria{
    const categoria = new Categoria();
    categoria.nombre = categoriaDTO.nombre;
    return categoria;
  }

  static ToEntityFromUpdate(categoriaDTO: CategoriaUpdateDTO): Categoria{
    const categoria = new Categoria();
    categoria.id = categoriaDTO.id;
    categoria.nombre = categoriaDTO.nombre;
    return categoria;
  }
}