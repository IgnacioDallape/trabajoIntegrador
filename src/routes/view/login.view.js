const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', async (req, res) => {
    try {
        res.render('login', {title: 'Login'})
    } catch (err) {
        console.log(err)
    }
})

module.exports = router