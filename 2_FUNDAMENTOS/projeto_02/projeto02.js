const inquirer = require('inquirer');

const chalk = require('chalk');

inquirer
  .prompt([
    {
      name: 'Nome',
      message: 'Qual é o seu Nome?',
    },
    {
      name: 'Idade',
      message: 'Qual é a sua idade?',
    },
  ])
  .then((resposta) => {
    if (!resposta.Nome || !resposta.Idade) {
      throw new Error('O nome e a idade são obrigatórios!');
    }
    console.log(resposta);

    console.log(chalk.bgYellow.black(`Seu Nome é: ${resposta.Nome}`));

    console.log(chalk.bgYellow.black(`Sua idade é: ${resposta.Idade} ano(s)`));
  })
  
