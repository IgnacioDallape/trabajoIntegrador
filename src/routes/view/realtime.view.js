import express from 'express'
const router = express.Router();
import bodyParser from 'body-parser';



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    try {
        res.render('realtimeproducts', {})
    } catch (err) {
        console.log(err)
    }
})

export  { router }