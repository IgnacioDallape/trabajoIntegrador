const express = require('express')
const { Router } = express
const router = new Router()
const { createHash, isValidPassword } = require('../../utils/bscrypt')
const passport = require('passport')
const UserModel = require('../../dao/models/UserModel')

router.get('/', (req, res) => {
    res.send('auth')
})

router.post('/register', passport.authenticate('register', {failureRedirect: '/auth/failureRedirect'}) ,(req,res) => {
    try{
        console.log('usuario registrado')
        res.redirect('/login')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/failureRedirect', (req,res) => {
    try{
        console.log('usuario no pudo ser registrado')
        res.send('failed register')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/login', async (req,res) => {
    try{
        let body = req.body
        let user = await UserModel.findOne( { email: body.email } )
        if(!user){
            console.log('usuario o contraseña invalidos')
            res.send('usuario o contraseña invalidos')
        }
        if(body.email == 'adminCoder@coder.com'){
            user.role = 'admin'
        } else {
            user.role = 'usuario'
        }
        let passwordVerification = isValidPassword(user, body.password)
        if(!passwordVerification){
            console.log('usuario o contraseña invalidos')
            res.send('usuario o contraseña invalidos')
        }
        console.log('ingreso exitoso')
        req.session.userName = req.user.firstName;
        res.redirect('/product')
        return user

    } catch (err) {
        console.log(err)
    }
})

// GITHUB

router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));
router.get('/github/callback', passport.authenticate('github', { scope: ['user:email'], session: false }), function (req, res) {
    req.session.userName = req.session.user.displayName
    console.log(req.session.user.username)
    res.redirect('/product');
});


module.exports = router