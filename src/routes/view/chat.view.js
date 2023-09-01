import express from 'express'
const { Router } = express
const router = new Router()
import bodyParser from 'body-parser';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


function isUser(req,res,next){
    let admin = req.session.role
    console.log(admin,22)
    if(admin == 'admin'){
        let resp = true
        res.status(500).send('solo los usuarios pueden hacer esto!')
        return resp
    }
    next()
}

router.get('/', isUser, (req,res) => {
    try{
        res.render('chat', {title : 'Chat'})
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

})

export  { router }