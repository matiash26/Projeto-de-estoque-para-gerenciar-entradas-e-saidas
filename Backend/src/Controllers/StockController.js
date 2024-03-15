const { verifyToken } = require("./../utils/verifyToken");
const express = require("express");
const stock = require("../Models/StockModel");

require("dotenv").config();

const routes = express.Router();

routes.get("/stock/all", verifyToken, async (req, res) => {
  const stockItems = await stock.select();
  const onlyStatusActive = stockItems.filter((each) => each.status === "1");
  res.send(onlyStatusActive);
});
routes.get("/stock/", verifyToken, async (req, res) => {
  const search = req.query.search;
  const active = req.query.active;
  const found = await stock.find(search, active);
  res.send(found);
});
routes.post("/stock/", verifyToken, (req, res) => {
  const body = req.body;

  const checkAllTheFieldsExist =
    body.length > 0 && body.every((el) => el.id && el.estoque);

  const checkLenghFields = body.every(
    (el) => el.estoque.length >= 0 && el.estoque.length <= 8
  );
  if (!checkAllTheFieldsExist) {
    res.send({
      status: "error",
      message: "verifique se todos os campos estão preenchidos!",
    });
    return;
  }
  if (!checkLenghFields) {
    res.send({
      status: "error",
      message: "Limite de caracteres: Estoque: 10",
    });
    return;
  }
  body.forEach((item) => stock.insert(item));
  res.send({ status: "success", message: "Estoque inserido com sucesso!" });
});
routes.put("/stock/", verifyToken, async (req, res) => {
  const update = req.body;
  if (!update.produto && !update.estoque) {
    res.send({
      status: "error",
      message: "verifique se todos os campos estão preenchidos!",
    });
    return;
  }
  if (
    !update.produto.length >= 1 &&
    !update.produto.length <= 100 &&
    !String(update.estoque).length <= 8 &&
    !String(update.estoque).length >= 1
  ) {
    res.send({
      status: "error",
      message: "Limite de caracteres: Quantidade: 10",
    });
    return;
  }
  const response = await stock.update(update);
  if (response) {
    res.send({
      status: "success",
      message: "Estoque atualizado com sucesso!",
    });
    return;
  }
  res.send({ status: "error", message: "falha ao atualizar o Estoque!" });
});
routes.delete("/stock/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const activeToggle = req.query.active === "0" ? "1" : "0";
  const isEqualZero = req.query.active === "0";
  const existsInEntries = await stock.findById(id);
  if (!existsInEntries.length) {
    await stock.Delete(id);
    res.send({ status: "success", message: "Deletado com sucesso!" });
    return;
  }
  stock.desativeStock(activeToggle, id);
  isEqualZero === "1"
    ? res.send({ status: "success", message: "Habilitado com sucesso!" })
    : res.send({ status: "success", message: "Ocultado com sucesso!" });
});

module.exports = routes;
