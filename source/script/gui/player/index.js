import {game} from '/script/game/index.js';
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

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  gui.canvas.addEventListener('touchstart', touchStart);
  gui.canvas.addEventListener('touchend', touchEnd);
  gui.canvas.addEventListener('touchmove', touchMove);
}else{
  gui.canvas.addEventListener('mousedown', touchStart);
  gui.canvas.addEventListener('mouseup', touchEnd);
  gui.canvas.addEventListener('mousemove', touchMove);
}

let mainPage = gui.addPage('main');
mainPage.Title = gui.pages.main.addBlock(vec(50, 10), vec(50, 10), 10, color(57, 142, 235, 0.7), color(57, 122, 235, 0.7));
mainPage.Title.dragable = true;
mainPage.Title.fontSize = 8;
mainPage.Title.fontColor = color(255, 255, 255, 1);
mainPage.Title.text = 'Имя игрока';

gui.currentPage = gui.pages.main;
gui.update();
