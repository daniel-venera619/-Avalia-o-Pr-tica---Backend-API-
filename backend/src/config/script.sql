 CREATE DATABASE controleDeEstoque;
 USE controleDeEstoque;
 
 CREATE TABLE produto 
( 
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(150) NOT NULL,  
 descricao VARCHAR(250) NOT NULL,  
 preco DECIMAL(10,2) NOT NULL,  
 qtd_estoque INT,  
 qtd_minima INT  
); 

CREATE TABLE categorias 
(  
 id INT AUTO_INCREMENT PRIMARY KEY,  
 id_produto INT NOT NULL,  
 Categoria VARCHAR(250) NOT NULL,  
 FOREIGN KEY (id_produto) REFERENCES produto(id)
); 

INSERT INTO produto (nome, descricao, preco, qtd_estoque, qtd_minima) VALUES 
('Garafa da Agua','Vem agua doce do Gandi','10.50','50','25');

INSERT INTO categorias (id_produto, Categoria) VALUES 
('1','Liquido de refrescancia');

SELECT 
    p.id AS 'ID Produto',
    p.nome AS 'Produto',
    p.preco AS 'Preço',
    p.qtd_estoque AS 'Estoque Atual',
    c.Categoria AS 'Categoria'
FROM produto p
INNER JOIN categorias c ON p.id = c.id_produto;


