
const produtoModel = require("../models/produtosModel");
const httpError = require("../utils/httpError");
const { validarId, validarProduto } = require("../utils/validation");

const buscarTodos = async (req, res) => {
    const filtros = {};

    if (req.query.categoria !== undefined) {
        filtros.id_categoria = validarId(req.query.categoria, "categoria");
    }

    if (req.query.estoque !== undefined) {
        const situacoesValidas = ["normal", "baixo", "sem_estoque"];
        if (typeof req.query.estoque !== "string" || !situacoesValidas.includes(req.query.estoque)) {
            throw httpError(400, "O filtro estoque deve ser normal, baixo ou sem_estoque");
        }
        filtros.estoque = req.query.estoque;
    }

    res.json(await produtoModel.buscarProdutos(filtros));
};

const buscarPorId = async (req, res) => {
    const id = validarId(req.params.id);
    const produto = await produtoModel.buscarProdutoPorId(id);

    if (!produto) {
        throw httpError(404, "Produto não encontrado");
    }

    res.json(produto);
};

const criar = async (req, res) => {
    const dados = validarProduto(req.body);
    if (!await produtoModel.categoriaExiste(dados.id_categoria)) {
        throw httpError(400, "A categoria informada não existe");
    }
    const produto = await produtoModel.criarProduto(dados);
    res.status(201).json(produto);
};

const atualizar = async (req, res, parcial) => {
    const id = validarId(req.params.id);
    const produto = await produtoModel.buscarProdutoPorId(id);

    if (!produto) {
        throw httpError(404, "Produto não encontrado");
    }

    const dados = validarProduto(req.body, parcial);
    if (dados.id_categoria !== undefined && !await produtoModel.categoriaExiste(dados.id_categoria)) {
        throw httpError(400, "A categoria informada não existe");
    }

    const produtoAtualizado = await produtoModel.editar(id, dados);
    if (!produtoAtualizado) {
        throw httpError(404, "Produto não encontrado");
    }
    res.json(produtoAtualizado);
};

const substituir = (req, res) => atualizar(req, res, false);

const editarParcial = (req, res) => atualizar(req, res, true);

const excluir = async (req, res) => {
    const id = validarId(req.params.id);
    const produto = await produtoModel.buscarProdutoPorId(id);
    if (!produto) {
        throw httpError(404, "Produto não encontrado");
    }

    const excluidos = await produtoModel.excluir(id);
    if (!excluidos) {
        throw httpError(404, "Produto não encontrado");
    }
    res.json({ mensagem: "Produto removido com sucesso" });
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    substituir,
    editarParcial,
    excluir
};