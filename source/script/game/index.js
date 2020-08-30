import Connection from '/script/game/connection.js';
import Game from '/script/game/game.js';

let server = new Connection();
export let game = new Game(server);

game.isLoaded = new Promise( (resolve) => {
  server.socket.addEventListener('open', async event => {
    resolve(true);
  });
} );
