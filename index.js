const express = require('express');
const app = express();
const jogosRoutes = require('./routes/jogosRoutes');


app.use('/jogos', jogosRoutes);

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
