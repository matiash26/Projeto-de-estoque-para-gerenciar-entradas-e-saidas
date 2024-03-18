const { verifyToken } = require("./../utils/verifyToken");
const statistics = require("../Models/StatisticsModel");
const express = require("express");

const routes = express.Router();
require("dotenv").config();

routes.get("/estatistica/historico/:filter", verifyToken, async (req, res) => {
  const filter = req.params.filter;
  const date = new Date();

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  let currentDate = {
    start: "",
    today: date.toLocaleDateString("pt-BR").split("/").reverse().join("-"),
  };

  if (filter === "day") {
    date.setDate(date.getDate() - 7);
    const day = date.getDate();
    currentDate.start = `${year}-${month}-${day}`;
  } else if (filter === "monthsOfYear") {
    currentDate.start = year;
  } else if (filter === "year") {
    currentDate.start = "year";
  }
  const revenue = await statistics.revenue(currentDate, filter);
  const graph = await statistics.graphRevenue(currentDate, filter);
  const products = await statistics.bestProducts(currentDate, filter);
  const expenses = await statistics.expenses(currentDate, filter);

  //se não tiver despesas no mês retorne 0 para que tenha a mesma quantidade de dados na lista
  const expensesFilled = graph.map((sales) => {
    let newExpense = { mes: "", gasto: 0 };
    const getMonth = expenses.find((month) => month.mes == sales.mes);
    if (getMonth) {
      return getMonth;
    } else {
      newExpense.mes = sales.mes;
      return newExpense;
    }
  });
  res.send({ revenue, graph, products, expenses, expensesFilled });
});

module.exports = routes;
