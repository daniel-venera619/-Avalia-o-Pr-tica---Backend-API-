const bd = require("../config/database");

async function buscarProdutos(filtros = {}) {
    const condicoes = [];
    const parametros = [];

    if (filtros.id_categoria !== undefined) {
        condicoes.push("id_categoria = ?");
        parametros.push(filtros.id_categoria);
    }

    if (filtros.estoque === "normal") {
        condicoes.push("qtd_estoque > qtd_minima");
    } else if (filtros.estoque === "baixo") {
        condicoes.push("qtd_estoque > 0 AND qtd_estoque <= qtd_minima");
    } else if (filtros.estoque === "sem_estoque") {
        condicoes.push("qtd_estoque = 0");
    }

    const where = condicoes.length ? `WHERE ${condicoes.join(" AND ")}` : "";
    const [resultado] = await bd.query(`SELECT * FROM produto ${where}`, parametros);
    return resultado;
}

async function buscarProdutoPorCategoria(id_categoria) {
    return buscarProdutos({ id_categoria });
}

async function buscarProdutoPorId(id) {
    const sql = `SELECT * FROM produto WHERE id = ?`;

    const [resultado] = await bd.query(sql, [id]);
    return resultado[0];
}

async function categoriaExiste(id_categoria) {
    const [resultado] = await bd.query("SELECT id FROM categorias WHERE id = ?", [id_categoria]);
    return resultado.length > 0;
}

async function criarProduto({ nome, descricao, preco, qtd_estoque, qtd_minima, id_categoria }) {
    const sql = `INSERT INTO produto (nome, descricao, preco, qtd_estoque, qtd_minima, id_categoria)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [resultado] = await bd.query(sql, [nome, descricao, preco, qtd_estoque, qtd_minima, id_categoria]);
    return buscarProdutoPorId(resultado.insertId);
}

async function editar(id, dados) {
    const campos = ["nome", "descricao", "preco", "qtd_estoque", "qtd_minima", "id_categoria"];
    const alteracoes = campos.filter((campo) => Object.hasOwn(dados, campo));
    const atribuicoes = alteracoes.map((campo) => `${campo} = ?`).join(", ");
    const valores = alteracoes.map((campo) => dados[campo]);

    await bd.query(`UPDATE produto SET ${atribuicoes} WHERE id = ?`, [...valores, id]);
    return buscarProdutoPorId(id);
}

async function excluir(id) {
    const sql = "DELETE FROM produto WHERE id = ?";
    const [resultado] = await bd.query(sql, [id]);
    return resultado.affectedRows;
}

module.exports = {
    buscarProdutos,
    buscarProdutoPorCategoria,
    buscarProdutoPorId,
    categoriaExiste,
    criarProduto,
    editar,
    excluir
};