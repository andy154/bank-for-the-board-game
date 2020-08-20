const WebSocket = require('ws');
const config = require('./config.json');
const Client = require('./client.js');
const messageHandler = require('./messageHandler.js');

function main(){
  let server = new WebSocket.Server({
    port: config.port
  });

  server.on('connection', (socket, request) => {
    let client = new Client(socket);

    socket.on('message', message => {
      messageHandler(client, message);
    });

  });

  console.log(`[Module] WebSocket-Server is running on ${config.port} port`);
}

module.exports.start = main;
