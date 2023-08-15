import { Router } from 'express';
import { getMessage, addMessage, deleteAllMessages} from '../../../dao/controllers/chat.controller';

const router = new Router();


router.get('/', getMessage)

router.post('/', addMessage)

router.delete('/deleteChat', deleteAllMessages)

export { router }