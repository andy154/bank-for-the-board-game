const config = require('./config.json');
const Player = require('./player.js');

class Game {

  constructor(){
    this.exist = false;

    return this;
  }

  create(){
    this.id = Date.now();
    this.exist = true;
    this.status = 'wait_players'
    this.currency = config.currency;

    return 'game.exist; game.status';
  }

  load(){
    // ...
  }

  cancel(){
    this.exist = false;
    this.status = null;
    Player.array = [];
    return 'game.exist; game.status; game.playersList; game.playerData';
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
