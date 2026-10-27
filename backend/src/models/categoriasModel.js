const bd = require("../config/database");

async function buscarCategoria() {
    const sql = `
      SELECT * FROM categorias
      
    `;
    const [resultado] = await bd.query(sql);
    return resultado;
}

async function buscarcategoriasPorId(id) {
    const sql = `SELECT * FROM categorias WHERE id = ?    
    `;
    const [resultado] = await bd.query(sql, [id]);
    return resultado[0]; 
}

async function criarCategoria(id_produto, categoria) {
    const sql = `INSERT INTO categorias (id_produto, Categoria) VALUES (?, ?)`;
    const [resultado] = await bd.query(sql, [id_produto, categoria]);
    
    return {
        id: resultado.insertId,
        id_produto,
        categoria
    };
}

async function editar (id, categoria)  {
    await db.query(
        "UPDATE categorias SET categoria=? WHERE id=?",
        [ categoria, id] 
    );

    return{
        id,
        categoria
    };
}
async function excluir (id)  {
    const [resultado] = await db.query(
        "DELETE FROM categorias WHERE id=?",
        [id]
    )
    
    return resultado.affectedRows;
}

module.exports = {
    buscarCategoria,
    buscarcategoriasPorId,
    criarCategoria,
    editar,
    excluir
}