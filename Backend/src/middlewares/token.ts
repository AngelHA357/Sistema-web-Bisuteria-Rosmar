import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const SECRET_KEY = process.env.CLAVE_SUPER_SECRETOSA as string;

const BEARER = 'Bearer ';

export async function verifyAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.headers.authorization?.includes(BEARER)) {
      res.status(401).json({ message: "Acceso no autorizado" });
      return;
    }

    const token = req.headers.authorization.replace(BEARER, '');

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as any).user = decoded;
      next(); 
      
    } catch (error) {
      res.status(401).json({ message: "Token inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en la autenticación" });
  }
}