import {game} from '/script/game/index.js';
import GUI from '/script/gui/gui.js';
import { main } from '/script/gui/player/main.js';
export let gui = new GUI();


function touchStart(event){
  event.preventDefault();
  gui.update(event);
}
function touchEnd(event){ gui.update(event) }
function touchMove(event){ gui.update(event) }


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  gui.canvas.addEventListener('touchstart', touchStart);
  gui.canvas.addEventListener('touchend', touchEnd);
  gui.canvas.addEventListener('touchmove', touchMove);
}else{
  gui.canvas.addEventListener('mousedown', touchStart);
  gui.canvas.addEventListener('mouseup', touchEnd);
  gui.canvas.addEventListener('mousemove', touchMove);
}

main(game, gui);

game.server.socket.addEventListener('updateData', customEvent => {
  let message = customEvent.detail;
  main(game, gui, message.data);
});

game.server.socket.addEventListener('alert', customEvent => {
  let message = customEvent.detail;
  alert(message.data);
});

game.server.socket.addEventListener('confirm', customEvent => {
  let message = customEvent.detail;
  let vote = confirm(message.data);

  game.sendVote(vote);
});
