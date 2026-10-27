const categoriasModel = require("../models/categoriasModel");

const buscarTodos = async (req, res) => {
    const categorias = await categoriasModel.buscarCategoria();
    console.log(categorias);

    res.json(categorias);
};

const buscarPorId = async (req, res) =>{
    const id = req.params.id;
    const categorias = await categoriasModel.buscarCategoriaPorId(id);

    if(!categorias){
        return res.status(404).json({
           mensagem: "Categoria não encontrado" 
        })
       
    }
     res.json(categorias);
};

const criar = async (req, res) =>{
    const {categorias} = req.body
    const criar = await categoriasModel.criarCategoria (categorias);

    res.status(201).json(criar)

};

const editar = async (req, res) =>{
    const id = req.params.id;
    const {categorias} = req.body;
    const categoria = await categoriasModel.buscarCategoriaPorId(id);

        if(!categoria){
            return res.status(404).json({
                mensagem: "categoria não encontrado"
            });
        }

        const categoriaAtualizado = await categoriasModel.editar(id, categorias);
        res.json(categoriaAtualizado);
}

const excluir = async (req, res) =>{
    const id = req.params.id;
    const categoria = await categoriasModel.buscarCategoriaPorId(id);

        if(!categoria){
            return res.status(404).json({
                mensagem: "categoria não encontrado"
            });

        }

        await categoriasModel.excluir(id);

        res.json({
                  mensagem: "categoria Removido com sucefu"
        });
}

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir
   
};