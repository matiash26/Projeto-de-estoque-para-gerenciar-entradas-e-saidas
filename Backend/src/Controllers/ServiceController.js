const express = require("express")
const service = require("../../../Backend/src/Models/ServiceModel")
const bodyParser = require("body-parser")
const cors = require("cors")

const routes = express.Router()
routes.use(bodyParser.json())
routes.use(cors())
routes.get("/services/all", async (req, res) => {
    const getData = await service.select()
    res.send(getData)
})
routes.get("/services/filter/:start/:offset", async (req, res) => {
    const found = await service.find(req.params)
    res.send(found)
})
routes.post("/services/", (req, res) => {
    const serviceJSON = req.body
    const checkIfExist = serviceJSON.every(el => el.service && el.gasto)
    const checkLenght = serviceJSON.every(el => el.service.length > 0 && el.service.length <= 100 && String(el.gasto).length <= 11)
    if (checkIfExist) {
        if (checkLenght) {
            serviceJSON.forEach(item => {
                service.insert(item)
            })
            res.send({ status: "success", message: "Serviço inserido com sucesso!" })
        } else {
            res.send({ status: "error", message: "Limite de caracteres: Serviço:100 - Gasto: 8" })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.put("/services/", async (req, res) => {
    const update = req.body
    if (update.service && update.gasto) {
        if (update.service.length > 0 && update.service.length <= 100 && String(update.gasto).length <= 11) {
            const response = await service.update(update)
            if (response) {
                res.send({ status: "success", message: "Serviço atualizado com sucesso!" })
            } else {
                res.send({ status: "error", message: "falha ao atualizar o Serviço!" })
            }
        } else {
            res.send({ status: "error", message: "Limite de caracteres: Serviço: 100 - Gasto: 11" })
        }
    } else {
        res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
    }
})
routes.delete("/services/:id", async (req, res) => {
    const id = req.params.id
    service.Delete(id)
    res.send(
        {
            status: "success",
            message: "Deletado com sucesso!"
        }
    )

})
module.exports = routes