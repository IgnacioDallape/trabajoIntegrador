const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../dao/models/UserModel')
const { createHash, isValidPassword }  = require('../utils/bscrypt')

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback : true, usernameField: 'email'
    }))
    async(req,username,password,done) => {
        try{

            let data = req.body
            let user = await UserModel.findOne({email:username})
            if(user){
                console.log('usuario registrado')
                done(null,false)
            }
            let newUser = {
                name : data.name,
                lastname: data.lastname,
                password: createHash(data.password),
                email: data.lastname
            }
            let result = UserModel.create(newUser)
            done(null,result)
        } catch (err) {
            console.log(err)
            return(done('error  al crear usuario ' + err))
        }
    }

    passport.serializeUser((user,done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id,done) => {
        let user = await userModel.findById(id)
        done(null,user)
    })
}

module.exports = initializePassport



