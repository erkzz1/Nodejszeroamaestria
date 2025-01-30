const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Qual a sua linguagem preferida? ', (language) => {
if (language === 'Html'){
    console.log('Isso nem é uma linguagem')
} else {
  console.log(`A linguagem preferida do usuário é: ${language}`);
}
  readline.close();
});
