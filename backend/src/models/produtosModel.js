const bd = require("../config/database");


async function buscarProdutos() {
    const sql = `SELECT * FROM produto
    `;
    const [resultado] = await bd.query(sql);
    return resultado;
}

async function buscarProdutoPorId(id) {
    const sql = `SELECT * FROM produto WHERE id = ?`;

    const [resultado] = await bd.query(sql, [id]);
    return resultado[0];
}

async function criarProduto(nome, descricao, preco, qtd_estoque, qtd_minima,id_categoria) {
    const sql = `INSERT INTO produto (nome, descricao, preco, qtd_estoque, qtd_minima, id_categoria)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [resultado] = await bd.query(sql, [nome, descricao, preco, qtd_estoque, qtd_minima, id_categoria]);
       
    return {
        id: resultado.insertId,
        nome,
        descricao,
        preco,
        qtd_estoque,
        qtd_minima,
        id_categoria
    };
}

async function editar(id, nome, descricao, preco, qtd_estoque, qtd_minima, id_categoria) {
    const sql = `UPDATE produto SET nome = ?, descricao = ?, preco = ?, qtd_estoque = ?, qtd_minima = ?, id_categoria = ? WHERE id = ?
    `;

    const [resultado] = await bd.query(sql, [nome,  descricao, preco, qtd_estoque, qtd_minima, id_categoria, id ]);
    
    return resultado.affectedRows;
}


async function excluir(id) 
{const sql = `DELETE FROM produto WHERE id = ?
    `;
    const [resultado] = await bd.query(sql, [id]);

    return resultado.affectedRows;
}

module.exports = {
    buscarProdutos,
    buscarProdutoPorId,
    criarProduto,
    editar,
    excluir
};