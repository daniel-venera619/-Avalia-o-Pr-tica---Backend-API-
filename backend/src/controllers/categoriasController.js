
const categoriasModel = require("../models/categoriasModel");

const buscarTodos = async (req, res) => {
    const categorias = await categoriasModel.buscarCategoria();
    console.log(categorias);

    res.json(categorias);
};

const buscarPorId = async (req, res) => {
    const id = req.params.id;
    const categoria = await categoriasModel.buscarcategoriasPorId(id);

    if (!categoria) {
        return res.status(404).json({
            mensagem: "Categoria não encontrada"
        });
    }

    res.json(categoria);
};

const criar = async (req, res) => {
    const { nome } = req.body;
    const criar = await categoriasModel.criarCategoria(nome);

    res.status(201).json(criar);
};

const editar = async (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;

    const categoria = await categoriasModel.buscarcategoriasPorId(id);

    if (!categoria) {
        return res.status(404).json({
            mensagem: "Categoria não encontrada"
        });
    }

    const categoriaAtualizada = await categoriasModel.editar(id, nome);

    res.json(categoriaAtualizada);
};

const excluir = async (req, res) => {
    const id = req.params.id;
    const categoria = await categoriasModel.buscarcategoriasPorId(id);

    if (!categoria) {
        return res.status(404).json({
            mensagem: "Categoria não encontrada"
        });
    }

    await categoriasModel.excluir(id);

    res.json({
        mensagem: "Categoria removida com sucesso"
    });
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir
};
