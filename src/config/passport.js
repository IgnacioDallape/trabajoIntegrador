import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../dao/mongo/models/UserModel.js';
import { createHash, isValidPassword } from '../utils/bscrypt.js';
import CartManagerMongodb from '../dao/mongo/classes/Cart.dao.js';
import { Strategy as GithubStrategy } from 'passport-github2';
import { config } from './env.js';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Cart from '../dao/mongo/models/Cart.js';


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


    //Login

    passport.use('login', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            let user = await UserModel.findOne({ email: username })
            if (!user) {
                console.log('no existe el user')
                return done(null, false)
            }
            let pass = await isValidPassword(user, password)
            console.log(pass, '//', password)
            if (!pass) {
                console.log('contraseña incorrecta');
                return false;
            }
            return done(null, user)
        } catch (err) {
            console.log(err)
            return done('error al encontrar el usuario ' + err)
        }
    }));

    // NO LAS ENCONTRABA EN EL OTRO ARCHIVO PORQUE FALTABA IMPORTARLAS, ENTONCES LAS TRAJE ACA Y FUNCIONAN

    // GITHUB

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

    // GOOGLE

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


    passport.serializeUser((req, user, done) => {
        req.session.username = user.firstName  //aca le pongo los datos de la session que me deja acceder al profile en el middleware
        req.session.email = user.email
        req.session.role = 'user'
        console.log(user)
        req.session.cart = user.cart
        if (req.session.email == 'adminCoder@coder.com') {
            req.session.role = 'admin'
        }
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



