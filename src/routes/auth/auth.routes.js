import { Router } from 'express';
const router = new Router();
import { isValidPassword } from '../../utils/bscrypt.js'
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

let admin = process.env.admin

router.get('/', (req, res) => {
    res.send('auth')
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failureRedirect' }), (req, res) => {
    try {
        console.log('usuario registrado')
        res.redirect('/login')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/failureRedirect', (req, res) => {
    try {
        console.log('usuario no pudo ser registrado')
        res.send('failed register')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/auth/failureRedirect' }), (req, res) => {
    try {
        console.log('usuario correctamente ingresado')
        res.redirect('/profile')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
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

router.get('/github', passport.authenticate('github', { scope: ['user: email'], session: false }));
router.get('/github/callback', passport.authenticate('github', { scope: ['user:email'], session: false }), function (req, res) {
    req.session.username = req.user.displayName
    req.session.role = 'user'
    res.redirect('/profile');
});

//google

router.get('/google',
    passport.authenticate('google', { scope: ['profile'], session: false }));


router.get('/google/callback',
    passport.authenticate('google', { scope: ['profile'], session: false }),
    function (req, res) {
        req.session.username = req.user.displayName
        req.session.passport = true
        req.session.cart = req.user.cart
        res.redirect('/profile')
    });


export { router }