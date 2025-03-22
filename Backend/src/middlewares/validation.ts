import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

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

export default validateWithZod;