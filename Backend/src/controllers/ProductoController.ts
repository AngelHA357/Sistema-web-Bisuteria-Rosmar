import { Request, Response } from 'express';
import { ControllerError } from '../error/ControllerError';
import { ProductoCreateDTO } from '../domain/producto/producto.dto';
import { ProductoService } from '../services/ProductoService';
import { ProductoMap } from '../domain/producto/producto.mapper';
import { ServiceError } from '../error/ServiceError';
import { queryGetProductos } from '../types/query.types';

const serviceProducto = new ProductoService();

// async function getProductos(req: Request<{},{},{},queryGetProductos>, res) {
//     try {
//         const query= req.query
//         const productos = await serviceProducto.getProductosCategoria2(query);
//         const productosDTO = productos.map(producto => ProductoMap.ToDTO(producto));
//         res.status(200).send(productosDTO);
//     } catch (error) {
//         if (error instanceof ServiceError) {
//             res.status(400).send({ message: error.mensaje });
//         } else {
//             res.status(400).send({ message: "Error al consultar producto" });
//         }
//     }  
// }

async function getProducto(req, res) {
    try {
        const id = parseInt(req.params.id);
        const producto = await serviceProducto.getProducto(id);
        res.status(200).send(ProductoMap.ToDTO(producto));
    } catch (error) {
        if (error instanceof ServiceError) {
            res.status(400).send({ message: error.mensaje });
        } else {
            res.status(400).send({ message: "Error al consultar producto" });
        }
    }
}

async function createProducto(req: Request, res) {
    try {
        const images = req.files as Express.Multer.File[]; // Aseguramos que sea un array de archivos

        if (!images || images.length === 0) {
            throw new ControllerError("No hay imágenes adjuntadas");
        }
        let dto = parseProductoFormData(req.body, images);
        const entity = await serviceProducto.createProducto(ProductoMap.ToEntityFromCreate(dto));

        res.status(201).json(ProductoMap.ToDTO(entity));
    } catch (error) {
        if (error instanceof ServiceError) {
            res.status(400).send({ message: error.mensaje });
        } else {
            res.status(400).send({ message: "Error al consultar producto" });
        }
    }
}


function parseProductoFormData(data, images: Express.Multer.File[]): ProductoCreateDTO {
    const fileNames = images.map(img => img.filename)
    let producto: ProductoCreateDTO = {
        colores: JSON.parse(data.colores),
        precio: JSON.parse(data.precio),
        categoria: JSON.parse(data.categoria),
        descripcion: data.descripcion,
        nombre: data.nombre,
        imagenes: fileNames
    }
    return producto;
}

async function deleteProducto(req, res) {
    await res.json({ message: "DELETE Producto" });
}

async function getProductosCategoria(req: Request, res) {
    try {
        const nombre = req.query.categoria as string;
        const productos = await serviceProducto.getProductosCategoria(nombre);
        const productosDTO = productos.map(producto => ProductoMap.ToDTO(producto));
        res.status(200).send(productosDTO);

    } catch (error) {
        if (error instanceof ServiceError) {
            res.status(400).send({ message: error.mensaje });
        } else {
            res.status(400).send({ message: "Error al consultar producto" });
        }
    }
}

export {
    createProducto,
    getProducto,
    // getProductos,
    getProductosCategoria,
    // updateProducto,
    deleteProducto
}