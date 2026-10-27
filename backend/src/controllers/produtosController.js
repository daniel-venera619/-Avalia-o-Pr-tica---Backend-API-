const produtoModel = require("../models/produtosModel");

const buscarTodos = async (req, res) => {
    const produtos = await produtoModel.buscarProdutos();
    console.log(produtos);

    res.json(produtos);
};

const buscarPorId = async (req, res) =>{
    const id = req.params.id;
    const produto = await produtoModel.buscarProdutoPorId(id);

    if(!produto){
        return res.status(404).json({
           mensagem: "Produto não encontrado" 
        })
       
    }
     res.json(produto);
};

const criar = async (req, res) =>{
    const {descricao, preco, qtd_estoque, qtd_minima} = req.body
    const criar = await produtoModel.criarProduto (descricao, preco, qtd_estoque, qtd_minima);

    res.status(201).json(criar)

};

const editarProduto = async (req, res) =>{
    const id = req.params.id;
    const {descricao, preco, qtd_estoque, qtd_minima} = req.body;
    const produto = await produtoModel.buscarProdutoPorId(id);

        if(!produto){
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        const produtoAtualizado = await produtoModel.editar(id, descricao, preco, qtd_estoque, qtd_minima);
        res.json(produtoAtualizado);
}

const excluir = async (req, res) =>{
    const id = req.params.id;
    const produto = await produtoModel.buscarProdutoPorId(id);

        if(!produto){
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });

        }

        await produtoModel.excluir(id);

        res.json({
                  mensagem: "Produto Removido com sucefu"
        });
}

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editarProduto,
    excluir
   
};