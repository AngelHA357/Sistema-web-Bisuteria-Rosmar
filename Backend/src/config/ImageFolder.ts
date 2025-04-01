
import path from 'path';
import fs from 'fs';

function createFolder(){
  if (! fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if(!fs.existsSync(productosDir)){
    fs.mkdirSync(productosDir, {recursive: true});
  }
}


//Crea las rutas de las carpetas
const publicDir = path.join(__dirname,'..','..', 'public');
const productosDir = path.join(publicDir, 'productos');

export {createFolder, productosDir}