const express = require('express')
const { Router } = express
const router = new Router()
const bodyParser = require('body-parser');

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


module.exports = router