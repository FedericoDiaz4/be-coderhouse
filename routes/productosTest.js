import express from "express";
import { getProductosTest } from '../controllers/faker.js'
const routerProductosTest = express.Router();

routerProductosTest.get('/', async (req,res) => {
    const productos = await getProductosTest(5);
    res.render('datos', {
        productos: productos,
        conProductos: (productos.length > 0)
    });
})

export default routerProductosTest