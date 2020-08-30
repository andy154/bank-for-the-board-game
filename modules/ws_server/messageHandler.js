const handlerMethods = require('./handlerMethods.js');

function main(client, message){
  message = JSON.parse(message);
  let id = message.id;
  let method = message.method;
  let data = message.data;

  if(handlerMethods[method]) return handlerMethods[method].func(data, client, id);
  console.log(`[MessageHandler] Внимание! Сообщение с неизвестным методом '${method}'`);
}

module.exports = main;
