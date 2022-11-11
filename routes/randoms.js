import express from "express";
import path from "path";
import compression from 'compression';
import { fork } from 'child_process';
import logger from "../loggers/winston.js";

const routerRandoms = express.Router();

routerRandoms.get('/', compression(), (req, res) => {
    logger.info(`Peticion ${req.method} en ruta: ${req.baseUrl}`);
    let cantNums = req.query.cant || 100000000;
    const numerosRandom = fork(path.join(process.cwd(), '/controllers/numRandoms.js'));
    numerosRandom.on('message', msg => {
        if(msg == "listo") {
            numerosRandom.send(cantNums);
        } else {
            res.json(msg);
        }
    })
});

export default routerRandoms;