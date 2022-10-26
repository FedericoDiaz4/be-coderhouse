import local_strategy from "passport-local";
import User from '../models/User.js';
import { createHash } from './passport.js';

const LocalStrategy = local_strategy.Strategy

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const createUser = (passport) => {
    passport.use('signup', new LocalStrategy(customFields,
        (req, email, password, done) => {
            console.log('signup');
            User.findOne({ 'email':email }, (err, user) => {
                if (err) {
                    console.log(`Error guardando usuario ${err}`);
                    return done(err);
                }
                if (user) {
                    console.log("Usuario existente");
                    return done(null, false);
                }

                const newUser = {
                    email: email,
                    password: createHash(password)
                };

                User.create(newUser, (err, userWithId) => {
                    if (err) {
                        console.log(`Error guardando usuario ${err}`);
                        return done(err);
                    }
                    console.log(userWithId);
                    console.log("Usuario creado correctamente");
                    return done(null, userWithId);
                });
            });
        })
    )
}

export default createUser