const handlerMethods = require('./handlerMethods.js');

function main(client, message){
  message = JSON.parse(message);
  let method = message.method;
  let data = message.data;

  if(handlerMethods[method]) handlerMethods[method].func(data, client);
}

module.exports = main;
