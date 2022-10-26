import express from "express";
import passport  from 'passport';
const routerLogin = express.Router();

routerLogin.get('/',  (req, res) => res.render('login'));

routerLogin.post('/', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/faillogin'
}));

export default routerLogin;