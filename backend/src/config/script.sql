
CREATE DATABASE controleDeEstoque;
USE controleDeEstoque;


CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao VARCHAR(250) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    qtd_estoque INT NOT NULL,
    qtd_minima INT NOT NULL,
    id_categoria INT NOT NULL,

    FOREIGN KEY (id_categoria)
        REFERENCES categorias(id)
);

INSERT INTO categorias (nome) VALUES
('Bebidas'),
('Alimentos'),
('Limpeza');

INSERT INTO produto
(nome, descricao, preco, qtd_estoque, qtd_minima, id_categoria)
VALUES
('Garrafa de agua', 'Agua mineral', 10.50, 50, 25, 1),
('Salgadinho', 'crocancia cade mordida', 25.48, 50, 25, 2),
('Sabone', 'Lava e deixa cheiroso', 50.25, 50, 25, 3);


SELECT
    p.id AS 'ID Produto',
    p.nome AS 'Produto',
    p.preco AS 'Preco',
    p.qtd_estoque AS 'Estoque Atual',
    p.qtd_minima AS 'Estoque Minimo',
    c.nome AS 'Categoria'
FROM produto p
INNER JOIN categorias c
    ON p.id_categoria = c.id;


    --EXEMPLO DE PRODUTOS:


{
    "nome": "Arroz",
    "descricao": "Pacote de arroz de 5kg",
    "preco": 28.90,
    "qtd_estoque": 50,
    "qtd_minima": 10,
    "id_categoria": 2
}

{
    "nome": "Detergente",
    "descricao": "Detergente liquido de 500ml",
    "preco": 3.99,
    "qtd_estoque": 8,
    "qtd_minima": 15,
    "id_categoria": 3
}

--EXEMPLO DE CATEWGORIAS:

{
    "nome": "Bebidas"
}

{
    "nome": "Alimentos"
}

{
    "nome": "Limpeza"
}