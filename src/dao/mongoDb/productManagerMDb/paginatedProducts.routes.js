const express = require('express')
const { Router } = express
const router = new Router()

router.get('/', (req,res) => {
    try{
        res.render('paginate', {})
    } catch (err) {
        console.log(err)
        res.send(err)

    }
})

module.exports = router

// try{

// } catch (err) {
    
// }