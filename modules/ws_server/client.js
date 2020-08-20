class Client {
  static array = [];

  static find(ip) { return Client.array.find( _client => _client.ip == ip); }

  constructor(socket){
    let ip = socket._socket.remoteAddress;

    let client = Client.find(ip);
    if( client ) {
      client.socket = socket;
      return client;
    };

    this.ip = ip;
    this.socket = socket;

    this.isAdmin = (ip == '::1');
    this.player = null;

    Client.array.push(this);
    return this;
  }

}

module.exports = Client;
