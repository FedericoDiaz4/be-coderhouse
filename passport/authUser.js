import local_strategy from "passport-local";
import User from '../models/User.js';
import { isValidPassword } from './passport.js';

const LocalStrategy = local_strategy.Strategy

const customFields = {
    usernameField: 'email',
    passwordField: 'password',

}

const authUser = (passport) => {
    passport.use('login', new LocalStrategy(customFields, 
        (email, password, done)  => {
            console.log('login');
            User.findOne({ 'email':email }, (err, user) => {
                if(err) return done(err);
                
                if (!user) {
                    console.log(`Usuario con mail ${email} no encontrado`);
                    return done(null ,false);
                }

                if (!isValidPassword(user, password)) {
                    console.log("Contraseña incorrecta");
                    return done (null, false);
                }
                console.log(user);
                return done(null, user);
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });
    
}
    
export default authUser