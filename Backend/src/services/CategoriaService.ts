import { Repository } from "typeorm";
import { contextDB } from "../config/database";
import { Categoria } from "../entities/Categoria";
import { ServiceError } from "../error/ServiceError";


export class CategoriaService{
  private readonly categoriaRepository: Repository<Categoria>;

  constructor(){
    this.categoriaRepository = contextDB.getRepository(Categoria);
  }

  async getCategorias(){
    return await this.categoriaRepository.find({
      order: {
        nombre: "ASC"
      }
    });
  }

  async getCategoria(idCategoria:number): Promise<Categoria>{
    const categoria = await this.categoriaRepository.findOneBy({id: idCategoria});
    if(!categoria){
      throw new ServiceError( `No existe categoria con id: ${idCategoria}`);
    }
    return categoria;
  }

  async createCategoria(categoria: Categoria): Promise<Categoria>{
    if(await this.existCategoria(categoria.nombre))
          throw new ServiceError("Ya existe esa categoria");

    const categoriaCreate = this.categoriaRepository.create(categoria);
    console.log(categoriaCreate);
    return await this.categoriaRepository.save(categoriaCreate);
  }

  async updateCategoria(categoria: Categoria): Promise<Categoria>{
    if(await this.existCategoria(categoria.nombre))
      throw new ServiceError("Ya existe esa categoria");

    const categoriaActualizada = await this.getCategoria(categoria.id);    
    categoriaActualizada.nombre = categoria.nombre;

    return await this.categoriaRepository.save(categoriaActualizada);
  }

  async deleteCategoria(id: number) : Promise<Categoria>{
    const entity = await this.getCategoria(id);
    return await this.categoriaRepository.remove(entity);
  }

  private async existCategoria(nombreCategoria: string): Promise<boolean>{
    return await this.categoriaRepository.existsBy({nombre: nombreCategoria});
  }
  async existCategoriaById(id: number): Promise<boolean>{
    return await this.categoriaRepository.existsBy({id: id});
  }

}