import express from "express";
import compression from 'compression';
import logger from '../loggers/winston.js'
import { cpus } from 'os';

const routerInfo = express.Router();

routerInfo.get('/', (req, res) => {
    logger.info(`Peticion ${req.method} en ruta: ${req.baseUrl}`);
    const info = {
        args: process.argv.slice(2),
        path: process.argv[1],
        so: process.platform,
        pid: process.pid,
        node: process.version,
        folder: process.cwd(),
        memoryRss: process.memoryUsage().rss,
        cpus: cpus().length
    };
    res.send(info)
});

routerInfo.get('/con-compression', compression({level: 8}), (req, res) => {
    logger.info(`Peticion ${req.method} en ruta: ${req.baseUrl}`);
    const info = {
        args: process.argv.slice(2),
        path: process.argv[1],
        so: process.platform,
        pid: process.pid,
        node: process.version,
        folder: process.cwd(),
        memoryRss: process.memoryUsage().rss,
        cpus: cpus().length
    };
    res.send(info)
});

export default routerInfo;