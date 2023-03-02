const express = require("express")
const product = require("../../../Backend/src/Models/ProductModel")
const bodyParser = require("body-parser")
const cors = require("cors")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.get("/produtos/all", async (req, res) => {
    const getData = product.selectProducts()
    res.send(await getData)
})
routes.get("/produtos/", async (req, res) => {
    const search = req.query.search
    const active = req.query.active
    const found = await product.findProducts(search, active)
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
    } else{
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.put("/produtos", async (req, res) => {
    const productJSON = req.body
    if (productJSON.produto && productJSON.valor) {
        if (el.produto.length > 0 && el.produto.length <= 100 && String(el.valor).length <= 8) {
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
    const active = req.query.active === "0" ? "1" : "0"
    const response = await product.deleteProducts(id)
    if (response) {
        res.send({ status: "success", message: "Deletado com sucesso!" })
    } else {
        product.desativeProducts(active, id)
        active === "1" ? res.send({ status: "success", message: "Habilitado com sucesso!" })
            : res.send({ status: "success", message: "Ocultado com sucesso!" })
    }
})
module.exports = routes