import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import ChatdbManager from '../../../dao/mongoDb/ChatManagerDb.js';

const router = new Router();
const dbProducts = new ChatdbManager();


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

export { router }