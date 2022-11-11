import express from "express";
import passport  from 'passport';
import logger from "../loggers/winston.js";
const routerLogin = express.Router();

routerLogin.get('/',  (req, res) => {
    logger.info(`Peticion ${req.method} en ruta: ${req.baseUrl}`);
    res.render('login')
});

routerLogin.post('/', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/faillogin'
}));

export default routerLogin;