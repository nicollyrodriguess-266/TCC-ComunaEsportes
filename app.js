const express = require("express");
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, ".env")
});

const userRoutes = require("./src/routes/routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Página inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Usuários",
        versao: "1.0.0",
        endpoints: {
            listar: "GET /users",
            buscar: "GET /users/:id",
            adicionar: "POST /users",
            atualizar: "PUT /users/:id",
            deletar: "DELETE /users/:id"
        }
    });
});

// Rotas
app.use("/users", userRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


// falta terminar esse, fazer env, dotenv, pool, e mais algumas coisas à melhorar