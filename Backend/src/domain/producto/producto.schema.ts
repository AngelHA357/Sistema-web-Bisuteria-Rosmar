import z from 'zod';

function validarTipo(atributo: string) {
  return {
    invalid_type_error: `${atributo} del producto debe ser una cadena de texto"`,
    required_error: `${atributo} del producto es requerido`
  }
}
// export const ProductoCreateSchema = z.object({
//   nombre: z.string(valideType("El nombre")).min(6, { message: "La longitud minima del producto es de 6 caracteres" }),
//   descripcion: z.string(valideType("La descripción"))
//     .min(20, { message: "La descripción del producto debe ser de minimo 20 caractes" })
//     .max(200, { message: "La descripción del producto debe ser máximo de 200 caracteres" }),
//   colores: z.string(valideType("Los colores"))
//     .regex(/^#[A-F0-9]{6}$/, { message: "Los colores deben cumplir con el código hexadecimal" })
//     .array().nonempty({ message: "Los colores no pueden estar vacios" }),
//   precio: z.number({
//     invalid_type_error: "El precio del producto debe ser una valores numericos",
//     required_error: "El precio del producto es requerido"
//   })
//     .positive({ message: "El precio debe ser un valor positivo" }),
//   imagenes: z.string(valideType("Las imagenes"))
//     .regex(/^.+\.(png|jpe?g|webp)$/, { message: "Los archivos deben ser .png/.jpeg/.png/.webp" })
//     .array().nonempty({ message: "Las imagenes del producto deben ser incluidas" }),
//   categoria: z.number({
//     invalid_type_error: "La categoria del producto debe ser un valor numerico",
//     required_error: "La categoria del producto es requerida"
//   })
// });


// Esquema para los demás campos
// export const ProductoCreateSchema = z.object({
//   nombre: z.string(valideType("El nombre")).min(10, { 
//     message: "La longitud mínima del producto es de 10 caracteres" 
//   }),
//   descripcion: z.string(valideType("La descripción"))
//     .min(20, { message: "La descripción del producto debe ser de mínimo 20 caracteres" })
//     .max(200, { message: "La descripción del producto debe ser máximo de 200 caracteres" }),
//   colores: z.preprocess(
//     // Convertir string JSON a array si viene como string
//     (val) => typeof val === 'string' ? JSON.parse(val) : val,
//     z.array(
//       z.string().regex(/^#[A-F0-9]{6}$/, { 
//         message: "Los colores deben cumplir con el código hexadecimal" 
//       })
//     ).nonempty({ message: "Los colores no pueden estar vacíos" })
//   ),
//   precio: z.preprocess(
//     // Convertir string a número si viene como string
//     (val) => typeof val === 'string' ? Number(val) : val,
//     z.number({
//       invalid_type_error: "El precio del producto debe ser un valor numérico",
//       required_error: "El precio del producto es requerido"
//     }).positive({ message: "El precio debe ser un valor positivo" })
//   ),
//   categoria: z.preprocess(
//     // Convertir string a número si viene como string
//     (val) => typeof val === 'string' ? Number(val) : val,
//     z.number({
//       invalid_type_error: "La categoría del producto debe ser un valor numérico",
//       required_error: "La categoría del producto es requerida"
//     })
//   )
// });

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