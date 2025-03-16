import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import path from 'path';
import { Categoria } from "../entities/Categoria";
import { Direccion } from "../entities/Direccion";
import { Producto } from "../entities/Producto";
import { Cliente } from "../entities/Cliente";
import { Carrito } from "../entities/Carrito";
import { Pedido } from "../entities/Pedido";
import { PedidoProducto } from "../entities/PedidoProducto";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const connection = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    dropSchema: true,
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

async function connectAndClose() {
    try {
        // Inicializa la conexión
        await connection.initialize();
        console.log("Conexión a la base de datos establecida");

        // Aquí irían las operaciones con la base de datos

    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    } finally {
        // Cierra la conexión una vez terminada la operación
        await connection.destroy();
        console.log("Conexión cerrada");
    }
}

connectAndClose();