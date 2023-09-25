import CartManagerMDb from "../dao/mongo/classes/Cart.dao.js";
const cartMan = new CartManagerMDb();

const addCartService = async () => {
    try {
        let a = await cartMan.addCart()
        console.log(a)
        if (!a) {
            console.log('error en crear carrito')
            return false
        }
        return a
    } catch (err) {
        console.log(err, 'error en addCart routes')
        return false
    }
}

const getCartsService = async () => {
    try {
        let a = await cartMan.getCarts()
        if (!a) {
            console.log('error en encontrar carritos')
            return false
        }
        return a
    } catch (err) {
        console.log(err, 'error en getCarts routes')
        return false
    }
}

const getCartByIdService = async (req) => {
    try {
        let cid = req.params.cid
        console.log( cid,999)

        let a = await cartMan.getCartsById(cid)
        console.log(a,2323)
        if (!a) {
            console.log(`no se encontro carrito con id ${cid}.`)
            return false
        }
        return a
    } catch (err) {
        console.log(err, 'error en getCarts routes')
        return false
    }
}

const addProductToCartService = async (req) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        console.log(cid,223,pid)
        let adding = await cartMan.addingProductsToCart(cid, pid)
        console.log(adding)
        if (!adding) {
            console.log(`no se pudo añadir al carrito con id ${cid}, el producto${pid}.`)
            return false
        }
        return adding
    } catch (err) {
        console.log(err, 'error en addingProd routes')
        return false
    }
}

const deleteProductsCartService = async (req) => {
    try {
        let cid = req.params.cid
        let a = await cartMan.deleteProducts(cid)
        if (!a) {
            console.log(`no se eliminaron productos del carrito con id ${cid}.`)
            return false
        }
        return a
        } catch (err) {
        console.log(err, 'error en delete routes')
        return false
    }
}

const deleteProductCartByIdService = async (req) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let a = await cartMan.deleteProductsById(cid, pid)
        console.log(a)
        if (!a) {
            console.log(`no se elimino el producto con id ${pid}, del carrito con id ${cid}.`)
            return false
        }
        return a
        } catch (err) {
        console.log(err, 'error en deleteById routes')
        return false
    }
}

const UpdateProductsCartService = async (req) => {
    try {
        let cid = req.params.cid
        let body = req.body
        let a = await cartMan.updateAllCartProducts(cid, body)
        console.log(a)
        if (!a) {
            console.log(`no se actualizaron los productos del carrito  ${cid}.`)
            return false
        }
        return a
        } catch (err) {
        console.log(err, 'error en update all carts routes')
        return false
    }
}

const updateProductCartByIdService = async (req) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let quantity = req.body
        let a = await cartMan.updateCartOneProd(cid, pid, quantity)
        if (!a) {
            console.log(`no se actualizo el productos con id: ${pid} del carrito  ${cid}.`)
            return false
        }
        return a
            // Cart.findOne({})
            // .populate('products.product')
            // .then(e => console.log(JSON.stringify(e, null, '\t')))
            // .catch(err => console.log(err))

    } catch (err) {
        console.log(err, 'error en update products routes')
        return false
    }
}

async function purchaseService(cid, user){
    console.log(cid, user)
}

async function purchasesService(cid, user){
    console.log(cid, user)
}

async function deletePurchaseService(cid, user){
    console.log(cid, user)
}

export {
    addCartService, getCartByIdService, getCartsService , addProductToCartService, deleteProductCartByIdService, deleteProductsCartService, updateProductCartByIdService, UpdateProductsCartService, purchaseService, purchasesService, deletePurchaseService
}