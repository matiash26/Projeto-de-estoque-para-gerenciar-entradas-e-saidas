const stock = require("../Models/stockModel")
const jwt = require("jsonwebtoken")
const express = require("express")
require("dotenv").config()

const routes = express.Router()

routes.get("/stock/all",verifyToken, async (req, res) => {
    const stockItems = await stock.select()
    const onlyStatusActive = stockItems.filter(each => each.status === "1")
    res.send(onlyStatusActive)
    //não filtrei pela query porque eu preciso dos itens inátivo no end point product/filtered
})
routes.get("/stock/",verifyToken, async (req, res) => {
    const search = req.query.search
    const active = req.query.active
    const found = await stock.find(search, active)
    res.send(found)
})
routes.post("/stock/", verifyToken, (req, res) => {
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
routes.put("/stock/", verifyToken, async (req, res) => {
    const update = req.body
    if (update.produto && update.estoque) {
        if (update.produto.length >= 1 && update.produto.length <= 100 && String(update.estoque).length <= 8 && String(update.estoque).length >= 1) {
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
routes.delete("/stock/:id", verifyToken, async (req, res) => {
    const id = req.params.id
    const active = req.query.active === "0" ? "1" : "0"
    const response = await stock.Delete(id)
    if (response) {
        res.send({ status: "success", message: "Deletado com sucesso!" })
    } else {
        stockModel.desativeStock(active, id)
        active === "1" ? res.send({ status: "success", message: "Habilitado com sucesso!" })
            : res.send({ status: "success", message: "Ocultado com sucesso!" })
    }
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
module.exports = routes