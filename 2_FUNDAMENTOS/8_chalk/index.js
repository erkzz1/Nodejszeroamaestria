//Melhorando a visualização no console com chalk(giz) facilitando a estilização da saída no terminal com cores e estilos.

const chalk = require('chalk');

const nota = 9;

if (nota >= 7) {
  console.log(chalk.green.bold('Parabéns! você está aprovado!'));
} else {
  console.log(chalk.bgRed.black.bold('Não foi dessa vez :c, Recuperação!'));
}
