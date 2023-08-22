import ProductManagerMDb from "../dao/mongoDb/ProductManagerMDb.js";
const dbProducts = new ProductManagerMDb();



const getProductsService = async (req, res) => {
    try {
        const options = {
            limit: req.query.limit,
            page: req.query.page,
            category: req.query.category,
            sort: req.query.sort,
        };
        console.log(options);
        let getDbProducts = await dbProducts.getProducts(options);
        if (!getDbProducts) {
            console.log("error en router de getproducts db");
            return false;
        }
        return getDbProducts
    } catch (err) {
        console.log("error en router de getproducts db");
        return false;
    }
};

const addProductsService = async (req) => {
    try {
        let prod = req.body;
        let addDbProducts = await dbProducts.addProducts(prod);
        console.log(addDbProducts, 222);
        if (!addDbProducts) {
            console.log("error en router de addProducts db");
            return false;
        }
        return addDbProducts
    } catch (err) {
        console.log("error en router de saveProducts db");
        return false;
    }
};

const getProductsByIdService = async (req) => {
    try {
        let pid = req.params.pid;
        let productById = await dbProducts.getProductsById(pid);
        console.log(productById);
        if (!productById) {
            console.log(`no existe el producto con id ${pid}`);
            return false;
        }
        return productById
    } catch (err) {
        console.log("error en router de saveProducts db");
        return false;
    }
};

const deleteProductsService = async (req) => {
    try {
        let pid = req.params.pid;
        let deleting = await dbProducts.deleteProducts(pid);
        if(!deleting) return false
        return true
    } catch (err) {
        console.log(err);
        return false;
    }
};

export {
    getProductsService, getProductsByIdService, addProductsService, deleteProductsService
}

