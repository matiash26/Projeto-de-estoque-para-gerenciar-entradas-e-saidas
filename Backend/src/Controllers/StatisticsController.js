const statistics = require("../Models/StatisticsModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const routes = express.Router();
require("dotenv").config();

routes.get("/estatistica/historico/:filter", verifyToken, async (req, res) => {
  const filter = req.params.filter;
  const datSQL = { year: "numeric", month: "numeric", day: "numeric" };
  const date = new Date();

  const day = date.getDate();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  let currentDate = {
    start: "",
    today: date
      .toLocaleDateString("pt-BR", datSQL)
      .split("/")
      .reverse()
      .join("-"),
  };
  if (filter === "day") {
    currentDate.start = `${year}-${month}-${day - 7}`;
  } else if (filter === "monthsOfYear") {
    currentDate.start = year;
  } else if (filter === "year") {
    currentDate.start = "year";
  }
  const revenue = await statistics.revenue(currentDate, filter);
  const graph = await statistics.graphRevenue(currentDate, filter);
  const products = await statistics.bestProducts(currentDate, filter);
  const expenses = await statistics.expenses(currentDate, filter);

  const expensesFilled = graph.map((sales) => {
    let newExpense = { mes: "", gasto: "" };
    const getMonth = expenses.find((month) => month.mes == sales.mes);
    if (getMonth) {
      return getMonth;
    } else {
      newExpense.mes = sales.mes;
      newExpense.gasto = 0;
      return newExpense;
    }
  });
  //se não tiver despesas no mês retorne 0 para que tenha a mesma quantidade de dados na lista
  res.send({ revenue, graph, products, expenses, expensesFilled});
});
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.send({
      status: "error",
      msg: "Acesso negado!",
      permission: false,
    });
  }
  try {
    const secret = process.env.SECRET_KEY;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.send({ status: "error", msg: "Token inválido!" });
  }
}
module.exports = routes;
