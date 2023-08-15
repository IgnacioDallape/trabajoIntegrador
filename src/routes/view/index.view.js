import express from 'express'
const { Router } = express
const router = new Router()
import bodyParser from 'body-parser';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', (req,res) => {
    try{
        res.render('index', {})

    } catch (err) {
        console.log(err, 'error en index router')
        res.status(500).send('error en index router')
    }
})


export  { router }