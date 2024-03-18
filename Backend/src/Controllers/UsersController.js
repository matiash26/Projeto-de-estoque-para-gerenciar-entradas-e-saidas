const { verifyToken } = require("./../utils/verifyToken");
const fileUpload = require("express-fileupload");
const express = require("express");
const bcrypt = require("bcrypt");
const users = require("../Models/UsersModel.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const { info } = require("console");

require("dotenv").config();

const routes = express.Router();

const secret = process.env.SECRET_KEY;
const pathImage = path.join(__dirname, "../images/");
routes.use("/images", express.static(pathImage));
routes.use(fileUpload());
routes.post("/sign-up", verifyToken, (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  if (!userName || !password) {
    res.send({ status: "error", message: "Preencha todos os campos!" });
    return;
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    const response = await users.insert(userName, hash);
    if (response) {
      res.send({
        status: "success",
        message: "Usuario cadastrado com sucesso!",
      });
      return;
    }
    res.send({ status: "error", message: "Erro ao cadastrar o usuário!" });
  });
});
routes.post("/sign-in/", async (req, res) => {
  const { userName, password } = req.body;
  const [getUser] = await users.signIn(userName);
  if (!getUser) {
    res.send({ status: "error", message: "Usuário inválido!" });
    return;
  }
  bcrypt.compare(password, getUser.password, (err, results) => {
    if (!results) {
      res.send({ status: "error", message: "Senha inválida!" });
      return;
    }
    const token = jwt.sign(
      {
        id: getUser.id,
        userName: getUser.user,
        picture: getUser.picture,
      },
      secret
    );
    const userData = jwt.decode(token);
    res.send({ status: "success", permission: results, token, userData });
  });
});
routes.get("/users/list", verifyToken, async (req, res) => {
  const user = await users.select();
  const token = req.headers["authorization"].split(" ")[1];
  const decode = jwt.decode(token);
  const userList = user.filter(({ user }) => user !== decode.userName);
  res.send(userList);
});
routes.delete("/users/delete", verifyToken, async (req, res) => {
  const id = req.query.id;
  const user = await users.Delete(id);
  if (!user) {
    res.send({ status: "error", message: "falha ao deletar o usuário!" });
    return;
  }
  res.send({ status: "success", message: "Usuário deletado com sucesso!" });
});
routes.post("/users/update", verifyToken, async (req, res) => {
  const { userName, password, newPassword } = req.body;
  const file = req.files?.picture;
  const token = req.headers["authorization"].split(" ")[1];
  if (!userName || !password) {
    res.send({
      alert: { status: "error", message: "Preencha os campos!" },
      updated: {},
    });
    return;
  }
  const detail = jwt.decode(token, secret);
  const userData = await users.findById(detail.id);
  bcrypt.compare(password, userData.password, async (err, confirm) => {
    if (!confirm) {
      res.send({
        alert: { status: "error", message: "Senha inválida!", updated: {} },
      });
      return;
    }
    bcrypt.hash(newPassword, 10, async (erro, hash) => {
      const password = newPassword ? hash : userData.password;
      const picture = file?.name ?? detail.picture;
      await users.update(picture, userName, password, detail.id);
      const infoUpdated = await users.findById(detail.id);
      delete infoUpdated.password;
      res.send({
        alert: {
          status: "success",
          message: "Perfil atualizado com sucesso!",
        },
        updated: infoUpdated,
      });
      file ? file.mv(pathImage + file.name) : null;
    });
  });
});
routes.post("/verifyToken", async (req, res) => {
  const token = req.body.token;
  try {
    const jwtData = jwt.verify(token, secret);
    const userData = await users.findById(jwtData.id);
    delete userData.password;
    res.send({ status: "success", permission: true, userData });
  } catch (error) {
    res.send({ status: "success", permission: false });
  }
});

module.exports = routes;
