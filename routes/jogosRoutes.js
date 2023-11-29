const express = require('express');
const router = express.Router();
const jogosController = require('../controllers/jogosController');

// Rota para listar todos os jogos
router.get('/', jogosController.listarJogos);

// Rota para adicionar um novo jogo
router.post('/', jogosController.adicionarJogo);

// Rota para atualizar informações de um jogo por ID
router.put('/:id_jogos', jogosController.atualizarJogo);

// Rota para deletar um jogo por ID
router.delete('/:id_jogos', jogosController.deletarJogo);

module.exports = router;