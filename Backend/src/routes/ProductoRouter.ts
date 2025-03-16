import express from 'express';
import {getAll,getById} from '../controllers/ProductoController';

const router = express.Router();

router.get('/', async (req, res) => {
    const data =  await getAll();
    res.status(200).json(data);
});
router.get('/{id}', async (req, res) => {
    return await getById(1);
});


export default router;