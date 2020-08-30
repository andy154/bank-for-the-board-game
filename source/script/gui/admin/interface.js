import GUI from '/script/gui/gui.js';
import {W, H, vec, color} from '/script/gui/gui.js';
export let gui = new GUI();

function touchStart(event){
  event.preventDefault();
  gui.update(event);
}

function touchEnd(event){
  gui.update(event);
}

function touchMove(event){
    gui.update(event);
}

gui.canvas.addEventListener('mousedown', touchStart);
gui.canvas.addEventListener('mouseup', touchEnd);
gui.canvas.addEventListener('mousemove', touchMove);

gui.update();
