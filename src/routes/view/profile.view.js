import express from 'express'
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
        let role = req.session.role
        console.log(req.session)
        res.render('profile', { name, role, title: 'Perfil' })
    } catch (err) {
        console.log(err)
    }
})

export  { router }