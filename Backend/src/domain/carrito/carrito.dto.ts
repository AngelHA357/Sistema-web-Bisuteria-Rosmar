import { ProductoDTO } from "../producto/producto.dto";

type ProductoCarritoCreateDTO = {
  idCliente: number;
  idProducto: number;
  cantidad: number;
}


type ElementoCarritoDTO = {
  id: number;
  cantidad: number;
  producto: ProductoDTO;
}

type CarritoDTO = {
  total: number;
  listado: ElementoCarritoDTO[];
}

type CarritoUpdateDTO = {
  idCliente: number;
  idProducto: number;
}

export {
  ProductoCarritoCreateDTO,
  ElementoCarritoDTO,
  CarritoDTO,
  CarritoUpdateDTO
}