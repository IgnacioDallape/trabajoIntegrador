import { paginateService } from "../services/paginate.service.js"

const paginate = async (req,res) => {
    try {
        let products = await paginateService(req)
        if(!products){
            res.status(500).send('error en paginate')
            return false
        }
        res.status(200).send(products)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'error',
            msg: 'hubo un error',
            data: {},
        });
    }
}

export { paginate }