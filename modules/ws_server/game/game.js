const config = require('./config.json');

class Game {

  constructor(){
    this.exist = false;

    return this;
  }

  create(){
    this.id = Date.now();
    this.exist = true;
    this.status = 'wait_Players'
    this.currency = config.currency;

    this.players = [];
  }

  load(){
    // ...
  }

  cancel(){
    this.exist = false;
  }

}

module.exports = Game;
