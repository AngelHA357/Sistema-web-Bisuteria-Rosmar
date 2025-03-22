import {Request,Response} from 'express';


async function getProductos(req, res){
    await res.json({ message: "GET Producto" });
}

async function getProducto(req, res){
    req.params.id
    await res.json({ message: "GET Producto" });
}

async function createProducto(req: Request, res){
    // console.log(req.file?.filename)
    // console.log(req.file?.originalname)
    // console.log(req.file?.destination)
    
    return res.status(200).json(req.file);
}

async function updateProducto(req, res){
    await res.json({ message: "PUT Producto" });
}

async function deleteProducto(req, res){
    await res.json({ message: "DELETE Producto" });
}

export {
    createProducto,
    getProducto,
    getProductos,
    updateProducto,
    deleteProducto
}