import express from "express";
import logger from "../loggers/winston.js";

const routerFailSignup = express.Router();

routerFailSignup.get('/',  (req, res) => {
    logger.info(`Peticion ${req.method} en ruta: ${req.baseUrl}`);
    res.render('failSignup');
});

export default routerFailSignup;