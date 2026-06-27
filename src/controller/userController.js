
const pool = require("../config/pool.js");

// GET ALL
const ListarUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, nome, telefone, endereco FROM users WHERE ativo = true"
        );

        res.status(200).json({
            sucesso: true,
            total: rows.length,
            dados: rows
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar usuários",
            erro: error.message
        });
    }
};

// GET POR ID
const BuscarUsuarioPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID inválido"
            });
        }

        // Ajustado: garante que o usuário buscado também esteja ativo
        const [rows] = await pool.query(
            "SELECT id, nome, telefone, endereco FROM users WHERE id = ? AND ativo = true",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Usuário não encontrado"
            });
        }

        res.json({
            sucesso: true,
            dados: rows[0]
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: error.message
        });
    }
};

// POST
const adicionarUsuario = async (req, res) => {
    try {
        const { nome, telefone, endereco } = req.body;

        if (!nome || !telefone || !endereco) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Preencha todos os campos."
            });
        }

        await pool.query(
            "INSERT INTO users(nome, telefone, endereco) VALUES (?, ?, ?)",
            [nome, telefone, endereco]
        );

        res.status(201).json({
            sucesso: true,
            mensagem: "Usuário cadastrado com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: error.message
        });
    }
};

// PUT
const atualizarUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, telefone, endereco } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID inválido"
            });
        }

        // Validação preventiva: evita atualizar deixando campos em branco
        if (!nome || !telefone || !endereco) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Preencha todos os campos para atualizar."
            });
        }

        const [rows] = await pool.query(
            "SELECT id FROM users WHERE id = ? AND ativo = true",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Usuário não encontrado."
            });
        }

        await pool.query(
            "UPDATE users SET nome = ?, telefone = ?, endereco = ? WHERE id = ?",
            [nome, telefone, endereco, id]
        );

        res.json({
            sucesso: true,
            mensagem: "Usuário atualizado."
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: error.message
        });
    }
};

// DELETE LÓGICO
const deletarUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID inválido"
            });
        }

        const [rows] = await pool.query(
            "SELECT id FROM users WHERE id = ? AND ativo = true",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Usuário não encontrado ou já removido."
            });
        }

        await pool.query(
            "UPDATE users SET ativo = false WHERE id = ?",
            [id]
        );

        res.json({
            sucesso: true,
            mensagem: "Usuário removido."
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: error.message
        });
    }
};

module.exports = {
    ListarUsuarios,
    BuscarUsuarioPorId,
    adicionarUsuario,
    atualizarUsuario,
    deletarUsuario
};
