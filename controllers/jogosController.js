const db = require('../model/db.js');

const listarJogos = (req,res) => {
    db.query('SELECT * FROM jogos', (err, result) =>{
        if(err) throw err;
        res.json(result);
    });
}

const adicionarJogo = (req, res) => {
  const {titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa} = req.body;

  db.query(
    'INSERT INTO jogos (titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa],
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar jogo' });
        return;
      }
      res.json(results);
    }
  );
};


const atualizarJogo = (req, res) => {
  const { titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa } = req.body;
  const { id_jogos } = req.params;
  
  // Convertendo a data para o formato esperado pelo MySQL
  const dataFormatada = new Date(data_lancamento).toISOString().slice(0, 19).replace('T', ' ');

  db.query(
    'UPDATE jogos SET titulo = ?, descricao = ?, data_lancamento = ?, preco = ?, idioma = ?, armazenamento = ?, classificacao_indicativa = ? WHERE id_jogos = ?',
    [titulo, descricao, dataFormatada, preco, idioma, armazenamento, classificacao_indicativa, id_jogos],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
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



 