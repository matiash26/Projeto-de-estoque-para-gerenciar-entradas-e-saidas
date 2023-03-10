const express = require("express")
const entries = require("../Models/EntriesModel")
const stock = require("../Models/StockModel")
const bodyParser = require("body-parser")
const cors = require("cors")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.get("/entries/all", async (req, res) => {
    const select = await entries.select();
    res.send(select)
})
routes.get("/entries/order/:order", async (req, res) => {
    const orderID = req.params.order
    const order = await entries.selectByOrder(orderID)
    res.send(order)
})
routes.get("/entries/filter/:start/:offset", async (req, res) => {
    const found = await entries.filterDate(req.params)
    res.send(found)
})
routes.get("/entries/grafico", async (req, res) => {
    const search = req.params.search
    const found = await entries.find(search)
    res.send(found)
})
routes.post("/entries/", async (req, res) => {
    const bodyData = req.body
    const orderID = await orderGenerate()
    if (bodyData) {
        bodyData.forEach(EachOrder => {
            let decrementEstoqueStock = EachOrder.estoque - EachOrder.quantidade
            entries.insert({ ...EachOrder, orderID })
            stock.stockModify(decrementEstoqueStock, EachOrder.id)
        })
        res.send({ status: "success", message: "Pedido inserido com sucesso!" })
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.delete("/entries/:order", async (req, res) => {
    const order = req.params.order
    const response = await entries.Delete(order)
    if (response) {
        res.send({ status: "success", message: "Pedido deletado com sucesso!" })
    } else {
        res.send({ status: "error", message: "falha ao deletar o pedido!" })
    }
})
routes.put("/entries/", async (req, res) => {
    const { cart, oldCart } = req.body
    if (cart && oldCart) {
        cart.forEach(update => {
            let getOldCart = oldCart.shift()
            let quantity = getOldCart.estoque - (update.quantidade - getOldCart.quantidade)
            entries.update(update)
            stock.stockModify(quantity, update.idEstoque)
        })
        res.send({ status: "success", message: "Pedido atualizado com sucesso!" })
    } else {
        res.send({ status: "error", message: "Verifique se existe estoque para essa quantidade" })
    }
})
const orderGenerate = async () => {
    const generateOrder = []
    while (true) {
        for (let x = 0; x < 5; x++) {
            generateOrder.push(Math.floor(Math.random() * 10))
        }
        let result = await entries.verifyOrderIfExist(generateOrder.join(""))
        let verify = result[0][0] ? true : false
        if (!verify) {
            return generateOrder.join("")
        }
    }
}
module.exports = routes