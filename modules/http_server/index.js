const express = require('express');
const config = ( require('../../config/servers.json') );
const routing = require('./routing.js');

function main(){
  let server = {};

  server.app = express();

  server.app.all("*", (request, response) => {
    server.lastRequest = request;
    server.lastResponse = response;

    routing(request, response);
  });

  server.app.listen(config.http_port);

  console.log(`[Modules] HTTP-Server is running on port: ${config.http_port}`);
  return server;
}

module.exports.start = main;
