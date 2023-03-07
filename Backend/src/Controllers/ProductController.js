const express = require("express")
const product = require("../../../Backend/src/Models/ProductModel")
const bodyParser = require("body-parser")
const cors = require("cors")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.get("/produtos/all", async (req, res) => {
    const getData = await product.selectProducts()
    res.send(getData)
})
routes.get("/produtos/", async (req, res) => {
    const search = req.query.search
    const status = req.query.status
    const found = await product.findProducts(search, status)
    res.send(found)
})
routes.post("/produtos", (req, res) => {
    const productJSON = req.body
    const checkIfExist = productJSON.every(el => el.produto && el.valor)
    const checkLenght = productJSON.every(el => el.produto.length > 0 && el.produto.length <= 100 && String(el.valor).length <= 8)
    if (checkIfExist) {
        if (checkLenght) {
            productJSON.forEach(item => {
                product.insertProducts(item)
            })
            res.send({ status: "success", message: "Produto inserido com sucesso!" })
        } else {
            res.send({ status: "error", message: "Limite de caracteres: Produto:100, Saida: 8" })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.put("/produtos", async (req, res) => {
    const update = req.body
    if (update.produto && update.valor) {
        if (update.produto.length > 0 && update.produto.length <= 100 && String(update.valor).length <= 8) {
            const response = await product.updateProducts(update)
            if (response) {
                res.send({ status: "success", message: "Produto atualizado com sucesso!" })
            } else {
                res.send({ status: "error", message: "falha ao atualizar o Produto!" })
            }
        } else {
            res.send({ status: "error", message: "Limite de caracteres: Produto:40 - Estoque: 10 - Entrada: 8 - Saida: 8" })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.delete("/produtos/:id", async (req, res) => {
    const id = req.params.id
    const status = req.query.status === "0" ? "1" : "0"
    product.desativeProducts(status, id)
    res.send(
        {
            status: "success",
            message: "Ocultado com sucesso!"
        }
    )

})
module.exports = routes