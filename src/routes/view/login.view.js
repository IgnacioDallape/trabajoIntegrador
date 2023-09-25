import express from 'express'
const router = express.Router();
import bodyParser from 'body-parser';


router.get('/', async (req, res) => {
    try {
        res.render('login', {title: 'Login'})
    } catch (err) {
        console.log(err)
    }
})

export  { router }