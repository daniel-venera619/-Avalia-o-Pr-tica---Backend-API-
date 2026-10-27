const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");

router.get("/", categoriasController.buscarTodos);
router.get("/:id", categoriasController.buscarPorId);
router.post("/", categoriasController.criar);
router.put("/:id", categoriasController.editar);
router.delete("/:id", categoriasController.excluir);

module.exports = router;