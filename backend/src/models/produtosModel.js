const bd = require("../config/database");

async function buscarProdutos() {
    const sql = `
      SELECT * FROM produto
      
    `;
    const [resultado] = await bd.query(sql);
    return resultado;
}

async function buscarProdutoPorId(id) {
    const sql = `SELECT * FROM produto WHERE id = ?    
    `;
    const [resultado] = await bd.query(sql, [id]);
    return resultado[0]; 
}

async function criarProduto(nome, descricao, preco, qtd_estoque, qtd_minima) {
    const sql = `INSERT INTO produto (nome, descricao, preco, qtd_estoque, qtd_minima) 
    VALUES (?, ?, ?, ?, ?)`;
    const [resultado] = await bd.query(sql, [nome, descricao, preco, qtd_estoque, qtd_minima]);
    
    return {
        id: resultado.insertId,
        nome,
        descricao,
        preco,
        qtd_estoque,
        qtd_minima
    };
}

async function editar (id, nome, descricao, preco, qtd_estoque, qtd_minima)  {
    await db.query(
        "UPDATE produto SET nome=?, descricao=?, preco=?, qtd_estoque=?, qtd_minima=?  WHERE id=?",
        [ nome, descricao, preco, qtd_estoque, qtd_minima, id] 
    );

    return{
        id,
        nome,
        descricao,
        preco,
        qtd_estoque,
        qtd_minima
    };
}
async function excluir (id)  {
    const [resultado] = await db.query(
        "DELETE FROM produto WHERE id=?",
        [id]
    )
    
    return resultado.affectedRows;
}

module.exports = {
    buscarProdutos,
    buscarProdutoPorId,
    criarProduto,
    editar,
    excluir  
};