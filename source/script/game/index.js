import Connection from '/script/game/connection.js';
import Game from '/script/game/game.js';
export let game = new Game();
export let server = new Connection();

server.socket.addEventListener('open', async event => {
  console.log( await game.getExist(server) );
});
