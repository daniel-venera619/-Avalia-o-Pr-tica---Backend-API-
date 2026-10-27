
const produtoModel = require("../models/produtosModel");


const buscarTodos = async (req, res) => {
    const produtos = await produtoModel.buscarProdutos();

    console.log(produtos);
    res.json(produtos);
};
const buscarPorId = async (req, res) => {
    const id = req.params.id;
    const produto = await produtoModel.buscarProdutoPorId(id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.json(produto);
};

const criar = async (req, res) => {
    const {
        nome,
        descricao,
        preco,
        qtd_estoque,
        qtd_minima,
        id_categoria
    } = req.body;

    const produto = await produtoModel.criarProduto(
        nome,
        descricao,
        preco,
        qtd_estoque,
        qtd_minima,
        id_categoria
    );

    res.status(201).json(produto);
};

const editarProduto = async (req, res) => {
    const id = req.params.id;
    const {
        nome,
        descricao,
        preco,
        qtd_estoque,
        qtd_minima,
        id_categoria
    } = req.body;

    const produto = await produtoModel.buscarProdutoPorId(id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    const produtoAtualizado = await produtoModel.editar(
        id,
        nome,
        descricao,
        preco,
        qtd_estoque,
        qtd_minima,
        id_categoria
    );

    res.json(produtoAtualizado);
};

const excluir = async (req, res) => {
    const id = req.params.id;
    const produto = await produtoModel.buscarProdutoPorId(id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    await produtoModel.excluir(id);

    res.json({
        mensagem: "Produto removido com sucesso"
    });
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editarProduto,
    excluir
};