const fs = require('fs'); // file system

// fs.readfile (ler arquivos do fs)
/* vai ler os arquivos no formato de texto pedido logo depois arrow function com função resumida de syntax sugar */
fs.readFile('arquivo.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
