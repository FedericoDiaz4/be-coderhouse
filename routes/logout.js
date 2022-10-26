import express from 'express';
import User from '../models/User.js';
const routerLogout = express.Router();

routerLogout.get('/', async (req,res) => {
    const idUser = req.session.passport.user;
    const user = await User.findById(idUser).exec()
    req.session.destroy(err => {
        if (err) {
           return res.json({status: 'Logout Error', body: err});
        }
    })
    res.render('logout', {
        name: user.email
    });
});

export default routerLogout;