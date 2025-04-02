import {z} from 'zod';
import { MetodoPago, TipoPedido } from '../../entities/Pedido';

export const PedidoCreateSchema = z.object({
  idCliente: z.number(),
  idDireccion: z.number(),
  metodoPago: z.nativeEnum(MetodoPago)
}); 