import express from "express";
import compression from 'compression';
import { getProductosTest } from '../controllers/faker.js'
import logger from "../loggers/winston.js";
const routerProductosTest = express.Router();

routerProductosTest.get('/', compression() ,async (req,res) => {
    logger.info(`Peticion ${req.method} en ruta: ${req.baseUrl}`);
    const productos = await getProductosTest(5);
    res.render('datos', {
        productos: productos,
        conProductos: (productos.length > 0)
    });
})

export default routerProductosTest