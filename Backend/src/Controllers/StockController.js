const express = require("express")
const stock = require("../Models/stockModel")
const bodyParser = require("body-parser")
const cors = require("cors")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.get("/stock/all", async (req, res) => {
    const result = await stock.select()
    res.send(result)
})
routes.get("/stock/", async (req, res) => {
    const search = req.query.search
    const active = req.query.active
    const found = await stockModel.find(search, active)
    res.send(found)
})
routes.post("/stock/", (req, res) => {
    const itemsFromPost = req.body
    const checkAllTheFieldsExist = itemsFromPost.every(el => el.id && el.estoque)
    const checkLenghFields = itemsFromPost.every(el => el.estoque.length >= 0 && el.estoque.length <= 8)
    if (checkAllTheFieldsExist) {
        if (checkLenghFields) {
            itemsFromPost.forEach(item => {
                stock.insert(item)
            })
            // se colocar dentro do loop vai dar problema de conexão
            res.send({ status: "success", message: "Estoque inserido com sucesso!" })
        } else {
            res.send({ status: "error", message: "Limite de caracteres: Estoque: 10" })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }

})
routes.put("/stock/", async (req, res) => {
    const update = req.body
    if (update.produto && update.estoque) {
        if (update.produto.length >= 1 && update.produto.length <= 100 &&  String(update.estoque).length <= 8 &&  String(update.estoque).length >= 1) {
            const response = await stock.update(update)
            if (response) {
                res.send({ status: "success", message: "Estoque atualizado com sucesso!" })
            } else {
                res.send({ status: "error", message: "falha ao atualizar o Estoque!" })
            }
        } else {
            res.send({ status: "error", message: "Limite de caracteres: Quantidade: 10" })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.delete("/stock/:id", async (req, res) => {
    const id = req.params.id
    const active = req.query.active === "0" ? "1" : "0"
    const response =  await stock.Delete(id)
    if (response) {
        res.send({ status: "success", message: "Deletado com sucesso!" })
    } else {
        stockModel.desativeStock(active, id)
        active === "1" ? res.send({ status: "success", message: "Habilitado com sucesso!" })
            : res.send({ status: "success", message: "Ocultado com sucesso!" })
    }
})
module.exports = routes