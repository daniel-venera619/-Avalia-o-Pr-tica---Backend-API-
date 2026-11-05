
const categoriasModel = require("../models/categoriasModel");
const httpError = require("../utils/httpError");
const { validarId, validarNomeCategoria } = require("../utils/validation");

const buscarTodos = async (req, res) => {
    res.json(await categoriasModel.buscarCategoria());
};

const buscarPorId = async (req, res) => {
    const id = validarId(req.params.id);
    const categoria = await categoriasModel.buscarcategoriasPorId(id);

    if (!categoria) {
        throw httpError(404, "Categoria não encontrada");
    }

    res.json(categoria);
};

const criar = async (req, res) => {
    const nome = validarNomeCategoria(req.body);
    res.status(201).json(await categoriasModel.criarCategoria(nome));
};

const editar = async (req, res) => {
    const id = validarId(req.params.id);
    const nome = validarNomeCategoria(req.body);

    const categoria = await categoriasModel.buscarcategoriasPorId(id);

    if (!categoria) {
        throw httpError(404, "Categoria não encontrada");
    }

    await categoriasModel.editar(id, nome);
    res.json({ id, nome });
};

const excluir = async (req, res) => {
    const id = validarId(req.params.id);
    const categoria = await categoriasModel.buscarcategoriasPorId(id);

    if (!categoria) {
        throw httpError(404, "Categoria não encontrada");
    }

    const excluidas = await categoriasModel.excluir(id);
    if (!excluidas) {
        throw httpError(404, "Categoria não encontrada");
    }
    res.json({ mensagem: "Categoria removida com sucesso" });
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir
};
