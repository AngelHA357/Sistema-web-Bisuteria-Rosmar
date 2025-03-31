import { DireccionCreateDTO } from "../domain/direccion/direccion.dto";
import { ProductoCreateDTO } from "../domain/producto/producto.dto";
import { TipoCliente } from "../entities/Cliente";
import { Direccion } from "../entities/Direccion";
import { createHashPassword } from "./encrypt";


const productosInsercion: ProductoCreateDTO[] = [
  {
    nombre: "Collar Perlas Elegante",
    descripcion: "Hermoso collar de perlas naturales con diseño clásico.",
    colores: ["#FFFFFF", "#FFD700"],
    precio: 259.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/484350913_656392170226223_820411654458778952_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=YXzlTftRsPMQ7kNvgEkSLDK&_nc_oc=AdlKAymI8SRRBFyT6WyDGyBy0U4oydlP2e1H1PftyE-EsPwJl9B42xoUmJ8o0wLYkTc&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=A1WDu-vCA1YQ1hCQuMwvPg&oh=00_AYHXQ4N6D-1lgBOcy11JSRFGl1gNEsyN_lWZ1LWXq-MmOA&oe=67E64223"],
    categoria: 1
  },
  {
    nombre: "Aretes de Oro Minimalistas",
    descripcion: "Aretes pequeños de oro con un diseño sofisticado.",
    colores: ["#FFD700"],
    precio: 199.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/484328921_656384583560315_6693046665235181408_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=LSPvUlOHADgQ7kNvgE9lkIa&_nc_oc=AdkNcz5XJyjqan92iGk3Ohu93gHpoaN1GlhG0W6AookxkF0-PoTf9Gdp_rpxc-RwWks&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=q2DzdzvnaTzp0U9tKLk6nA&oh=00_AYGovGttsCo0CWU0o_aIO0H0KXv1P-L4MeL0DdtfRf8kNw&oe=67E6596E"],
    categoria: 2
  },
  {
    nombre: "Pulsera de Cuentas Multicolor",
    descripcion: "Pulsera artesanal con cuentas de colores vibrantes.",
    colores: ["#FF5733", "#33FF57", "#3357FF"],
    precio: 89.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/481771254_651903487341758_1084773403351130009_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qG47xWAAC-AQ7kNvgG45MSr&_nc_oc=Adk5SSeayQCI3jxp97eQF4GdOWPbzfbgeKVMZ2YlvCVZmWdou60gO9G7Ftm_JYXe2OA&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=y_4VmdHoPVnoujmAj09fww&oh=00_AYFGvv-5EyPM1uhs6EzX3zakvLD1MVjNEEBhKrrU0EHgdg&oe=67E653B4"],
    categoria: 3
  },
  {
    nombre: "Collar con Dije de Corazón",
    descripcion: "Un delicado collar con un dije de corazón chapado en oro.",
    colores: ["#FFD700", "#E5E4E2"],
    precio: 149.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/481225798_649490974249676_7471659358642886970_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=vi66aCKqepAQ7kNvgGFyKBj&_nc_oc=AdnLIuG5SIEygOF_UrRWEEnQh8eKTKtJsLQZ1cBoHiL4VM8zAk6DDEwKD8SEMpgezPE&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=y02wAHDzOxfFQvceFCrGsQ&oh=00_AYHMXLH5vYTNASbsOH_2KRvarxV0MuiMYacKPQnYUaTsvw&oe=67E64CDE"],
    categoria: 1
  },
  {
    nombre: "Aretes de Plata con Zirconia",
    descripcion: "Aretes de plata con zirconia cúbica para un brillo especial.",
    colores: ["#C0C0C0"],
    precio: 129.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/484171365_656384646893642_8389676014816399857_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=OLtBNY2dVYMQ7kNvgHpKQWT&_nc_oc=AdnizFTKeoVfqpnJ9JSZGR73Cuguzh3utkN_8RwJdPQECE9eJXgvoTmaBEA0EvAPKmU&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=70kdEvWdux3bSQznDpqq5g&oh=00_AYHCNiz855uoDuoy86JoJiXho4SrcQadP7ZrxDR1nvXnQw&oe=67E63939"],
    categoria: 2
  },
  {
    nombre: "Pulsera de Cuero Ajustable",
    descripcion: "Pulsera unisex de cuero con cierre ajustable.",
    colores: ["#8B4513", "#000000"],
    precio: 109.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/482009493_650033530862087_4730789871960272478_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=i1oymD5nrisQ7kNvgFU4zHF&_nc_oc=AdlJgU76A-5yMIFled3U0hyRs_I7HwtkkcolUHzB-6TtWY40v3CMVVt4ApSHaWxYZcE&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=USeSjNm58oj6DFW0k5H-Jg&oh=00_AYEWXTRGxAsaFD_rP3sHLlpRc-OiaaiiIo56vWL7xqxzkg&oe=67E6398F"],
    categoria: 3
  },
  {
    nombre: "Collar con Piedras Naturales",
    descripcion: "Collar largo con piedras naturales de diferentes colores.",
    colores: ["#A52A2A", "#5F9EA0", "#D2691E"],
    precio: 179.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/481452458_651066720758768_3769090851382930258_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_km1CCtCNf8Q7kNvgG4z2DM&_nc_oc=AdnvQoNvVRv7W0cJtpDyk9m-JSKWdiCtV2xeVaOEsHIrH97ivtOkv1HMslg-VMPM2bc&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=W4nKE27QRNrs-xLpNgs7Ng&oh=00_AYHmiU66CzWTBo236WRAYkiFFqR-Iq_zw9Axrgqh0uq1pA&oe=67E62A33"],
    categoria: 1
  },
  {
    nombre: "Aretes de Acero Inoxidable",
    descripcion: "Aretes resistentes y elegantes de acero inoxidable.",
    colores: ["#808080", "#000000"],
    precio: 99.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/484075721_656384546893652_6540463011551668552_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CYNMhiLqOIIQ7kNvgGdqGVf&_nc_oc=AdkfmNNbcWsxic5-GK3_BH0FTfuRli84RemQ8jaC9P2x01fNATKI1joTcC5Z16M1Dsk&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=_EnxMN7DqIDtYy3HptqRVA&oh=00_AYE7bJ1nPh-H1x_tp5tczJnHHNb1FvIDDWa2TQOhBSHwug&oe=67E63D90"],
    categoria: 2
  },
  {
    nombre: "Pulsera con Dijes de Estrellas",
    descripcion: "Pulsera con pequeños dijes de estrellas doradas.",
    colores: ["#FFD700", "#E5E4E2"],
    precio: 119.99,
    imagenes: ["https://scontent.fcen4-1.fna.fbcdn.net/v/t39.30808-6/482026408_651066467425460_244603235940492449_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nw9xculqpRkQ7kNvgGFoOPX&_nc_oc=Adk4529SRfI0NYk2ebjakFnwghNGixXlN26c0qmo18FmAeREyPpo-9d01TSAYK4W8fw&_nc_zt=23&_nc_ht=scontent.fcen4-1.fna&_nc_gid=wkvNyyal1F6Zdoncf99vMw&oh=00_AYGJs6kj39IsJbMQGHJblCBquR_U0w3PoWVWCOaJHixHNg&oe=67E62B4F"],
    categoria: 3
  }
]

const categoriasInsercion = [
  { nombre: "Pulseras" },
  { nombre: "Aretes" },
  { nombre: "Collares" },
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