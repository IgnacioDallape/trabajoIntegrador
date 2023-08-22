import ProductManagerMDb from "../mongoDb/ProductManagerMDb.js";
const prodMan = new ProductManagerMDb();

const paginateService = async (req) => {
    try {
        const { page, limit } = req.query
        let paginateData = await prodMan.getProducts(page, limit)
        if (!paginateData) {
            res.status(400).send('error en paginate get')
            console.log('error en paginate get')
            return false
        }
        let response = res.status(200).json({
            status: 'success',
            payload: paginateData.docs,
            totalPages: paginateData.totalPages,
            prevPage: paginateData.prevPage,
            nextPage: paginateData.nextPage,
            page: paginateData.page,
            hasPrevPage: paginateData.hasPrevPage,
            hasNextPage: paginateData.hasNextPage,
            prevLink: paginateData.hasPrevPage ? `http://localhost:8080/.../?page${paginateData.prevPage}` : null,
            nextLink: paginateData.hasNextPage ? `http://localhost:8080/.../?page${paginateData.nextPage}` : null
        })
        return response
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'error',
            msg: 'hubo un error',
            data: {},
        });
    }
}

export { paginateService }