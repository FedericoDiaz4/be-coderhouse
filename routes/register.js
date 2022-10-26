import express from "express";
import passport  from 'passport';
const routerSignup = express.Router();

routerSignup.get('/',  (req, res) => res.render('signup'));

routerSignup.post('/', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/failsignup'
}));

export default routerSignup;