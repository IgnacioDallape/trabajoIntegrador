const express = require('express')
const { Router } = express
const router = new Router()
const bodyParser = require('body-parser');
const dbManager = require('./productManagerMDb/ProductManagerMDb')
const dbProducts = new dbManager()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));