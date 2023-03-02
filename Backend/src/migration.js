const { client } = require("../config/database")

client.query(`
CREATE TABLE IF NOT EXISTS produtos(
  id int AUTO_INCREMENT not null,
  produto varchar(100) unique not null,
  PRIMARY KEY (id)
) engine = INNODB CHARACTER SET utf8mb4;`)
client.query(`
CREATE TABLE IF NOT EXISTS estoque(
  id int AUTO_INCREMENT,
  idProduto int not null,
  data DATE not null,
  quantidade int not null,
  valor decimal(10,2) not null,
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
  idProduto int not null,
  data DATE not null,
  produtos int not null,
  total decimal(10, 2) not null,
  PRIMARY KEY(id),
  FOREIGN KEY(idProduto) REFERENCES produtos(id)
) engine = INNODB CHARACTER SET utf8mb4;
`)
console.log("migration executada com sucesso");