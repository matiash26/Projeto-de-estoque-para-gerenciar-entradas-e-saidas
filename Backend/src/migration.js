const { client } = require("../config/database")

client.query(`
CREATE TABLE IF NOT EXISTS produtos(
  id int AUTO_INCREMENT not null,
  produto varchar(100) unique not null,
  status enum('1', '0') DEFAULT NULL,
  valor decimal(10, 2) DEFAULT NULL,
  PRIMARY KEY (id)
) engine = INNODB CHARACTER SET utf8mb4;`)

client.query(`
CREATE TABLE IF NOT EXISTS estoque(
  id int AUTO_INCREMENT,
  idProduto int not null,
  data DATE not null,
  estoque int not null,
  PRIMARY KEY (id),
  FOREIGN KEY (idProduto) REFERENCES produtos(id)
  ) engine = INNODB CHARACTER SET utf8mb4;`)

client.query(`
CREATE TABLE IF NOT EXISTS servicos(
id int AUTO_INCREMENT not null primary KEY,
servico varchar(100) unique not null,
data DATE not null,
gasto decimal(10,2) not null
) engine = INNODB CHARACTER SET utf8mb4;`)

client.query(`
CREATE TABLE IF NOT EXISTS entrada(
  id int AUTO_INCREMENT not null,
  pedido varchar(10) unique not null,
  idEstoque int(11) NOT NULL,
  data DATE not null,
  valor decimal(10, 2) not null,
  PRIMARY KEY(id),
  FOREIGN KEY(idEstoque) REFERENCES estoque(id)
) engine = INNODB CHARACTER SET utf8mb4;
`)
client.query(`
CREATE TABLE IF NOT EXISTS usuarios (
  id int(11) NOT NULL AUTO_INCREMENT,
  user varchar(100) NOT NULL,
  data date NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY user (user)
) ENGINE = InnoDB DEFAULT CHARSET = utf8
`)
console.log("migration executada com sucesso");