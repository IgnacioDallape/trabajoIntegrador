import { Router } from 'express';
import { addMessage, getMessage, deleteAllMessages } from '../../../controllers/chat.controller.js';

const router = new Router();



router.get('/', getMessage)

router.post('/', addMessage)

router.delete('/deleteChat', deleteAllMessages)

export { router }