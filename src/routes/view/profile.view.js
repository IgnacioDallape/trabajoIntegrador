import express from 'express'
const router = express.Router();


function auth(req, res, next) {
    let sessionUsername = req.session.username

    if (!sessionUsername) {
        res.redirect('/login')
    }
    next()
}

router.get('/', auth, async (req, res) => {
    try {
        console.log(req.session)
        let { username, email, cart, role } = req.session

        res.render('profile', { username, email, cart, role, title: 'Profile' })
    } catch (err) {
        console.log('error')
    }
})

export { router }