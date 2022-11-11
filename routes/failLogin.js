import express from "express";
import logger from "../loggers/winston.js";

const routerFailLogin = express.Router();

routerFailLogin.get('/',  (req, res) => {
    logger.info(`Peticion ${req.method} en ruta: ${req.path}`);
    res.render('faillogin')
});

export default routerFailLogin;