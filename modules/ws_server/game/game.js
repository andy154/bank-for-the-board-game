const config = require('./config.json');

class Game {

  constructor(){
    this.exist = false;

    return this;
  }

  create(){
    let updatedVars = '';
    this.id = Date.now();
    this.exist = true;
    updatedVars += 'game.exist';
    this.status = 'wait_players'
    updatedVars += 'game.status';
    this.currency = config.currency;

    this.players = [];

    return updatedVars;
  }

  load(){
    // ...
  }

  cancel(){
    this.exist = false;
    return 'game.exist';
  }

}

module.exports = Game;
