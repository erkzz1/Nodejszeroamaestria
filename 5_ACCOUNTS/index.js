// modulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

// modulos internos
const fs = require('fs');

// variável global para armazenas o nome da conta atual
//let currentAccount = '';

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: ' O que você deseja fazer?',
        choices: [
          'Criar Conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action'];

      if (action === 'Criar Conta') {
        createAccount();
      } else if (action === 'Depositar') {
        deposit();
      } else if (action === 'Consultar Saldo') {
        getAccountBalance();
      } else if (action === 'Sacar') {
        withdraw();
      } else if (action === 'Sair') {
        //console.log(chalk.bgBlue.black(`Obrigado ${currentAccount || 'por usar o Accounts'}!`))
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'));
        process.exit(); // encerra a execução do sistema
      }
    })
    .catch((err) => console.log(err));
}

// criação de conta

function createAccount() {
  console.log(chalk.bgGreen.black('Obrigado por escolher o nosso banco'));
  console.log(chalk.green('Defina as opções da sua conta a seguir'));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta:',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      console.info(accountName);

      if (!fs.existsSync('accounts')) {
        /* se o diretório existe*/
        fs.mkdirSync('accounts');
        /* se não existir ele vai ser criado */
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black(
            'Esta conta já existe, por favor escolha outro nome!'
          )
        );
        buildAccount();
        return; // para não deixar voltar a função toda novamente
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        function (err) {
          console.log(err);
        }
      );

      console.log(
        chalk.green(
          `Parabéns ${accountName}, a sua conta foi criada com sucesso!`
        )
      );
      operation();
    })
    .catch((err) => console.log(err));
}

// adiciona um montante a conta do usuário

function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      // verificar se a conta existe
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount'];

          //adiciona o montante
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black('Esta conta não existe, escolha outro nome!')
    );
    return false;
  }

  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'));
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(
      `Foi depositado o valor de R$${amount} na sua conta ${accountName}!`
    )
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r',
  });
  return JSON.parse(accountJSON);
}

// Mostrar Saldo da conta

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      //verificar se a conta existe
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(
          `Olá ${accountName} o saldo da sua conta é de R$${accountData.balance} `
        )
      );
      operation();
    })
    .catch((err) => console.log(err));
}

// Sacar o valor da conta do usuário
function withdraw() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja sacar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount'];

          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente! '));
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('Valor indisponível! '));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`)
  );
  operation();
}
