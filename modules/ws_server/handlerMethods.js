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

new Method('get:game.currency', (data, client, id) => {
  new Message('get:game.currency', game.currency, client, id).send();
})

// Методы, выполнябщие функции на сервере, по запросу клиента
new Method('func:game.create', () => {
  game.create();
  new Message('updateData', 'game.exist; game.status', Client.array).send();
});

new Method('func:game.cancel', () => {
  game.cancel();
  let updatedVars = 'game.exist; game.status; game.playersList; game.playerData';
  new Message('updateData', updatedVars, Client.array).send();
});

new Method('func:game.playerRegister', (data, client) => {
  game.playerRegister(data, client);
  new Message('updateData', 'game.playerData; game.playersList', Client.array).send();
});

new Method('set:game.status', (data) => {
  game.status = data;
  new Message('updateData', 'game.status', Client.array).send();
});

new Method('func:game.begin', () => {
  game.begin();
  new Message('updateData', 'game.status', Client.array).send();
});

new Method('func:game.makeTransfer', (data, client) => {
  let payer = game.getPlayerByIp(client.ip);
  let payee = game.getPlayerByIp(data.payeeIp);
  let count = +data.count;

  if( game.makeTransfer(payer, payee, count) ){
    new Message('updateData', 'game.playerData', [client, Client.find(data.payeeIp)]).send();
    new Message('alert', `Вы перевели ${count} ${game.currency} игроку ${payee.name}`, client).send();
    new Message('alert', `${payer.name} перевёл вам ${count} ${game.currency}`, Client.find(data.payeeIp)).send();
  }else{
    new Message('alert', 'Недостаточно средств на счёте!', client).send();
  }

});

new Method('func:game.makePayment', (data, client) => {
  let payer = game.getPlayerByIp(client.ip);
  let payee = game[data.payeeName];
  if( game.makePayment(payer, payee, data.count) ){
    new Message('updateData', 'game.playerData', client).send();
    new Message('alert', `Вы перевели в ${payee.name} ${data.count} ${game.currency}`, client).send();
    let clients = Client.array.filter(_cl => _cl != client);
    new Message('alert', `${payer.name} перевёл в ${payee.name} ${data.count} ${game.currency}`, clients).send();
  }else{
    new Message('alert', 'Недостаточно средств на счёте!', client).send();
  }
});

module.exports = Method.list;
