const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

app.get('/', (req, res) => {

  const user = {
    name:'Erick',
    surname: 'Mathias',
    age: 26,
  }

  const palavra = 'Teste'

  const auth = true

  res.render('home', {user: user, palavra, auth});
});

app.listen(3000, () => {
  console.log(`App funcionando!`);
});
