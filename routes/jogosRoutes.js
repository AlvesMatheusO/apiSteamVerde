const express = require('express');
const router = express.Router();
const { listarJogos, adicionarJogo, atualizarJogo, deletarJogo } = require('../controllers/jogosController.js');

// Rota para listar todos os jogos
router.get('/jogos', listarJogos);

// Rota para adicionar um novo jogo
router.post('/jogos', adicionarJogo);

// Rota para atualizar informações de um jogo por ID
router.put('/jogos/:id_jogos', atualizarJogo);

// Rota para deletar um jogo por ID
router.delete('/jogos/:id_jogos', deletarJogo);

module.exports = router;
