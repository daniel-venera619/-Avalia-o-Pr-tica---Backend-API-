const bd = require("../config/database");

async function buscarCategoria() {
    const sql = `
        SELECT * FROM categorias
    `;

    const [resultado] = await bd.query(sql);
    return resultado;
}

async function buscarcategoriasPorId(id) {
    const sql = `
        SELECT * FROM categorias WHERE id = ?
    `;

    const [resultado] = await bd.query(sql, [id]);
    return resultado[0];
}

async function criarCategoria(nome) {
    const sql = `
        INSERT INTO categorias (nome) VALUES (?)
    `;

    const [resultado] = await bd.query(sql, [nome]);

    return {
        id: resultado.insertId,
        nome
    };
}

async function editar(id, nome) {
    const sql = `
        UPDATE categorias SET nome = ? WHERE id = ?
    `;

    const [resultado] = await bd.query(sql, [nome, id]);

    return resultado.affectedRows;
}

async function excluir(id) {
    const sql = `
        DELETE FROM categorias WHERE id = ?
    `;

    const [resultado] = await bd.query(sql, [id]);

    return resultado.affectedRows;
}

module.exports = {
    buscarCategoria,
    buscarcategoriasPorId,
    criarCategoria,
    editar,
    excluir
};