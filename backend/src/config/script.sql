
CREATE DATABASE IF NOT EXISTS controleDeEstoque;
USE controleDeEstoque;

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao VARCHAR(250) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    qtd_estoque INT NOT NULL,
    qtd_minima INT NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT chk_produto_preco CHECK (preco > 0),
    CONSTRAINT chk_produto_qtd_estoque CHECK (qtd_estoque >= 0),
    CONSTRAINT chk_produto_qtd_minima CHECK (qtd_minima >= 0),
    CONSTRAINT fk_produto_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

INSERT IGNORE INTO categorias (nome) VALUES
('Bebidas'),
('Alimentos'),
('Limpeza');