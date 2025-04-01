import z from 'zod';

function validarTipo(atributo: string) {
  return {
    invalid_type_error: `${atributo} de la dirección debe ser una cadena de texto"`,
    required_error: `${atributo} de la dirección es requerido`
  }
}


const DireccionCreateSchema  = z.object({
  estado: z.string(validarTipo("El estado")),
  calle: z.string(validarTipo("La calle")),
  numeroExterior: z.string(validarTipo("El número exterior")),
  colonia: z.string(validarTipo("La colonia")),
  numeroInterior: z.string(validarTipo("El número interior")).optional(),
  codigoPostal: z.string(validarTipo("El código postal")),
  ciudad: z.string(validarTipo("La ciudad")),
  idCliente: z.number()
});


const  QueryCP = z.object({
  cp: z.string().regex(
      /^[0-9]{5}$/,"El formato de código postal es inválido deben ser 5 números")
});

const  QueryMunicipio = z.object({
  id_estado: z.string().regex(
      /^[0-9]{2,}$/,"El formato del id solo son números")
});

const QueryColonia = z.object({
  id_estado: z.string().regex(
      /^[0-9]{2,}$/,"El formato del id_estado solo son números"),
  id_mun: z.string().regex(
    /^[0-9]{2,}$/,"El formato del id_mun solo son números")
});

const DireccionUpdateSchema = DireccionCreateSchema.partial();


export {
  DireccionCreateSchema,
  DireccionUpdateSchema,
  QueryCP,
  QueryMunicipio,
  QueryColonia
}