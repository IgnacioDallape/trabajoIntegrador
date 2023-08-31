import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../dao/models/UserModel.js';
import { createHash, isValidPassword } from '../utils/bscrypt.js';
import CartManagerMongodb from '../dao/mongoDb/CartManagerMongodb.js';
import { Strategy as GithubStrategy } from 'passport-github2';
import { config } from './env.js';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


const CM = new CartManagerMongodb();


const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        let data = req.body
        console.log(data)
        try {
            let user = await UserModel.findOne({ email: username })
            if (user) {
                console.log(' el usuario ya esta registrado')
                return done(null, false)
            }
            let cart = await CM.addCart()
            if (!cart) {
                console.log('error creando el carrito en passport')
                return false
            }
            let newUser = {
                firstName: data.firstName,   //esto debe coincidir con el nombre en el modelo, tal cual
                lastName: data.lastName,
                cart: cart,
                age: data.age,
                password: createHash(data.password),
                email: data.email,
            }
            console.log('usuario creado')
            let result = await UserModel.create(newUser)
            return done(null, result)
        } catch (err) {
            console.log(err)
            return done('error al crear usuario ' + err)
        }
    }));



    passport.use('github',
    new GithubStrategy({
        clientID: config.clientIdGithub,
        clientSecret: config.clientSecretGithub,
        callbackURL: 'http://localhost:8080/auth/github/callback'
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile)
            done(null, profile)
        }
    )
);

passport.use('google', new GoogleStrategy(
    {
        clientID: '1038362339187-pkdfqh5go977sve9ellc7ekeecbf8j1l.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)

        done(null, profile)
    }
));


    // passport.use('login', new LocalStrategy(
    //     { passReqToCallback: true, usernameField: 'email' },
    //     async (req, username, password, done) => {
    //         try {
    //             let user = await Users.findOne({ email: username })
    //             if (!user) {
    //                 console.log('email no encontrado')
    //                 return done(null, false)
    //             }
    //             let descryptingPassword = await isValidPassword(user, password)
    //             if (!descryptingPassword) {
    //                 console.log('contraseña incorrecta')
    //                 return done(null, false)
    //             }

    //             return done(null, user)
    //         } catch (error) {
    //             console.log(error)
    //             return done('error al iniciar sesion ' + error)
    //         }
    //     }
    // ))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await UserModel.findById(id);
            done(null, user);
        } catch (err) {
            console.log(err);
            done(err, null);
        }
    });
};

export { initializePassport }



