

export type DIPOMEX_CP = {
 error: boolean;
 message: string;
 codigo_postal: CodigoPostalDTO;
}
export type DIPOMEX_Estado = {
 error: boolean;
 message: string;
 estados: EstadoDTO[];
}
export type DIPOMEX_MUN = {
 error: boolean;
 message: string;
 municipios: MunicipioDTO[];
}
export type DIPOMEX_COLONIA = {
 error: boolean;
 message: string;
 colonias: ColoniaDTO[];
}

export type CodigoPostalDTO = {
  estado_id: number;
  municipio_id: number;
  estado: string;
  estado_abreviatura: string;
  municipio: string;
  colonias: ColoniaDTO[];

}

export type EstadoDTO  = {
  ESTADO_ID: string;
  ESTADO: string;
}

export type MunicipioDTO = {
  ESTADO_ID: string;
  MUNICIPIO_ID: string;
  MUNICIPIO: string;
}

export type ColoniaDTO = {
  COLONIA_ID: number;
  COLONIA: string;
  CP: string;
  MUNICIPIO_ID: string;
}