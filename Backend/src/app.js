const StockController = require("./Controllers/StockController")
const ProductController = require("./Controllers/ProductController")
const EntriesController = require("./Controllers/EntriesController")
const ServiceController = require("./Controllers/ServiceController")
const StatisticsController = require("./Controllers/StatisticsController")
const UsersController = require("./Controllers/UsersController")
const bodyParser = require("body-parser")
const cors = require("cors")

const express = require("express")
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(StockController)
app.use(ProductController)
app.use(EntriesController)
app.use(ServiceController)
app.use(StatisticsController)
app.use(UsersController)
//tive que utilizar o middlewar de verificar Token individualmente para não utilizar no end point de registro e login 
app.listen(3000, () => console.log("API ON"))