// const express = require("express")
// const historic = require("../Models/HistoricoModel")
// const product = require("../Models/ProductModel")
// const bodyParser = require("body-parser")
// const cors = require("cors")

// const routes = express.Router()
// routes.use(bodyParser.json())
// routes.use(cors())

// routes.get("/historico/all", async (req, res) => {
//     const select = await historic.selectHistoric();
//     res.send(select)
// })
// routes.get("/historico/order/:order", async (req, res) => {
//     const orderID = req.params.order
//     const order = await historic.selectHistoryByOrder(orderID)
//     res.send(order)
// })
// routes.get("/historico/filter/:start/:offset", async (req, res) => {
//     const found = await historic.filterDate(req.params)
//     res.send(found)
// })
// routes.get("/historico/grafico", async (req, res) => {
//     const search = req.params.search
//     const found = await historic.findHistoric(search)
//     res.send(found)
// })
// routes.post("/historico/", async (req, res) => {
//     const bodyData = req.body
//     const checkAllFields = bodyData.every(item => item.id && item.quantidade && item.saida)
//     const checkLenghtFields = bodyData.every(item => String(item.saida).length < 8 && item.estoque - item.quantidade >= 0)
//     const orderID = await orderGenerate()
//     if (checkAllFields) {
//         if (checkLenghtFields) {
//             bodyData.forEach(async EachOrder => {
//                 let decrementEstoqueProduct = EachOrder.estoque - EachOrder.quantidade
//                 const response = await historic.insertHistoric({ ...EachOrder, orderID })
//                 if(response) {
//                     product.productModifyEstoque(decrementEstoqueProduct, EachOrder.id)
//                     res.send({ status: "success", message: "Pedido inserido com sucesso!" })
//                 }
//             })
//         } else {
//             res.send({ status: "error", message: "Verifique se existe estoque para essa quantidade" })
//         }
//     } else {
//         res.send({ status: "error", message: "verifique se todos os campos estão preenchidos!" })
//     }
// })
// routes.delete("/historico/:order", async (req, res) => {
//     const order = req.params.order
//     const response = await historic.deleteHistoric(order)
//     if (response) {
//         res.send({ status: "success", message: "Pedido deletado com sucesso!" })
//     } else {
//         res.send({ status: "error", message: "falha ao deletar o pedido!" })
//     }
// })
// routes.put("/historico/", async (req, res) => {
//     const { cart, oldCart } = req.body
//     const checkLenghtFields = cart.every(item => 0 < String(item.saida).length < 8)
//     if (checkLenghtFields) {
//         cart.forEach(update => {
//             let getOldCart = oldCart.shift()
//             let quantity = getOldCart.estoque - (update.quantidade - getOldCart.quantidade)
//             const response = historic.updateHistoric(update)
//             if (response) {
//                 res.send({ status: "success", message: "Pedido atualizado com sucesso!" })
//                 product.productModifyEstoque(quantity, update.idProduto)
//             }
//         })
//     } else {
//         res.send({ status: "error", message: "Verifique se existe estoque para essa quantidade" })
//     }
// })
// const orderGenerate = async () => {
//     const generateOrder = []
//     while (true) {
//         for (let x = 0; x < 5; x++) {
//             generateOrder.push(Math.floor(Math.random() * 10))
//         }
//         let result = await historic.verifyOrderIfExist(generateOrder.join(""))
//         let verify = result[0][0] ? true : false
//         if (!verify) {
//             return generateOrder.join("")
//         }
//     }
// }
// module.exports = routes