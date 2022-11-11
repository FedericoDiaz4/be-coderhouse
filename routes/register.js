import express from "express";
import passport  from 'passport';
import logger from "../loggers/winston.js";
const routerSignup = express.Router();

routerSignup.get('/',  (req, res) => {
    logger.info(`Peticion ${req.method} en ruta: ${req.baseUrl}`);
    res.render('signup')
});

routerSignup.post('/', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/failsignup'
}));

export default routerSignup;