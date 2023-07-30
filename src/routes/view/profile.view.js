const express = require('express');
const router = express.Router();


function auth(req,res,next){
    let sessionUsername = req.session.userName
    if(!sessionUsername){
        res.redirect('/login')
    }
    console.log(sessionUsername,22)
    next()
}

router.get('/', auth, async (req, res) => {
    try {
        let name = req.session.userName
        res.render('profile', { name })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router