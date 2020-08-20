import {socket} from '/script/websocket/index.js';

let button = document.createElement('button');
document.body.append(button);
button.innerHTML = 'create';
button.onclick = () => {
  socket.send(JSON.stringify({
    method: 'createGame',
    data: ''
  }));
}

let button2 = document.createElement('button');
document.body.append(button2);
button2.innerHTML = 'cancel';
button2.onclick = () => {
  socket.send(JSON.stringify({
    method: 'cancelGame',
    data: ''
  }));
}
