import express from 'express';
import productosRouter from './routes/ProductoRouter';
import * as dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno del archivo .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productosRouter);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});