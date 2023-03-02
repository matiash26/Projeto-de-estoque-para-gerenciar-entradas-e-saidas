const express = require("express")
const stockModel = require("../../../Backend/src/Models/stockModel")
const bodyParser = require("body-parser")
const cors = require("cors")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.get("/estoque/all", async (req, res) => {
    const result = await stockModel.selectStock()
    res.send(result)
})
routes.get("/estoque/", async (req, res) => {
    const search = req.query.search
    const active = req.query.active
    const found = await stockModel.findStock(search, active)
    res.send(found)
})
routes.post("/estoque/", (req, res) => {
    const itemsFromPost = req.body
    const checkAllTheFieldsExist = itemsFromPost.every(el => el.produto && el.estoque)
    const checkLenghFields = itemsFromPost.every(el => el.estoque.length >= 0 && el.estoque.length <= 8)
    if (checkAllTheFieldsExist) {
        if (checkLenghFields) {
            itemsFromPost.forEach(item => {
                stockModel.insertStock(item)
            })
            //se colocar dentro do loop vai dar problema de conexão
            res.send({ status: "success", message: "Produto inserido com sucesso!" })
        } else {
            res.send({ status: "error", message: "Limite de caracteres:  Estoque: 10" })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }

})
routes.put("/estoque/", async (req, res) => {
    const update = req.body
    if (update.produto && update.estoque) {
        if (update.produto.length >= 1 && update.produto.length <= 100 &&  String(update.estoque).length <= 8 &&  String(update.estoque).length >= 1) {
            const response = await stockModel.updateStock(update)
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
routes.delete("/estoque/:id", async (req, res) => {
    const id = req.params.id
    const active = req.query.active === "0" ? "1" : "0"
    const response =  await stockModel.deleteStock(id)
    if (response) {
        res.send({ status: "success", message: "Deletado com sucesso!" })
    } else {
        stockModel.desativeStock(active, id)
        active === "1" ? res.send({ status: "success", message: "Habilitado com sucesso!" })
            : res.send({ status: "success", message: "Ocultado com sucesso!" })
    }
})
module.exports = routes