const { client } = require("../config/database")
const date = new Date();
const day = date.getDate()
const month = (date.getMonth() + 1).toString().padStart(2, "0")
const year = date.getFullYear()
async function createSchema() {
  const mysql = await client()
  mysql.query(`
    CREATE TABLE IF NOT EXISTS produtos(
      id int AUTO_INCREMENT not null,
      produto varchar(100) unique not null,
      status enum('1', '0') DEFAULT NULL,
      valor decimal(10, 2) DEFAULT NULL,
      PRIMARY KEY (id)
    ) engine = INNODB CHARACTER SET utf8mb4;`)

  mysql.query(`
    CREATE TABLE IF NOT EXISTS estoque(
      id int AUTO_INCREMENT not null,
      idProduto int unique not null,
      data varchar(20),
      status enum("1","0"),
      estoque int not null,
      PRIMARY KEY (id),
      FOREIGN KEY (idProduto) REFERENCES produtos(id)
      ) engine = INNODB CHARACTER SET utf8mb4;`)

  mysql.query(`
    CREATE TABLE IF NOT EXISTS servicos(
    id int AUTO_INCREMENT not null,
    servico varchar(100) unique not null,
    data DATE not null,
    gasto decimal(10,2) not null,
    PRIMARY KEY (id)
    ) engine = INNODB CHARACTER SET utf8mb4;`)

  mysql.query(`
    CREATE TABLE IF NOT EXISTS entradas(
      id int AUTO_INCREMENT not null,
      pedido varchar(10) unique not null,
      idEstoque int(11) NOT NULL,
      data DATE not null,
      valor decimal(10, 2) not null,
      quantidade int not null,
      PRIMARY KEY(id),
      FOREIGN KEY(idEstoque) REFERENCES estoque(id)
    ) engine = INNODB CHARACTER SET utf8mb4;
    `)
  mysql.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id int(11) NOT NULL AUTO_INCREMENT,
      picture varchar(255),
      user varchar(100) NOT NULL,
      data date NOT NULL,
      password varchar(255) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY user (user)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8
    `)
  try {
    const response =  await mysql.query(`INSERT INTO usuarios(picture, user, data, password) VALUES("default.jpg", "admin", "${year}-${month}-${day}", "$2b$10$7DJEatoQOfdfmcryj1suaeFWnkU43LCgVss4UWtpR/9QXKnV9D4Ee")`)
    response.code == "ER_DUP_ENTRY" ? console.log("Usuário já é registrado") : console.log("USUÁRIO: admin | SENHA: 123")
    
  } catch (error) {
    console.log("ERRO: VERIFIQUE SE JÁ FOI CRIADO O USUÁRIO")
  }
}
createSchema()