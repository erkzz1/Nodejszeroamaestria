const express = require('express');
const exphbs = require('express-handlebars');

// Chamando mysql2 no Docker
const mysql = require('mysql2/promise')

const pool = mysql.createPool ({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'example',
  database: 'books',
});

pool.getConnection()
  .then(connection => {
    console.log('Conexão com o banco de dados estabelecida!');
    connection.release();
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/books/insertbook', async (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ['title', 'pageqty', title, pageqty];

  try {
    await pool.query(sql, data);
    res.redirect('/books');
  } catch (err) {
    console.log(err);
    res.status(500).send('Falha ao inserir um livro!');
  }
});

app.get('/books', async (req, res) => {
  const sql = 'SELECT * FROM books';

  try {
    const [books] = await pool.query(sql);
    res.render('books', { books });
  } catch (err) {
    console.log(err);
    res.status(500).send('Falha ao buscar livros!');
  }
});

app.get('/books/:id', async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  try {
    const [rows] = await pool.query(sql, data);
    const book = rows[0];
    res.render('book', { book });
  } catch (err) {
    console.log(err);
    res.status(500).send('Falha ao buscar o livro!');
  }
});

app.get('/books/edit/:id', async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  try {
    const [rows] = await pool.query(sql, data);
    const book = rows[0];
    res.render('editbook', { book });
  } catch (err) {
    console.log(err);
    res.status(500).send('Falha ao buscar o livro para edição!');
  }
});

app.post('/books/updatebook', async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
  const data = ['title', title, 'pageqty', pageqty, 'id', id];

  try {
    await pool.query(sql, data);
    res.redirect('/books');
  } catch (err) {
    console.log(err);
    res.status(500).send('Falha ao atualizar o livro!');
  }
});

app.post('/books/remove/:id', async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE ?? = ?`;
  const data = ['id', id];

  try {
    await pool.query(sql, data);
    res.redirect('/books');
  } catch (err) {
    console.log(err);
    res.status(500).send('Falha ao remover o livro!');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
