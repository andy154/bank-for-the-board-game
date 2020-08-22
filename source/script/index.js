import {game, server} from '/script/game/index.js';
let socket = server.socket;

let button = document.createElement('button');
document.body.append(button);
button.innerHTML = 'create';
button.onclick = () => {
  game.create(server);
}

let button2 = document.createElement('button');
document.body.append(button2);
button2.innerHTML = 'test';
button2.onclick = () => {
  game.test(server);
}

let button3 = document.createElement('button');
document.body.append(button3);
button3.innerHTML = 'simple';
button3.onclick = () => {
//  server.socket.send(JSON.stringify({method: 'existGame', data: ''}));
}
