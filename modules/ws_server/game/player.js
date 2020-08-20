class Player {
  static array = [];

  static find(client) { return Player.array.find( _player => _player.client == client); }

  constructor(name, client){
    if(Player.find(client)) return;

    this.name = name;
    this.client = client;

    this.money = 2000;

    Player.array.push(this);
    return this;
  }
}

module.exports = Player;
