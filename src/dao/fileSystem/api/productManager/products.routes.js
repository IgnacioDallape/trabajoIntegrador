import express from "express";
import { ProductManager } from "./ProductManager.js";
const { Router } = express;
const router = new Router();
const productManager = new ProductManager();
import bodyParser from "body-parser";
router.use(bodyParser.json());

router.get("/", async (req, res) => {
  let prod = await productManager.getProducts();
  console.log(prod);
  res.send(prod);
});

router.get("/:pid", async (req, res) => {
  try {
    let prodId = req.params.pid;
    console.log(prodId);
    let prod = await productManager.getProductsById(prodId);
    if (!prod) {
      console.log(`No existe el producto con id: ${prodId}`);
      res.status(500).send(`No existe el producto con id: ${prodId}`);
      return;
    }
    res.status(200).send({
      msg: "Producto encontrado!",
      prod: prod,
    });
    console.log("producto encontrado");
  } catch (err) {
    console.log(err, "error en get.updateProducts");
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  } = req.body;
  try {
    let addingProd = await productManager.addProducts(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    );
    if (!addingProd) {
      console.log("no se pudo añadir el producto");
      res.status(500).send(`no se pudo añadir el producto ${title}`);
      return false;
    }
    res.status(200).send({
      msg: "producto añadido",
      producto: addingProd,
    });
    console.log(`el producto ${title} fue añadido con éxito`);
  } catch (err) {
    res.status(500).send(err);
    console.log(err, "error en router.post /products");
  }
});

router.put("/:pid", async (req, res) => {
  try {
    let prodId = req.params.pid;
    let updateProd = req.body;
    let updatedPr = await productManager.updateProducts(updateProd, prodId);
    if (!updatedPr) {
      console.log(`no se pudo actualizar el prod ${updateProd.title}`);
      res.status(500).send(`error al actualizar el producto con id ${prodId}`);
      return false;
    }

    res.status(201).send({
      msg: `Producto con id ${prodId} actualizado`,
      producto: updateProd,
    });
  } catch (err) {
    console.log("error en actualizar el producto");
    res.status(500).send(err);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    let prodId = req.params.pid;
    let deleteProd = await productManager.deleteProducts(prodId);
    if (!deleteProd) {
      console.log(`no se pudo eliminar el producto `);
      res.status(500).send(`error al eliminar el producto con id ${prodId}`);
      return false;
    }
    res.status(201).send({
      msg: `Producto con id ${prodId} eliminado`,
      "productos existentes": deleteProd,
    });
  } catch (err) {
    console.log("error en eliminar el producto");
    res.status(500).send(err);
  }
});

export { router };
