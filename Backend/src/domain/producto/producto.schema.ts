import z from 'zod';

function validarTipo(atributo: string) {
  return {
    invalid_type_error: `${atributo} del producto debe ser una cadena de texto"`,
    required_error: `${atributo} del producto es requerido`
  }
}

export const ProductoCreateSchema = z.object({
  nombre: z.string(validarTipo("El nombre")).min(6, { 
    message: "La longitud mínima del producto es de 6 caracteres" 
  }),
  descripcion: z.string(validarTipo("La descripción"))
    .min(20, { message: "La descripción del producto debe ser de mínimo 20 caracteres" })
    .max(200, { message: "La descripción del producto debe ser máximo de 200 caracteres" }),
  precio: 
    z.number({
      invalid_type_error: "El precio del producto debe ser un valor numérico",
      required_error: "El precio del producto es requerido"
    }).positive({ message: "El precio debe ser un valor positivo" })
  ,
  categoria: z.number({
      invalid_type_error: "La categoría del producto debe ser un valor numérico",
      required_error: "La categoría del producto es requerida"
    })
});