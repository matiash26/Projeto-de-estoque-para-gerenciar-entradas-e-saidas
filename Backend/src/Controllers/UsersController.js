const fileUpload = require('express-fileupload');
const express = require("express")
const bcrypt = require("bcrypt")
const path = require("path")
const users = require("../Models/UsersModel.js")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const routes = express.Router()

const secret = process.env.SECRET_KEY
const pathImage = path.join(__dirname, "../images/")
bcrypt.hash("123",10,(a, b)=> console.log(b)) 
routes.use("/images", express.static(pathImage))
routes.use(fileUpload())

routes.post("/sign-up", verifyToken, (req, res) => {
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
    const { user, password } = req.body
    const [getUser] = await users.signIn(user)
    if (getUser) {
        bcrypt.compare(password, getUser.password, function (err, results) {
            if (results) {
                const token = jwt.sign({
                    id: getUser.id,
                    userName: getUser.user,
                    picture: getUser.picture
                }, secret)
                const userData = jwt.decode(token)
                res.send({ status: "success", permission: results, token, userData })
            } else {
                res.send({ status: "error", message: "Senha inválida!" })

            }
        })
    } else {
        res.send({ status: "error", message: "Usuário inválido!" })
    }
})
routes.get("/users/list", verifyToken, async (req, res) => {
    const user = await users.select()
    res.send(user)
})
routes.delete("/users/delete", verifyToken, async (req, res) => {
    const id = req.query.id
    const user = await users.Delete(id)
    if (user) {
        res.send({ status: "success", message: "Usuário deletado com sucesso!" })
    } else {
        res.send({ status: "error", message: "falha ao deletar o usuário!" })
    }
})
routes.post("/users/update", verifyToken, async (req, res) => {
    const { userName, password, newPassword } = req.body
    const file = req.files?.picture ?? false
    const token = req.headers["authorization"].split(" ")[1]
    if (userName && password) {
        const tokenDetailt = jwt.decode(token, secret)
        const [userData] = await users.signIn(tokenDetailt.userName)
        // pegar o nome de usuário via token, pq se ele alterar o nick no front o usuário n será encontrado
        bcrypt.compare(password, userData.password, async (err, confirm) => {
            if (confirm) {
                bcrypt.hash(newPassword, 10, async (erro, hash) => {
                    const picture = file.name || userData.picture
                    const password = newPassword? hash : userData.password
                    const response = await users.update(picture, userName, password, tokenDetailt.id)
                    if (response) {
                        res.send({ status: "success", message: "Senha atualizada com sucesso!" })
                        file ? file.mv(pathImage + file.name) : null
                    }
                })
            } else {
                res.send({ status: "error", message: "Senha inválida!" })
            }
        })
    } else {
        res.send({ status: "error", message: "Preencha os campos!" })
    }
})
routes.post("/verifyToken", (req, res) => {
    const token = req.body.token
    const userData = jwt.decode(token)
    res.send({ status: "success", permission: true, userData })

})
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
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
