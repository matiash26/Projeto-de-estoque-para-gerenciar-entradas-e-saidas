const express = require("express")
const bcrypt = require("bcrypt")
const users = require("../Models/UsersModel.js")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const routes = express.Router()

routes.post("/sign-up", (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    if (userName && password) {
        bcrypt.hash(password, 10, async (err, hash) => {
            const response = await users.insert(userName, hash)
            if (response) {
                res.send({ status: "success", message: "Usuario cadastrado com sucesso!" })
            } else {
                res.send({ status: "error", message: "Erro ao cadastrar o usuário!" })
            }
        })
    } else {
        res.send({ status: "error", message: "Preencha todos os campos!" })
    }
})
routes.post("/sign-in/", async (req, res) => {
    const { userName, password } = req.body
    const getUser = await users.signIn(userName)
    if (getUser.length) {
        bcrypt.compare(password, getUser[0].password, function (err, results) {
            const secret = process.env.SECRET_KEY
            const token = jwt.sign({
                picture: '',
                userName: getUser[0].user,
            }, secret)
            const userData = jwt.decode(token)
            res.send({ status: "success", permission: true, token, userData})
        })
    }
})
routes.get("/users/list", async (req, res) => {
    const user = await users.select()
    res.send(user)
})
routes.delete("/users/delete", async (req, res) => {
    const id = req.query.id
    const user = await users.Delete(id)
    if (user) {
        res.send({ status: "success", message: "Usuário deletado com sucesso!" })
    } else {
        res.send({ status: "error", message: "falha ao deletar o usuário!" })
    }
})
routes.put("/users/update",  (req, res) => {
    const update = req.body
    if (update.newPassword || update.picture || update.user || update.password) {
        users.update(update)
        res.send({ status: "success", message: "Perfil atualizado com sucesso!" })
    } else {
        res.send({ status: "error", message: "Preencha os campos!" })
    }
})
routes.put("/users/update", (req, res) => {
    const update = req.body
    if (update.newPassword || update.picture || update.user || update.password) {
        users.update(update)
        res.send({ status: "success", message: "Perfil atualizado com sucesso!" })
    } else {
        res.send({ status: "error", message: "Preencha os campos!" })
    }
})
routes.post("/verifyToken",verifyToken, (req, res) =>{
    const token = req.body.token
    const userData = jwt.decode(token)
    res.send({ status: "success", permission: true, userData})

})
function verifyToken(req, res, next) {
    const authHeader = req.body.token
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
