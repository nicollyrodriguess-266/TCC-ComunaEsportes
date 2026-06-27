CREATE DATABASE cadastro_usuarios;

USE cadastro_usuarios;


CREATE TABLE users (

id INT AUTO_INCREMENT PRIMARY KEY,

nome VARCHAR(100) NOT NULL,

telefone VARCHAR(20) NOT NULL,

endereco VARCHAR(100) NOT NULL,

ativo BOOLEAN DEFAULT TRUE

);



INSERT INTO users(nome,telefone,endereco)
VALUES

("Maria","11999999999","Rua A"),

("Joao","11988888888","Rua B"),

("Ana","11977777777","Rua C");