import express from "express";
import path from "path";
import { fork } from 'child_process';

const routerRandoms = express.Router();

routerRandoms.get('/', (req, res) => {
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