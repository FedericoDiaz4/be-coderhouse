import express from "express";
import { cpus } from 'os';

const routerInfo = express.Router();

routerInfo.get('/',  (req, res) => {
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
    res.json(info)
});

export default routerInfo;