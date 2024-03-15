const { verifyToken } = require("./../utils/verifyToken");
const bodyParser = require("body-parser");
const service = require("../Models/ServiceModel");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = express.Router();
routes.use(bodyParser.json());
routes.use(cors());

routes.get("/services/all", verifyToken, async (req, res) => {
  const getData = await service.select();
  res.send(getData);
});
routes.get("/services/filter/:start/:offset", verifyToken, async (req, res) => {
  const found = await service.find(req.params);
  res.send(found);
});
routes.post("/services/", verifyToken, (req, res) => {
  const body = req.body;
  const checkIfExist = body.every((el) => el.serviceName && el.spent);
  const checkLenght = body.every(
    (el) =>
      el.serviceName.length > 0 &&
      el.serviceName.length <= 100 &&
      String(el.spent).length <= 11
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
      message: "Limite de caracteres: Serviço:100 - Gasto: 8",
    });
    return;
  }
  body.forEach((item) => {
    service.insert(item);
  });
  res.send({ status: "success", message: "Serviço inserido com sucesso!" });
});
routes.put("/services/", verifyToken, async (req, res) => {
  const update = req.body;
  if (!update.servico && !update.gasto) {
    res.send({
      status: "error",
      message: "verifique se todos os campos estão preenchidos!",
    });
    return;
  }
  if (
    !update.servico.length > 0 &&
    !update.servico.length <= 100 &&
    !String(update.gasto).length <= 11
  ) {
    res.send({
      status: "error",
      message: "Limite de caracteres: Serviço: 100 - Gasto: 11",
    });
    return;
  }
  const response = await service.update(update);
  if (response) {
    res.send({
      status: "success",
      message: "Serviço atualizado com sucesso!",
    });
    return;
  }
  res.send({ status: "error", message: "falha ao atualizar o Serviço!" });
});
routes.delete("/services/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  service.Delete(id);
  res.send({
    status: "success",
    message: "Deletado com sucesso!",
  });
});

module.exports = routes;
