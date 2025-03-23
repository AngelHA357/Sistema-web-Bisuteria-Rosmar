import { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer"
import path from "path";


export function controlImages(carpeta: string): multer.Multer {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', '..', 'public', carpeta));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    },
    
  })


  return multer({ storage: storage });
}