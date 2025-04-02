import {z} from 'zod';
import { PedidoCreateSchema } from './pedido.schema';

export type PedidoCreate = z.infer<typeof PedidoCreateSchema>;

export type PedidoDesc = {
  total_productos: number;
  total: number;
  envio: number;
}