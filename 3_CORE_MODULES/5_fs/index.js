const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
  fs.readFile('mensagem.html', function (err, data) {
    res.writeHead(200, { 'Content-type': 'text/html' }); // simplifica o status code e o setheader da pasta 4_http_com_url
    res.write(data)
    return res.end()
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
