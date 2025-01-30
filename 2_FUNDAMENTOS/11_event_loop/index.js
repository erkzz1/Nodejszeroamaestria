function a() {
  console.log('Executando a()');
}

function b() {
  console.log('Executando b()');
}

function c() {
  console.log('Executando c()');
  a();
  b();
}

c();

// event loop garante que a execução do código seja sequêncial

// garante a leitura do código como ela estão ordenadas
