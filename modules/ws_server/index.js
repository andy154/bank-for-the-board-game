const config = require('./config.json');
const WebSocket = require('ws');


function main(){
  let server = new WebSocket.Server({port: config.port});
}

module.exports.start = main;
