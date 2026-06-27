const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/", userController.ListarUsuarios);
router.get("/:id", userController.BuscarUsuarioPorId);
router.post("/", userController.adicionarUsuario);
router.put("/:id", userController.atualizarUsuario);
router.delete("/:id", userController.deletarUsuario);

module.exports = router;
