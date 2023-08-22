import express from 'express';
import { paginate } from '../../../controllers/paginate.controller.js';
const { Router } = express;
const router = new Router();

router.get('/', paginate)

export { router }