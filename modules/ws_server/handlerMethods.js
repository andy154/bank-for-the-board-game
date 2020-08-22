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

new Method('existGame', (data, client, id) => {
  new Message('existGame', game.exist ? true : false, client, id).send();
});

new Method('createGame', () => {
  game.create();
  //new Message('updateData', {}, Client.array).send();
});

new Method('cancelGame', () => {
  game.cancel();
  //new Message('updateData', {}, Client.array).send();
})

new Method('test', (data, client, id) => {
  new Message('test', data, client, id).send();
})

module.exports = Method.list;
