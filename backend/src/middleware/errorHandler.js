function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ mensagem: "Já existe um registro com esses dados" });
    }

    if (error.code === "ER_ROW_IS_REFERENCED_2" || error.code === "ER_ROW_IS_REFERENCED") {
        return res.status(409).json({ mensagem: "Não é possível excluir uma categoria que possui produtos" });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({ mensagem: "A categoria informada não existe" });
    }

    if (error.type === "entity.parse.failed") {
        return res.status(400).json({ mensagem: "O corpo da requisição contém JSON inválido" });
    }

    if (Number.isInteger(error.status) && error.status >= 400 && error.status < 500) {
        return res.status(error.status).json({ mensagem: error.message });
    }

    console.error("Erro interno ao processar a requisição:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
}

module.exports = errorHandler;
