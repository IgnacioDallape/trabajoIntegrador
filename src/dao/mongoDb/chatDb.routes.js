const express = require('express')
const { Router } = express
const router = new Router()
const bodyParser = require('body-parser');
const ChatdbManager = require('./chat/ChatManagerDb')
const dbProducts = new ChatdbManager()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req,res) => {
    try{
        let messages = await dbProducts.getMessage()
        res.status(200).send(messages)
        console.log(messages)
        console.log('mensajes obtenidos')
        return
    } catch (err) {
        console.log('error en router de getMessage chat')
        res.status(500).send(err)
    }
})

router.post('/', async (req,res) => {
    try{
        let messages = await dbProducts.getMessage()
        res.status(200).send(messages)
        console.log(messages)
        console.log('mensajes obtenidos')
        return
    } catch (err) {
        console.log('error en router de getMessage chat')
        res.status(500).send(err)
    }
})