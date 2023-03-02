// const express = require("express")
// const statistics = require("../Models/StatisticsModel")
// const bodyParser = require("body-parser")
// const cors = require("cors")

// const routes = express.Router()
// routes.use(bodyParser.json())
// routes.use(cors())

// routes.get("/estatistica/historico/:filter", async (req, res) => {
//     const filter = req.params.filter
//     const date = new Date();
//     const dateSqlFormat = {year: 'numeric', month:'numeric', day: 'numeric'}
//     let currentDate =  {
//         filter: "",
//         today: date.toLocaleDateString("pt-BR",dateSqlFormat).split("/").reverse().join("-")
//     }
//     if(filter === "day") {
//         currentDate.filter = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate()-7}`
//     }else if(filter === "monthsYear") {
//         currentDate.filter = date.getFullYear()
//     }else if(filter === "year") {
//         currentDate.filter = "year"
//     }
//     const revenue = await statistics.revenue(currentDate, filter)
//     const graph = await statistics.graphRevenue(currentDate, filter)
//     const products = await statistics.bestProducts(currentDate,filter)
//     res.send({revenue, graph, products})
// })
// module.exports = routes;