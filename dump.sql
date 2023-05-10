CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

INSERT INTO categorias (descricao)
VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

create table produtos(
	id serial primary key,
    descricao text not null,
    quantidade_estoque int not null,
    valor int not null,
    categoria_id int references categorias(id)
);

create table clientes(
    id serial primary key,
    nome text not null,
    email varchar(100) unique not null,
    cpf varchar(11) unique not null,
    cep varchar(8),
    rua varchar,
    numero int, 
    bairro varchar,
    cidade varchar,
    estado char(2)
);