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

new Method('existGame', (data, client) => {
  new Message('existGame', game.exist ? true : false, client).send();
});

new Method('createGame', () => {
  game.create();
  new Message('existGame', true, Client.array).send();
});

new Method('cancelGame', () => {
  game.cancel();
  new Message('existGame', false, Client.array).send();
})

module.exports = Method.list;
