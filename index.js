const express = require('express');
const app = express();
const router = require('./routes/jogosRoutes.js');

app.use(express.json());
app.use('/', router); // Use o roteador no aplicativo Express

app.listen(4000, () => {
  console.log('Servidor iniciado na porta 4000');
});
