const statistics = require("../Models/StatisticsModel")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.get("/estatistica/historico/:filter", async (req, res) => {
    const filter = req.params.filter
    const date = new Date();
    const dateSqlFormat = { year: 'numeric', month: 'numeric', day: 'numeric' }
    let currentDate = {
        filter: "",
        today: date.toLocaleDateString("pt-BR", dateSqlFormat).split("/").reverse().join("-")
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
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader
    if (!token) {
        return res.send({ status: "error", msg: "Acesso negado!" })
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