const express = require("express")
const product = require("../Models/ProductModel")
const bodyParser = require("body-parser")
const cors = require("cors")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.get("/product/all", async (req, res) => {
    const getProduct = await product.select()
    res.send(getProduct)
})
routes.get("/product/", async (req, res) => {
    const search = req.query.search
    const status = req.query.status
    const found = await product.find(search, status)
    res.send(found)
})
routes.post("/product", (req, res) => {
    const productJSON = req.body
    const checkIfExist = productJSON.every(el => el.produto && el.valor)
    const checkLenght = productJSON.every(el => el.produto.length > 0 && el.produto.length <= 100 && String(el.valor).length <= 8)
    if (checkIfExist) {
        if (checkLenght) {
            productJSON.forEach(item => {
                product.insert(item)
            })
            res.send({ status: "success", message: "Produto inserido com sucesso!" })
        } else {
            res.send({ status: "error", message: "Limite de caracteres: Produto:100, Saida: 8" })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.put("/product", async (req, res) => {
    const update = req.body
    if (update.produto && update.valor) {
        if (update.produto.length > 0 && update.produto.length <= 100 && String(update.valor).length <= 8) {
            const response = await product.update(update)
            if (response) {
                res.send({ status: "success", message: "Produto atualizado com sucesso!" })
            } else {
                res.send({ status: "error", message: "falha ao atualizar o Produto!" })
            }
        } else {
            res.send({ status: "error", message: "Limite de caracteres: Produto:100 - Estoque: 10 - Valor: 8 " })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.delete("/product/:id", async (req, res) => {
    const id = req.params.id
    const status = req.query.status === "0" ? "1" : "0"
    product.desative(status, id)
    res.send(
        {
            status: "success",
            message: "Ocultado com sucesso!"
        }
    )

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
module.exports = routes