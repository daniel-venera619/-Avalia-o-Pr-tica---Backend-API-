const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = Number(process.env.PORT) || 3042;

const produtosRoutes = require("./routes/produtosRouts");
const categoriasRoutes = require("./routes/categoriasRoutes");
app.use(express.json());
app.use("/produtos", produtosRoutes);
app.use("/categorias", categoriasRoutes);
app.use((req, res) => {
    res.status(404).json({ mensagem: "Rota não encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});