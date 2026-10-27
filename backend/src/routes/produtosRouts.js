const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtosController");

router.get("/", produtosController.buscarTodos);
router.get("/categoria/:categoria", produtosController.buscarPorCategoria);
router.get("/:id", produtosController.buscarPorId);
router.post("/", produtosController.criar);
router.put("/:id", produtosController.editarProduto);
router.delete("/:id", produtosController.excluir);

module.exports = router;