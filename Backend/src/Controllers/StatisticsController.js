const statistics = require("../Models/StatisticsModel")
const express = require("express")
const jwt = require("jsonwebtoken")
const routes = express.Router()
require("dotenv").config()

routes.get("/estatistica/historico/:filter", verifyToken, async (req, res) => {
    const filter = req.params.filter
    const date = new Date();
    const datSQL = { year: 'numeric', month: 'numeric', day: 'numeric' }
    let currentDate = {
        start: "",
        today: date.toLocaleDateString("pt-BR", datSQL).split("/").reverse().join("-"),
    }
    if (filter === "day") {
        currentDate.start = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate() - 7}`
    } else if (filter === "monthsOfYear") {
        currentDate.start = date.getFullYear()
    } else if (filter === "year") {
        currentDate.start = "year"
    }
    const revenue = await statistics.revenue(currentDate, filter)
    const graph = await statistics.graphRevenue(currentDate, filter)
    const products = await statistics.bestProducts(currentDate, filter)
    const expenses = await statistics.expenses(currentDate, filter)
    res.send({ revenue, graph, products, expenses })
})
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.send({ status: "error", msg: "Acesso negado!", permission: false })
    }
    try {
        const secret = process.env.SECRET_KEY
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.send({ status: "error", msg: "Token inválido!" })
    }

}
module.exports = routes;