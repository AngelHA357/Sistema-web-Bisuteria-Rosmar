import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import multer, { MulterError } from 'multer';

const validateWithZod = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validación asíncrona del body
      await schema.parseAsync(req.body);

      // Si la validación es exitosa, seguimos al siguiente middleware
      next();
    } catch (error) {
      // Aseguramos que el error es de tipo ZodError
      if (error instanceof ZodError) {
        res.status(422).json({
          error: 'Validation error',
          details: error.errors
        });
        return;
      }

      // En caso de otro tipo de error
      res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      return;
    }
  };
};
const validateWithZodQuery = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).json({
          error: 'Validation error',
          details: error.errors
        });
        return;
      }
      res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      return;
    }
  };
};

// Middleware personalizado que procesa los campos de form-data pero no los archivos todavía
const validateAndUpload = (
  schema: z.ZodSchema,
  upload: multer.Multer
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Primero procesar SOLO los campos de texto con multer
      const fieldsMiddleware = upload.none();
      
      fieldsMiddleware(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ success: false, message: 'Error procesando form-data' });
        }
        
        try {
          // Ahora validar con Zod cuando ya tenemos los campos en req.body
          const parsed = schema.parse(req.body);
          
          // Si llegamos aquí, la validación fue exitosa, ahora procesamos el archivo
          const fileMiddleware = upload.single('files');
          
          fileMiddleware(req, res, (fileErr) => {
            if (fileErr) {
              if (fileErr instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: fileErr.message });
              } else {
                return res.status(400).json({ success: false, message: 'Error al subir los archivos' });
              }
            }
            
            // Todo está bien, continuar
            next();
          });
        } catch (zodError: any) {
          // Error de validación de Zod
          if (zodError instanceof z.ZodError) {
            return res.status(400).json({
              success: false,
              message: 'Error de validación',
              errors: zodError.errors
            });
          }
          throw zodError;
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  };
};

export {
  validateWithZod,
  validateAndUpload,
  validateWithZodQuery
};