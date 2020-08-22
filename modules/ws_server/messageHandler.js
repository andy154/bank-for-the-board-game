const handlerMethods = require('./handlerMethods.js');

function main(client, message){
  message = JSON.parse(message);
  let id = message.id;
  let method = message.method;
  let data = message.data;

  if(handlerMethods[method]) handlerMethods[method].func(data, client, id);
}

module.exports = main;
