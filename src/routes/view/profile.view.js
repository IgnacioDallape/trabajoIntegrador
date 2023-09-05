import express from 'express'
const router = express.Router();


function auth(req,res,next){
    let sessionUsername = req.session.userName
    console.log(req.session)
    if(!sessionUsername){
        res.redirect('/login')
    }
    next()
}

router.get('/', auth, async (req, res) => {
    try {
        let name = req.session.userName
        let role = req.session.role
        res.render('profile', { name, role, title: 'Perfil' })
    } catch (err) {
        console.log('error')
    }
})

export  { router }