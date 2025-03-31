import { DataSource } from "typeorm";
import 'dotenv/config'
import { Categoria } from "../entities/Categoria";
import { Direccion } from "../entities/Direccion";
import { Producto } from "../entities/Producto";
import { Cliente} from "../entities/Cliente";
import { Carrito } from "../entities/Carrito";
import { Pedido } from "../entities/Pedido";
import { PedidoProducto } from "../entities/PedidoProducto";
import { categoriasInsercion, clientesInsercion, direccionInsercion, productosInsercion } from "../utils/insersionMasiva";
import { ProductoMap } from "../domain/producto/producto.mapper";
import { DireccionMap } from "../domain/direccion/direccion.mapper";


const contextDB = new DataSource({
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
        await contextDB.initialize();
        console.log("Conexión a la base de datos establecida");
        await insertarDatosIniciales();
        // Aquí irían las operaciones con la base de datos

    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    } finally {
        // Cierra la conexión una vez terminada la operación
        await contextDB.destroy();
        console.log("Conexión cerrada");
    }
}


// Función para insertar datos iniciales
async function insertarDatosIniciales() {
    try {
        const categoriaRepository = contextDB.getRepository(Categoria);
        const clienteRepository = contextDB.getRepository(Cliente);
        const productoRepository = contextDB.getRepository(Producto);
        const direccionRepository = contextDB.getRepository(Direccion);
        
        const productos = productosInsercion.map(p=> ProductoMap.ToEntityFromInsercion(p));
        const direcciones = direccionInsercion.map(d=> DireccionMap.ToEntityFromCreate(d));
        for (const categoriaData of categoriasInsercion) {
            const categoria = categoriaRepository.create(categoriaData);
            await categoriaRepository.save(categoria);
        }
        for (const clienteData of clientesInsercion) {
            const cliente = clienteRepository.create(clienteData);
            await clienteRepository.save(cliente);
        }
        for (const producto of productos) {
            const pro:Producto = productoRepository.create(producto);
            await productoRepository.save(pro);
        }
        for (const direccion of direcciones) {
            const direc:Direccion = direccionRepository.create(direccion);
            await direccionRepository.save(direc);
        }
        

        
        console.log("Datos iniciales insertados correctamente");
    } catch (error) {
        console.error("Error al insertar datos iniciales:", error);
    }
}


connectAndClose();