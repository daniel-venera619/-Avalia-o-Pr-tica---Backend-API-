const httpError = require("./httpError");

const produtoCampos = [
    "nome",
    "descricao",
    "preco",
    "qtd_estoque",
    "qtd_minima",
    "id_categoria"
];

function validarId(valor, campo = "id") {
    const id = Number(valor);
    if (!/^[1-9]\d*$/.test(String(valor)) || !Number.isSafeInteger(id) || id > 2147483647) {
        throw httpError(400, `${campo} deve ser um número inteiro positivo`);
    }

    return id;
}

function validarObjeto(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw httpError(400, "O corpo da requisição deve ser um objeto JSON");
    }
}

function validarNomeCategoria(body) {
    validarObjeto(body);

    if (Object.keys(body).some((campo) => campo !== "nome")) {
        throw httpError(400, "Apenas o campo nome é permitido");
    }

    if (typeof body.nome !== "string" || !body.nome.trim() || body.nome.trim().length > 100) {
        throw httpError(400, "O nome da categoria é obrigatório e deve ter até 100 caracteres");
    }

    return body.nome.trim();
}

function validarProduto(body, parcial = false) {
    validarObjeto(body);
    const camposRecebidos = Object.keys(body);
    const camposInvalidos = camposRecebidos.filter((campo) => !produtoCampos.includes(campo));

    if (camposInvalidos.length) {
        throw httpError(400, `Campos não permitidos: ${camposInvalidos.join(", ")}`);
    }

    if (!camposRecebidos.length) {
        throw httpError(400, "Informe ao menos um campo para atualizar");
    }

    if (!parcial) {
        const camposAusentes = produtoCampos.filter((campo) => !Object.hasOwn(body, campo));

        if (camposAusentes.length) {
            throw httpError(400, `Campos obrigatórios ausentes: ${camposAusentes.join(", ")}`);
        }
    }

    const dados = { ...body };

    if (Object.hasOwn(dados, "nome")) {
        if (typeof dados.nome !== "string" || !dados.nome.trim() || dados.nome.trim().length > 150) {
            throw httpError(400, "O nome do produto é obrigatório e deve ter até 150 caracteres");
        }
        dados.nome = dados.nome.trim();
    }

    if (Object.hasOwn(dados, "descricao")) {
        if (typeof dados.descricao !== "string" || !dados.descricao.trim() || dados.descricao.trim().length > 250) {
            throw httpError(400, "A descrição é obrigatória e deve ter até 250 caracteres");
        }
        dados.descricao = dados.descricao.trim();
    }

    if (Object.hasOwn(dados, "preco")) {
        if (
            typeof dados.preco !== "number" ||
            !Number.isFinite(dados.preco) ||
            dados.preco > 99999999.99 ||
            Math.round(dados.preco * 100) <= 0
        ) {
            throw httpError(400, "O preço deve ser um número maior que zero");
        }
    }

    for (const campo of ["qtd_estoque", "qtd_minima"]) {
        if (
            Object.hasOwn(dados, campo) &&
            (!Number.isSafeInteger(dados[campo]) || dados[campo] < 0 || dados[campo] > 2147483647)
        ) {
            throw httpError(400, `${campo} deve ser um número inteiro não negativo`);
        }
    }

    if (Object.hasOwn(dados, "id_categoria")) {
        dados.id_categoria = validarId(dados.id_categoria, "id_categoria");
    }

    return dados;
}

module.exports = {
    validarId,
    validarNomeCategoria,
    validarProduto
};
