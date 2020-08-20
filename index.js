const http_server = require('./modules/http_server/index.js');
const ws_server = require('./modules/ws_server/index.js');

http_server.start();
ws_server.start();
