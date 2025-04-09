import { DireccionCreateDTO } from "../domain/direccion/direccion.dto";
import { ProductoCreateDTO } from "../domain/producto/producto.dto";
import { TipoCliente } from "../entities/Cliente";
import { Direccion } from "../entities/Direccion";
import { createHashPassword } from "./encrypt";


const productosInsercion: ProductoCreateDTO[] = [
  {
    nombre: "Collar Perlas Elegante",
    descripcion: "Hermoso collar de perlas naturales con diseño clásico.",
    precio: 259.99,
    imagenes: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 1
  },
  {
    nombre: "Aretes de Oro Minimalistas",
    descripcion: "Aretes pequeños de oro con un diseño sofisticado.",
    precio: 199.99,
    imagenes: ["https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 2
  },
  {
    nombre: "Collar con Dije de Corazón",
    descripcion: "Un delicado collar con un dije de corazón chapado en oro.",
    precio: 149.99,
    imagenes: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 1
  },
  {
    nombre: "Aretes de Plata con Zirconia",
    descripcion: "Aretes de plata con zirconia cúbica para un brillo especial.",
    precio: 129.99,
    imagenes: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 2
  },
  {
    nombre: "Pulsera de Cuero Ajustable",
    descripcion: "Pulsera unisex de cuero con cierre ajustable.",
    precio: 109.99,
    imagenes: ["https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 3
  },
  {
    nombre: "Collar con Piedras Naturales",
    descripcion: "Collar largo con piedras naturales de diferentes colores.",
    precio: 179.99,
    imagenes: ["https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 1
  },
  {
    nombre: "Aretes de Acero Inoxidable",
    descripcion: "Aretes resistentes y elegantes de acero inoxidable.",
    precio: 99.99,
    imagenes: ["https://images.unsplash.com/photo-1561172478-a203d9c8290e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 2
  },
  {
    nombre: "Pulsera con Dijes de Estrellas",
    descripcion: "Pulsera con pequeños dijes de estrellas doradas.",
    precio: 119.99,
    imagenes: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 3
  },
  {
    nombre: "Set de Brazaletes Dorados",
    descripcion: "Conjunto de tres brazaletes delgados bañados en oro de 18k.",
    precio: 189.99,
    imagenes: ["https://images.unsplash.com/photo-1603561596112-0a132b757442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 3
  },
  {
    nombre: "Aretes Largos con Cristales",
    descripcion: "Aretes colgantes con cristales transparentes de estilo Art Deco.",
    precio: 159.99,
    imagenes: ["https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 2
  },
  {
    nombre: "Tobillera de Plata con Cascabeles",
    descripcion: "Tobillera delicada de plata con pequeños dijes de cascabel.",
    precio: 69.99,
    imagenes: ["https://images.unsplash.com/photo-1549298222-1c31e8915347?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 5
  },
  {
    nombre: "Pulsera de Hilo Trenzado",
    descripcion: "Pulsera artesanal de hilos trenzados en tonos pastel.",
    precio: 49.99,
    imagenes: ["https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 3
  },
  {
    nombre: "Anillo Solitario con Circonita",
    descripcion: "Anillo minimalista con circonita brillante de corte princesa.",
    precio: 129.99,
    imagenes: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 4
  },
  {
    nombre: "Collar con Medallón Vintage",
    descripcion: "Collar largo con medallón antiguo que puede abrirse para guardar fotos.",
    precio: 199.99,
    imagenes: ["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    categoria: 1
  }
]

const categoriasInsercion = [
  { nombre: "Collares" },
  { nombre: "Aretes" },
  { nombre: "Pulseras" },
  { nombre: "Plumas" },
  { nombre: "Otros" }
];

const clientesInsercion = [
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

const direccionInsercion: DireccionCreateDTO[] = [
  {
    calle: "Dressrosa",
    codigoPostal: "666666",
    colonia: "Grand Line",
    estado: "One Piece",
    numeroExterior: "777",
    numeroInterior: "",
    ciudad: "Water 7",
    idCliente: 4
  },
  {
    idCliente: 4,
    calle: "Thousand Sunny",
    codigoPostal: "123456",
    colonia: "Grand Line",
    estado: "One Piece",
    numeroExterior: "1",
    numeroInterior: "",
    ciudad: "Water 7",
  },
  {
    idCliente: 5,
    calle: "Hogwarts Castle",
    codigoPostal: "789012",
    colonia: "Wizarding World",
    estado: "Magic Realm",
    numeroExterior: "9¾",
    numeroInterior: "",
    ciudad: "Water 7",
  },
  {
    idCliente: 3,
    calle: "Stark Tower",
    codigoPostal: "100100",
    colonia: "Avengers HQ",
    estado: "New York",
    numeroExterior: "10",
    numeroInterior: "A",
    ciudad: "Water 7",
  },
  {
    idCliente: 6,
    calle: "Naboo Royal Palace",
    codigoPostal: "543210",
    colonia: "Galactic Republic",
    estado: "Star Wars",
    numeroExterior: "42",
    numeroInterior: "",
    ciudad: "Water 7",
  },
  {
    idCliente: 5,
    calle: "Winterfell",
    codigoPostal: "987654",
    colonia: "North",
    estado: "Westeros",
    numeroExterior: "7",
    numeroInterior: "B",
    ciudad: "Water 7",
  },
  {
    idCliente: 3,
    calle: "Mount Olympus",
    codigoPostal: "246810",
    colonia: "Greek Pantheon",
    estado: "Mythical Realm",
    numeroExterior: "12",
    numeroInterior: "",
    ciudad: "Water 7",
  },
  {
    idCliente: 6,
    calle: "Batcave",
    codigoPostal: "135790",
    colonia: "Gotham City",
    estado: "DC Universe",
    numeroExterior: "23",
    numeroInterior: "C",
    ciudad: "Water 7",
  },
  {
    idCliente: 4,
    calle: "Xavier's School",
    codigoPostal: "369258",
    colonia: "Mutant Town",
    estado: "X-Men World",
    numeroExterior: "15",
    numeroInterior: "",
    ciudad: "Water 7",
  },
  {
    idCliente: 5,
    calle: "Rivendell",
    codigoPostal: "147258",
    colonia: "Elven Realm",
    estado: "Middle Earth",
    numeroExterior: "33",
    numeroInterior: "D",
    ciudad: "Water 7",
  },
  {
    idCliente: 6,
    calle: "SHIELD Helicarrier",
    codigoPostal: "246801",
    colonia: "Airborne HQ",
    estado: "Marvel Universe",
    numeroExterior: "88",
    numeroInterior: "E",
    ciudad: "Water 7",
  }
]

export {
  clientesInsercion,
  productosInsercion,
  categoriasInsercion,
  direccionInsercion
}