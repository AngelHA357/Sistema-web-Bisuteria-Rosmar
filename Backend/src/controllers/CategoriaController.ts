import { CategoriaService } from "../services/CategoriaService";
import { Request, Response } from "express";
import { NotFound } from "../types/Error";
import { CategoriaCreateDTO, CategoriaDTO, CategoriaUpdateDTO } from "../domain/categoria/categoria.dto";
import { CategoriaMapper } from "../domain/categoria/categoria.mapper";
import { ServiceError } from "../error/ServiceError";


const categoriaService = new CategoriaService();

async function getCategorias(req:Request, res: Response<CategoriaDTO[] | NotFound>): Promise<void> {
  try{
    const categorias = await categoriaService.getCategorias();
    const categoriasDTO = categorias.map((categoria) => CategoriaMapper.ToDTO(categoria));
    res.status(200).send(categoriasDTO);
  }catch(error){
    res.status(400).send({message: "Error al consultar categorias"}) ;
  }
}

async function getCategoria(req: Request, res: Response<CategoriaDTO | NotFound>): Promise<void> {
  try{
    const id = parseInt(req.params.id);
    const categoria = await categoriaService.getCategoria(id);
    res.status(200).send(CategoriaMapper.ToDTO(categoria)); 
  }catch(error){
    if(error instanceof ServiceError) {
      res.status(400).send({message: error.mensaje}) ;
    } else {
      res.status(400).send({message: "Error al consultar categoria"}) ;
    }
  }
}

async function createCategoria(req: Request, res: Response): Promise<void> {
  try{
    const categoriaDTO: CategoriaCreateDTO = req.body;
    const categoria = CategoriaMapper.ToEntityFromCreate(categoriaDTO);
    const categoriaCreada = await categoriaService.createCategoria(categoria);
    res.status(201).send(CategoriaMapper.ToDTO(categoriaCreada));    
  }catch(error){
    if(error instanceof ServiceError) {
      res.status(400).send({message: error.mensaje}) ;
    } else {
      res.status(400).send({message: "Error en la agregación de la consulta"}) ;
    }
  }
}

async function updateCategoria(req: Request, res: Response): Promise<void> {
  try{
    let categoriaDTO: CategoriaUpdateDTO = req.body;
    let categoria = CategoriaMapper.ToEntityFromUpdate(categoriaDTO);
    const categoriaActualizada = await categoriaService.updateCategoria(categoria);
    res.status(200).send(CategoriaMapper.ToDTO(categoriaActualizada));    
  }catch(error){
    if(error instanceof ServiceError){
      res.status(400).send({message: error.mensaje}) ;
    }else {
      res.status(400).send({message: "Error en la eliminación de la consulta"}) ;
    }
  }
}

async function deleteCategoria(req: Request, res: Response): Promise<void>{
  try{
    let id: number = parseInt(req.params.id);
    const categoriaBorrada = await categoriaService.deleteCategoria(id);
    
    res.status(200).send(CategoriaMapper.ToDTO(categoriaBorrada));    
  }catch(error){
    if(error instanceof ServiceError){
      res.status(400).send({message: error.mensaje}) ;
    }else {
      res.status(400).send({message: "Error en la eliminación de la consulta"}) ;
    }
  }
}



export {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria
}