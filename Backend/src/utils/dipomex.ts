import 'dotenv/config'
import { CodigoPostalDTO, ColoniaDTO, DIPOMEX_COLONIA, DIPOMEX_CP, DIPOMEX_Estado, DIPOMEX_MUN, EstadoDTO, MunicipioDTO } from '../types/direcciones.types';
const API_KEY = process.env.API_KEY_DIPOMEX;
const API_URL = process.env.API_URL_DIPOMEX


async function findCodigoPostal(cp: string): Promise<CodigoPostalDTO>{
  const url = `${API_URL}/codigo_postal?cp=${cp}`;

  const init: RequestInit = {headers: {
    'content-type': 'application/json;charset=UTF-8',
    "APIKEY": API_KEY as string,

  }};
  console.log("lol")
  const cura =  await  fetch(url, init);
  console.log(cura)
  const data: DIPOMEX_CP = await cura.json();
  console.log(data)

  return data.codigo_postal;
}

async function getEstados(): Promise<EstadoDTO[]>{
  const url = `${API_URL}/estados`;

  const init: RequestInit = {headers: {
    'content-type': 'application/json;charset=UTF-8',
    "APIKEY": API_KEY as string,

  }};
  const cura =  await  fetch(url, init);
  const data: DIPOMEX_Estado = await cura.json();

  return data.estados;
}
async function getMunicipios(id: string): Promise<MunicipioDTO[]>{
  const url = `${API_URL}/municipios?id_estado=${id}`;

  const init: RequestInit = {headers: {
    'content-type': 'application/json;charset=UTF-8',
    "APIKEY": API_KEY as string,

  }};
  const cura =  await  fetch(url, init);
  const data: DIPOMEX_MUN = await cura.json();

  return data.municipios;
}
async function getColonias(idEstado: string, idMunicipio: string): Promise<ColoniaDTO[]>{
  const url = `${API_URL}/colonias?id_estado=${idEstado}&id_mun=${idMunicipio}`;

  const init: RequestInit = {headers: {
    'content-type': 'application/json;charset=UTF-8',
    "APIKEY": API_KEY as string,

  }};
  const cura =  await  fetch(url, init);
  const data: DIPOMEX_COLONIA = await cura.json();

  return data.colonias;
}


export {
  findCodigoPostal,
  getEstados,
  getColonias,
  getMunicipios
}