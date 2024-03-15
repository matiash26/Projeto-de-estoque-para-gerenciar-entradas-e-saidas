const { verifyToken } = require("./../utils/verifyToken");
const express = require("express");
const entries = require("../Models/EntriesModel");
const stock = require("../Models/StockModel");

const routes = express.Router();

routes.get("/entries/all", verifyToken, async (req, res) => {
  const select = await entries.select();
  res.send(select);
});
routes.get("/entries/order/:order", verifyToken, async (req, res) => {
  const orderID = req.params.order;
  const order = await entries.selectByOrder(orderID);
  res.send(order);
});
routes.get("/entries/filter/:start/:offset", verifyToken, async (req, res) => {
  const found = await entries.filterDate(req.params);
  res.send(found);
});
routes.get("/entries/grafico", verifyToken, async (req, res) => {
  const search = req.params.search;
  const found = await entries.find(search);
  res.send(found);
});
routes.post("/entries/", verifyToken, async (req, res) => {
  const bodyData = req.body;
  const orderID = await orderGenerate();
  if (!bodyData.length) {
    res.send({
      status: "error",
      message: "verifique se todos os campos estão preenchidos!",
    });
    return;
  }
  //para uma segurança maior, faça a subtração do estoque via backend, por ser sistema offline, não irei adicionar
  bodyData.forEach(async (EachOrder) => {
    let estoque = EachOrder.estoque;
    await entries.insert({ ...EachOrder, orderID });
    await stock.stockModify(estoque, EachOrder.id);
  });
  res.send({ status: "success", message: "Pedido inserido com sucesso!" });
});
routes.delete("/entries/:order", verifyToken, async (req, res) => {
  const order = req.params.order;
  const getOrder = await entries.selectByOrder(order);
  entries.Delete(order);
  getOrder.forEach((el) => {
    stock.stockModify(el.estoque + el.quantidade, el.idEstoque);
  });
  const select = await entries.select();
  res.send({
    status: "success",
    message: "Pedido deletado com sucesso!",
    data: select,
  });
  return;
});
routes.put("/entries/", verifyToken, async (req, res) => {
  const body = req.body;
  if (body.length) {
    body.forEach((update) => {
      entries.update(update);
      stock.stockModify(update.estoque, update.idEstoque);
    });
    res.send({ status: "success", message: "Pedido atualizado com sucesso!" });
    return;
  }
  res.send({
    status: "error",
    message: "Verifique se existe estoque para essa quantidade",
  });
});
const orderGenerate = async () => {
  let generateOrder = [];
  while (true) {
    for (let x = 0; x < 5; x++) {
      generateOrder.push(Math.floor(Math.random() * 10));
    }
    let result = await entries.verifyOrderIfExist(generateOrder.join(""));
    let verify = result[0][0];
    if (!verify) {
      return generateOrder.join("");
    }
    generateOrder = [];
  }
};
module.exports = routes;
