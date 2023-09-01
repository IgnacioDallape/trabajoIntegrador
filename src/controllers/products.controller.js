import { getProductsService, getProductsByIdService, addProductsService, deleteProductsService } from "../services/products.service.js";



const getProducts = async (req, res) => {
  try {
    let getDbProducts = await getProductsService(req);
    if (!getDbProducts) {
      console.log("error en router de getproducts db");
      res.status(500).send(err);
      return;
    }
    // let names = getDbProducts.map ( e => e.name)

    res.status(200).send({
      msg: "estos son los productos en db!",
      pr: getDbProducts,
    });
  } catch (err) {
    console.log("error en router de getproducts db");
  }
};

const addProducts = async (req, res) => {
  try {
    let addDbProducts = await addProductsService(req);
    console.log(addDbProducts, 222);
    if (!addDbProducts) {
      console.log("error en router de addProducts db");
      res.status(500).send(err);
      return;
    }
    res.status(200).send({
      msg: "estos son los productos!",
      pr: addDbProducts,
    });
  } catch (err) {
    console.log("error en router de saveProducts db");
    res.status(500).send(err);
  }
};

const getProductsById = async (req, res) => {
  try {
    let productById = await getProductsByIdService(req);
    console.log(productById);
    if (!productById) {
      console.log(`no existe el producto con id ${pid}`);
      res.status(500).send("no existe el producto");
      return false;
    }
    res.status(200).send(`el producto es: ${productById}`);
    console.log(productById);
  } catch (err) {
    console.log("error en router de saveProducts db");
    res.status(500).send(err);
  }
};

const deleteProducts = async (req, res) => {
  try {
    let deleting = await deleteProductsService(req);
    if(!deleting){
      res.status(500).send("error en router delete", 2121);
      return false
    }
    res.status(200).send("producto eliminado: " + JSON.stringify(deleting));
  } catch (err) {
    console.log(err);
    res.status(500).send("error en router delete");
  }
};

export {
  getProducts, getProductsById, addProducts, deleteProducts
}

