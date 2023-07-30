const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../dao/models/UserModel')
const { createHash, isValidPassword } = require('../utils/bscrypt')
const CartManager = require('../dao/mongoDb/CartManagerMongodb')
const CM = new CartManager()

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

module.exports = initializePassport;



