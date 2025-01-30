const x = 10;
// checar se x é um número (não quero que seja passado string como número aqui)

if (!Number.isInteger(x)) {
  throw new Error('O valor de x não é um número inteiro!');
}

console.log('Continuando o código....');

//throw vai encerrar o programa se não passar o que foi pedido
