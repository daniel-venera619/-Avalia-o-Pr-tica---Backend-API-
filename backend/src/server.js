const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.API_PORT;

const produtosRoutes = require("./routes/produtosRouts");
const categoriasRoutes = require("./routes/categoriasRoutes")

app.use(express.json());
app.use("/produtos", produtosRoutes);
app.use("/categorias",categoriasRoutes);

app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});