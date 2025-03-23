import { DataSource } from "typeorm";
import 'dotenv/config'
import { Categoria } from "../entities/Categoria";
import { Direccion } from "../entities/Direccion";
import { Producto } from "../entities/Producto";
import { Cliente, TipoCliente } from "../entities/Cliente";
import { Carrito } from "../entities/Carrito";
import { Pedido } from "../entities/Pedido";
import { PedidoProducto } from "../entities/PedidoProducto";
import { createHashPassword } from "../utils/encrypt";


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
        const categorias = [
            { nombre: "Pulseras" },
            { nombre: "Aretes" },
            { nombre: "Collares" },
            { nombre: "Plumas" },
            { nombre: "Otros" }
        ];

        const admins= [
            {
                correo: 'bisuteria@rosmar.com',
                nombre: 'Rosa María',
                apellidoPaterno: 'Amparán',
                apellidoMaterno: 'Castañeda',
                contrasena: createHashPassword('Admin_123'),
                tipo: TipoCliente.ADMINISTRADOR,
            },
            {
                correo: 'admin@admin.com',
                nombre: 'Elva Lizeth',
                apellidoPaterno: 'Gutierrez',
                apellidoMaterno: 'Mendivil',
                contrasena: createHashPassword('Admin_123'),
                tipo: TipoCliente.ADMINISTRADOR,
            },
            {
                correo: 'wacho@gmail.com',
                nombre: 'Jose Angel',
                apellidoPaterno: 'Huerta',
                apellidoMaterno: 'Amparán',
                contrasena: createHashPassword('Wacho_27'),
                tipo: TipoCliente.NORMAL,
            },
            {
                correo: 'karim@gmail.com',
                nombre: 'Jose Karim',
                apellidoPaterno: 'Franco',
                apellidoMaterno: 'Valencia',
                contrasena: createHashPassword('Karim_27'),
                tipo: TipoCliente.NORMAL,
            },
            {
                correo: 'victor@gmail.com',
                nombre: 'Victor Humberto',
                apellidoPaterno: 'Encinas',
                apellidoMaterno: 'Guzman',
                contrasena: createHashPassword('Toroo_15'),
                tipo: TipoCliente.NORMAL,
            },
            {
                correo: 'pablo@gmail.com',
                nombre: 'Pablo Cesar',
                apellidoPaterno: 'Flores',
                apellidoMaterno: 'Bautista',
                contrasena: createHashPassword('Pablo_05'),
                tipo: TipoCliente.NORMAL,
            }
        ]
        
        for (const categoriaData of categorias) {
            const categoria = categoriaRepository.create(categoriaData);
            await categoriaRepository.save(categoria);
        }
        for (const clienteData of admins) {
            const cliente = clienteRepository.create(clienteData);
            await clienteRepository.save(cliente);
        }
        

        
        console.log("Datos iniciales insertados correctamente");
    } catch (error) {
        console.error("Error al insertar datos iniciales:", error);
    }
}


connectAndClose();