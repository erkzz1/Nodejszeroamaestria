const fs = require('fs');

console.log('Início');

fs.writeFileSync('arquivo.txt', 'oi');
console.log('Arquivo criado com sucesso!')

console.log('Fim');
