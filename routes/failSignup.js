import express from "express";

const routerFailSignup = express.Router();

routerFailSignup.get('/',  (req, res) => res.render('failSignup'));

export default routerFailSignup;