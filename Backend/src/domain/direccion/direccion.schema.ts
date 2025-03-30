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


const DireccionUpdateSchema = DireccionCreateSchema.partial();


export {
  DireccionCreateSchema,
  DireccionUpdateSchema
}