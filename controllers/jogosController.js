const express = require('express');
const db = require('../model/db');
const app = express();


app.use(express.json());


const listarJogos = (req,res) => {
    db.query('SELECT * FROM jogos', (err, result) =>{
        if(err) throw err;
        res.json(result);
    });
}

const adicionarJogo = (req, res) => {
    const { titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa } = req.body;
    db.query('INSERT INTO jogos (titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa) VALUES (?, ?, ?, ?, ?, ?, 7)', [titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
}

const atualizarJogo = (req, res) => {
    const { titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa } = req.body;
    const { id_jogos } = req.params;
    db.query('UPDATE jogos SET titulo = "Hello Kitty Island Adventure" WHERE id_jogos = ?', [id_jogos, titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }

const deletarJogo = (req, res) => {
    const { id_jogos } = req.params;

    db.query('DELETE FROM jogos WHERE id_jogos = ?', [id_jogos], (err, result) => {
      if (err) throw err;
      res.json(result);
      
    });
  }



module.exports = {

    listarJogos, adicionarJogo, atualizarJogo, deletarJogo
};



 