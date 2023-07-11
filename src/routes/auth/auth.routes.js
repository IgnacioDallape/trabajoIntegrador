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
    console.log( req.body,3)
    try{
        console.log('usuario registrado')
        res.redirect('/auth')
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
        console.log(user)
        if(!user){
            console.log('usuario no existe')
            res.send('usuario no existe')
        }
        console.log(user.password)
        // let passwordVerification = isValidPassword(user, body.password)
        // console.log(passwordVerification)
        // console.log('ingreso exitoso')
        // res.redirect('/product')

    } catch (err) {
        console.log(err)
    }
})

module.exports = router