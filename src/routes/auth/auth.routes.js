import express from 'express';
import { Router } from 'express';
const router = new Router();
import { createHash, isValidPassword } from '../../utils/bscrypt.js';
import passport from 'passport';
import UserModel from '../../dao/models/UserModel.js';
import dotenv from 'dotenv';
dotenv.config();

let admin = process.env.admin




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
            res.redirect('/login')
            return
        }
        if(body.email == admin){
            user.role = 'admin'
        }
        let passwordVerification = isValidPassword(user, body.password)
        if(!passwordVerification){
            console.log('usuario o contraseña invalidos')
            res.redirect('/login')
            return
        }
        req.session.email = user.email
        req.session.userName = user.firstName;
        req.session.role = user.role
        console.log('ingreso exitoso')
        res.redirect('/profile')
        return user

    } catch (err) {
        console.log(err)
        res.redirect('/login')
    }
})

router.get('/logout', (req,res) => {
    try {
        req.session.destroy( (err) => {
            if(err) {
                res.status(401).send('no se pudo eliminar la sesion')
                return false
            }
            console.log('sesion eliminada')
            res.redirect('/login')
        })
    } catch (error) {
        console.log(err)
        res.status(500).send('no pudo eliminarse la sesion')
    }
})

// GITHUB

router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));
router.get('/github/callback', passport.authenticate('github', { scope: ['user:email'], session: false }), function (req, res) {
    console.log(req.user,2323)
    req.session.userName = req.user.displayName
    req.session.role = 'user'
    res.redirect('/profile');
});


export { router }