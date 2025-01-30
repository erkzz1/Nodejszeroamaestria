const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
  console.log('Durante');
});

console.log('Antes');

eventEmitter.emit('start');

console.log('Depois');


// ativar um código em alguns pontos da aplicação exemplo acima 'start' = durante