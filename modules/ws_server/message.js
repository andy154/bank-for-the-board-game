class Message {
  constructor(method, data, clients){
    this.method = method;
    this.data = data;
    if(!Array.isArray(clients)) clients = [clients];
    this.clients = clients;

    return this;
  }

  send(){
    this.clients.forEach( _client => {
      _client.socket.send(JSON.stringify({
        method: this.method,
        data: this.data
      }));
    });
  }
}

module.exports = Message;
