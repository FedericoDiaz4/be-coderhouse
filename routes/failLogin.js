import express from "express";

const routerFailLogin = express.Router();

routerFailLogin.get('/',  (req, res) => res.render('faillogin'));

export default routerFailLogin;