const statistics = require("../Models/StatisticsModel")
const express = require("express")
const jwt = require("jsonwebtoken")
const routes = express.Router()
require("dotenv").config()

routes.get("/estatistica/historico/:filter", async (req, res) => {
    const filter = req.params.filter
    const date = new Date();
    const datSQL = { year: 'numeric', month: 'numeric', day: 'numeric' }
    let currentDate = {
        filter: "",
        today: date.toLocaleDateString("pt-BR", datSQL).split("/").reverse().join("-")
    }
    if (filter === "day") {
        currentDate.filter = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate() - 7}`
    } else if (filter === "monthsOfYear") {
        currentDate.filter = date.getFullYear()
    } else if (filter === "year") {
        currentDate.filter = "year"
    }
    const revenue = await statistics.revenue(currentDate, filter)
    const graph = await statistics.graphRevenue(currentDate, filter)
    const products = await statistics.bestProducts(currentDate, filter)
    const expenses = await statistics.expenses(currentDate, filter)
    res.send({ revenue, graph, products, expenses })
})
module.exports = routes;