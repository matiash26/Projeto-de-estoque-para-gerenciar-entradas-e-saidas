const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.send({
      status: "error",
      msg: "Acesso negado!",
      permission: false,
    });
    return;
  }
  try {
    const secret = process.env.SECRET_KEY;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.send({ status: "error", msg: "Token inválido!" });
  }
}
module.exports = { verifyToken };
