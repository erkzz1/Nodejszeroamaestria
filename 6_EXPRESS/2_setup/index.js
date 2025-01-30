const express = require('express');
const app = express(); // variável app para executar o express
const port = 3000; // variável de ambiente

app.get('/', (req, res) => {
  res.send('Olá Mudo!!');
});

app.listen(port, () => {

    console.log(`App rodando na porta ${port}`)

})

// Fluxo básico aplicação express

