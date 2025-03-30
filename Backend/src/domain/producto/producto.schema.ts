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
  colores: 
    z.array(
      z.string().regex(/^#[A-F0-9]{6}$/, { 
        message: "Los colores deben cumplir con el código hexadecimal" 
      })
    ).nonempty({ message: "Los colores no pueden estar vacíos" })
  ,
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
// export const ProductoCreateSchema = z.object({
//   nombre: z.string(validarTipo("El nombre")).min(6, { 
//     message: "La longitud mínima del producto es de 6 caracteres" 
//   }),
//   descripcion: z.string(validarTipo("La descripción"))
//     .min(20, { message: "La descripción del producto debe ser de mínimo 20 caracteres" })
//     .max(200, { message: "La descripción del producto debe ser máximo de 200 caracteres" }),
//   colores: z.preprocess(
//     // Convertir de string JSON a array cuando sea necesario
//     (val) => {
//       if (typeof val === 'string') {
//         try {
//           return JSON.parse(val);
//         } catch (e) {
//           return val; // Si no es un JSON válido, dejarlo como está
//         }
//       }
//       return val;
//     },
//     z.array(
//       z.string().regex(/^#[A-F0-9]{6}$/, { 
//         message: "Los colores deben cumplir con el código hexadecimal" 
//       })
//     ).nonempty({ message: "Los colores no pueden estar vacíos" })
//   ),
//   precio: z.preprocess(
//     // Convertir string a número
//     (val) => typeof val === 'string' ? Number(val) : val,
//     z.number({
//       invalid_type_error: "El precio del producto debe ser un valor numérico",
//       required_error: "El precio del producto es requerido"
//     }).positive({ message: "El precio debe ser un valor positivo" })
//   ),
//   categoria: z.preprocess(
//     (val) => typeof val === 'string' ? Number(val) : val,
//     z.number({
//       invalid_type_error: "La categoría del producto debe ser un valor numérico",
//       required_error: "La categoría del producto es requerida"
//     })
//   )
// });