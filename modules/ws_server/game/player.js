class Player {
  static array = [];
  constructor(name, client){

    this.name = name;
    this.client = client;

    this.money = 2000;

    Player.array.push(this);
    return this;
  }
}

module.exports = Player;
