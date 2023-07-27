const express = require('express');
const router = express.Router();


function auth(req,res,next){
    let sessionUsername = req.session.userName
    if(!sessionUsername){
        res.redirect('/login')
    }
    next()
}

router.get('/', auth, async (req, res) => {
    try {
        res.render('profile', {})
    } catch (err) {
        console.log(err)
    }
})

module.exports = router