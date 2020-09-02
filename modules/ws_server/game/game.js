const config = require('./config.json');
const Player = require('./player.js');

class Game {

  constructor(){
    this.exist = false;
    this.status = null;

    this.bank = {
      name: 'Банк',
      money: 0
    };
    this.fund = {
      name: 'Благотворительный фонд',
      money: 50,
      minMoney: 50
    };
    this.jackpot = {
      name: 'Джекпот',
      money: 0
    };

    return this;
  }

  getPlayerByIp(ip){
    return Player.find(ip);
  }

  create(){
    this.id = Date.now();
    this.exist = true;
    this.status = 'wait_players'
    this.currency = config.currency;
  }

  load(){
    // ...
  }

  cancel(){
    this.exist = false;
    this.status = null;
    Player.array = [];
  }

  begin(){
    this.status = 'playing';
  }

  getPlayerData(client){
    let player = Player.find(client.ip);
    return player ? player.getData() : false;
  }

  playerRegister(name, client){
    new Player(name, client);
  }

  getPlayersList(){
    return Player.getList();
  }

  makeTransfer(payer, payee, count){
    if(payer.money >= count) {
      payer.money -= count;
      payee.money += count;
      return true;
    }

    return false;
  }

  makePayment(payer, payee, count){
    if(payer.money >= count){
      payer.money -= count;
      payee.money += count;
      return true;
    }
    return false;
  }
}

module.exports = Game;
