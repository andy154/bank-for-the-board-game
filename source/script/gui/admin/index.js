import { game } from '/script/game/index.js';
import GUI from '/script/gui/gui.js';
import { initPages } from '/script/gui/admin/pages.js';
import { main } from '/script/gui/admin/main.js';
export let gui = new GUI();

function touchStart(event){
  event.preventDefault();
  gui.update(event);
}
function touchEnd(event){ gui.update(event) }
function touchMove(event){ gui.update(event) }

gui.canvas.addEventListener('mousedown', touchStart);
gui.canvas.addEventListener('mouseup', touchEnd);
gui.canvas.addEventListener('mousemove', touchMove);

initPages(game, gui);
main(game, gui);

game.server.socket.addEventListener('updateData', customEvent => {
  let message = customEvent.detail;
  main(game, gui, message.data);
})
