const config = require('./config.json');
const Player = require('./player.js');

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

  getPlayerData(client){
    let player = Player.find(client.ip);
    return player ? player.getData() : false;
  }

  playerRegister(name, client){
    new Player(name, client);
    return 'game.playerData; game.playersList';
  }

  getPlayersList(){
    return Player.getList();
  }
}

module.exports = Game;
