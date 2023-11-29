const db = require('../model/db');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const arquivoCSV = 'E:/Code/data.csv';

// Estabelecer conexão com o banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }

  console.log('Conexão ao banco de dados MySQL estabelecida.');

  const results = [];

  fs.createReadStream(arquivoCSV)
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => {
      let insertStatement = `INSERT INTO jogos(titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

      let items = [
        data["titulo"],
        data["descricao"],
        data["data_lancamento"],
        data["preco"],
        data["idioma"],
        data["armazenamento"],
        data["classificacao_indicativa"]
      ];

      db.query(insertStatement, items, (err, results, fields) => {
        if (err) {
          console.error('Erro ao inserir os dados:', err);
        }
      });
    })
    .on('end', () => {
      console.log('Todos os dados foram inseridos com sucesso.');

      const query = 'SELECT * FROM jogos';

      db.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          db.end(); // Encerrar a conexão com o banco de dados
          return;
        }

        const header = Object.keys(results[0]);

        const csvWriter = createCsvWriter({
          path: 'output.csv',
          header
        });

        csvWriter.writeRecords(results)
          .then(() => {
            console.log('Dados exportados para output.csv com sucesso!');
            db.end(); // Encerrar a conexão com o banco de dados
          })
          .catch(err => {
            console.error('Erro ao escrever no arquivo CSV:', err);
            db.end(); // Encerrar a conexão com o banco de dados
          });
      });
    });
});
