import z from 'zod';

export const CategoriaSchema = z.object({
  nombre: z.string(
    {
      required_error: 'El nombre es campo requerido',
      invalid_type_error: 'El nombre debe ser una cadena de caracteres válida'
    })
    .min(4, {message: 'El nombre debe ser de minimo 4 caracteres' })
    .max(20, {message: 'El nombre no debe ser superior a los 20 caracteres'})
});

const hasAndId = z.object({
  id: z.number(
  {
    required_error: 'El id es campo requerido',
    invalid_type_error: 'El id debe ser un número entero'
  })
}
)

export const UpdateCategoriaSchema = hasAndId.merge(CategoriaSchema);