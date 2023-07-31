const express = require('express')
const { Router } = express
const router = new Router()
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req,res) => {
    try{
        res.render('chat', {title : 'Chat'})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

})

module.exports = router