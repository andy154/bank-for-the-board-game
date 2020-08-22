class Message {
  constructor(method, data, clients, id){
    this.method = method;
    this.id = id || Date.now();
    this.data = data;
    if(!Array.isArray(clients)) clients = [clients];
    this.clients = clients;

    return this;
  }

  send(){
    this.clients.forEach( _client => {
      _client.socket.send(JSON.stringify({
        id: this.id,
        method: this.method,
        data: this.data
      }));
    });
  }
}

module.exports = Message;
