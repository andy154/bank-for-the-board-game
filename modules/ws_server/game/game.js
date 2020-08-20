class Game {

  constructor(){
    this.id = Date.now();
    this.status = 'waitPlayers';

    this.players = [];

    console.log('game created');
    return this;
  }

}

module.exports = Game;
