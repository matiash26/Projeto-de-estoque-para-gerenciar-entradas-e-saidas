const express = require("express")
const users = require("../Models/UsersModel.js")
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require("bcrypt")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())

routes.post("/users/register", (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    bcrypt.hash(password, 10, async (err, hash) => {
        const response = users.insert(userName, hash)
        if (response) {
            res.send({ status: "success", message: "Usuario cadastrado com sucesso!" })
        } else {
            res.send({ status: "error", message: "Erro ao cadastrar o usuário!" })
        }
    })
})
routes.get("/users/list", async (req, res) => {
    const user = await users.select()
    res.send(user)
})
routes.delete("/users/delete", async (req, res) => {
    const id = req.query.id
    const user = await users.Delete(id)
    if(user) {
        res.send({ status: "success", message: "Usuário deletado com sucesso!" })
    }else{
        res.send({ status: "error", message: "falha ao deletar o usuário!" })
    }
})
module.exports = routes
