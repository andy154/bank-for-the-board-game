class Player {
  static array = [];

  static find(ip) { return Player.array.find( _player => _player.client.ip == ip) }
  static getList(){
    return Player.array.map( _player => {
      return {
        name: _player.name,
        ip: _player.client.ip
      };
    })
  }

  constructor(name, client){
    if(Player.find(client.ip)) return false;

    this.name = name;
    this.client = client;

    this.money = 2000;

    Player.array.push(this);
    return this;
  }

  getData(){
    return {
      name: this.name,
      ip: this.ip,
      money: this.money
    }
  }
}

module.exports = Player;
