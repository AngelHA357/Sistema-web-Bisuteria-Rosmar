import { DataSource } from "typeorm";
import 'dotenv/config'
import { Categoria } from "../entities/Categoria";
import { Direccion } from "../entities/Direccion";
import { Producto } from "../entities/Producto";
import { Cliente } from "../entities/Cliente";
import { Carrito } from "../entities/Carrito";
import { Pedido } from "../entities/Pedido";
import { PedidoProducto } from "../entities/PedidoProducto";


export const contextDB = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Categoria,
        Direccion,
        Producto,
        Cliente,
        Carrito,
        Pedido,
        PedidoProducto,
    ]
}) ;

contextDB.initialize();