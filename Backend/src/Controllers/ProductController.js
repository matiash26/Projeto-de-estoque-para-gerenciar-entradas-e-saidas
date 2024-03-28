const { verifyToken } = require("./../utils/verifyToken");
const product = require("../Models/ProductModel");
const stock = require("../Models/StockModel");
const express = require("express");
const routes = express.Router();

routes.get("/api/product/all", verifyToken, async (req, res) => {
  const getProduct = await product.select();
  res.send(getProduct);
});
routes.get("/api/product/filtered", verifyToken, async (req, res) => {
  const stockData = await stock.select();
  const productData = await product.select();

  const productFiltered = productData.map((product) => {
    const item = stockData.find((stock) => stock.produto === product.produto);
    return item ? undefined : product;
  });
  const productNotInStock = productFiltered.filter((each) => each);
  //esse filtro é para mostrar somente produtos que não está no estoque
  res.send(productNotInStock);
});
routes.get("/api/product/", verifyToken, async (req, res) => {
  const search = req.query.search;
  const status = req.query.status;
  const found = await product.find(search, status);
  res.send(found ?? []);
});
routes.post("/api/product", verifyToken, (req, res) => {
  const productJSON = req.body;
  const checkIfExist =
    productJSON.length > 0 && productJSON.every((el) => el.product && el.value);
  const checkLenght = productJSON.every(
    (el) =>
      el.product.length > 0 &&
      el.product.length <= 100 &&
      String(el.value).length <= 8
  );
  if (!checkIfExist) {
    res.send({
      status: "error",
      message: "verifique se todos os campos estão preenchidos!",
    });
    return;
  }
  if (!checkLenght) {
    res.send({
      status: "error",
      message: "Limite de caracteres: Produto:100, Saida: 8",
    });
    return;
  }
  productJSON.forEach((item) => product.insert(item));
  res.send({ status: "success", message: "Produto inserido com sucesso!" });
});
routes.put("/api/product", verifyToken, async (req, res) => {
  const update = req.body;
  if (!update.produto && !update.valor) {
    res.send({
      status: "error",
      message: "verifique se todos os campos estão preenchidos!",
    });
    return;
  }
  if (
    !update.produto.length > 0 &&
    !update.produto.length <= 100 &&
    !String(update.valor).length <= 8
  ) {
    res.send({
      status: "error",
      message: "Limite de caracteres: Produto:100 - Estoque: 10 - Valor: 8 ",
    });
    return;
  }
  const response = await product.update(update);
  if (response) {
    res.send({
      status: "success",
      message: "Produto atualizado com sucesso!",
    });
    return;
  }
  res.send({ status: "error", message: "falha ao atualizar o Produto!" });
});
routes.delete("/api/product/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const existsInStock = await product.findById(id);
  if (!existsInStock.length) {
    await product.deleteProduct(id);
    res.send({
      status: "success",
      message: "Deletado com sucesso!",
    });
    return;
  }
  await product.desative(id);
  res.send({
    status: "success",
    message: "Ocultado com sucesso!",
  });
});
module.exports = routes;
