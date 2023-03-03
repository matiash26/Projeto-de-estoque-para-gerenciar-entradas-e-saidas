const express = require("express")
const entries = require("../Models/EntriesModel")
const stock = require("../Models/StockModel")
const bodyParser = require("body-parser")
const cors = require("cors")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.get("/entradas/all", async (req, res) => {
    const select = await entries.selectEntries();
    res.send(select)
})
routes.get("/entradas/order/:order", async (req, res) => {
    const orderID = req.params.order
    const order = await entries.selectEntriesByOrder(orderID)
    res.send(order)
})
routes.get("/entradas/filter/:start/:offset", async (req, res) => {
    const found = await entries.filterDate(req.params)
    res.send(found)
})
routes.get("/entradas/grafico", async (req, res) => {
    const search = req.params.search
    const found = await entries.findEntries(search)
    res.send(found)
})
routes.post("/entradas/", async (req, res) => {
    const bodyData = req.body
    const orderID = await orderGenerate()
    if (bodyData) {
        bodyData.forEach(EachOrder => {
            let decrementEstoqueStock = EachOrder.estoque - EachOrder.quantidade
            entries.insertEntries({ ...EachOrder, orderID })
            stock.stockModifyEstoque(decrementEstoqueStock, EachOrder.id)
        })
        res.send({ status: "success", message: "Pedido inserido com sucesso!" })
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.delete("/entradas/:order", async (req, res) => {
    const order = req.params.order
    const response = await entries.deleteEntries(order)
    if (response) {
        res.send({ status: "success", message: "Pedido deletado com sucesso!" })
    } else {
        res.send({ status: "error", message: "falha ao deletar o pedido!" })
    }
})
routes.put("/entradas/", async (req, res) => {
    const { cart, oldCart } = req.body
    if (cart && oldCart) {
        cart.forEach(update => {
            let getOldCart = oldCart.shift()
            let quantity = getOldCart.estoque - (update.quantidade - getOldCart.quantidade)
            entries.updateEntries(update)
            stock.stockModifyEstoque(quantity, update.idEstoque)
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