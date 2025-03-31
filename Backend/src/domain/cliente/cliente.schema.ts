import z from 'zod';

const passwordSchema = z.string().regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_&%$#])[A-Za-z\d\-_&%$#]{8,}$/,
  "La contraseña debe contener al menos 8 caracteres, incluyendo una mayuscula, una minuscula, un numero y caracter especial",
);
const emailSchema = z.string({
  required_error: 'El correo es campo requerido',
  invalid_type_error: 'El correo debe ser una cadena de caracteres válida'
}).email({ message: "Debe ser correo un correo válido" });

function asignarSchemaCliente(atributo: string){
  return z.string().regex(
    /^[A-Za-zÀ-ÖØ-öø-ÿñÑ\s'\-]{2,50}$/,
    `El ${atributo} debe contener solo letras, espacios, guiones o apóstrofes (2-50 caracteres)`
  )
}

export const ClienteCreateSchema = z.object({
  contrasena: passwordSchema,
  correo: emailSchema,
  nombre: asignarSchemaCliente('nombre'),
  apellidoPaterno: asignarSchemaCliente('apellido paterno'),
  apellidoMaterno: asignarSchemaCliente('apellido materno'),
});

export const ClienteLogInSchema = z.object({
  contrasena: passwordSchema,
  correo: emailSchema,
});