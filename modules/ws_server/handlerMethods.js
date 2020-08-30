const Message = require('./message.js');
const Client = require('./client.js');
const game = require('./game/index.js');

class Method {
  static list = {};

  constructor(method, func){
    this.method = method;
    this.func = func;

    Method.list[method] = this;
    return this;
  }
}

// Методы, отправляющие клиенты данные по запросу
new Method('get:game.exist', (data, client, id) => {
  new Message('get:game.exist', game.exist ? true : false, client, id).send();
});

new Method('get:game.status', (data, client, id) => {
  new Message('get:game.status', game.status, client, id).send();
})

new Method('get:game.playerData', (data, client, id) => {
  new Message('get:game.playerData', game.getPlayerData(client) || false, client, id).send();
});

new Method('get:game.playersList', (data, client, id) => {
  new Message('get:game.playersList', game.getPlayersList() || false, client, id).send();
})

// Методы, выполнябщие функции на сервере, по запросу клиента
new Method('func:game.create', () => {
  let updatedVars = game.create();
  new Message('updateData', updatedVars, Client.array).send();
});

new Method('func:game.cancel', () => {
  let updatedVars = game.cancel();
  new Message('updateData', updatedVars, Client.array).send();
})

new Method('func:game.playerRegister', (data, client) => {
  let updatedVars = game.playerRegister(data, client);
  new Message('updateData', updatedVars, [client, Client.getAdmin()]).send();
});

new Method('set:game.status', (data) => {
  game.status = data;
  new Message('updateData', 'game.status', Client.array).send();
})


module.exports = Method.list;
