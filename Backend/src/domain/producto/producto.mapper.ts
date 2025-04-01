import { Categoria } from "../../entities/Categoria";
import { Producto } from "../../entities/Producto";
import { CategoriaMapper } from "../categoria/categoria.mapper";
import { ProductoCreateDTO, ProductoDTO } from "./producto.dto";


export class ProductoMap{
  static ToDTO(entity: Producto): ProductoDTO{
    return {
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      precio: entity.precio,
      imagenes: entity.imagenes.slice(),
      categoria: CategoriaMapper.ToDTO(entity.categoria),
    }
  }

  static ToEntityFromCreate(dto: ProductoCreateDTO): Producto{
    let entity = new Producto();
    entity.nombre = dto.nombre;
    entity.descripcion = dto.descripcion;
    entity.precio = dto.precio;
    entity.categoria = new Categoria();
    entity.categoria.id = dto.categoria;
    entity.imagenes = dto.imagenes.map(img => `http://localhost:3000/img/productos/${img}`);
    return entity
  }


  //Esto es solo usable para la insersion masiva.
  static ToEntityFromInsercion(dto: ProductoCreateDTO): Producto{
    let entity = new Producto();
    entity.nombre = dto.nombre;
    entity.descripcion = dto.descripcion;
    entity.precio = dto.precio;
    entity.categoria = new Categoria();
    entity.categoria.id = dto.categoria;
    entity.imagenes = dto.imagenes.slice();
    return entity
  }


}