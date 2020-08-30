import {game} from '/script/game/index.js';
import {W, H, vec, color} from '/script/gui/gui.js';
import GUI from '/script/gui/gui.js';
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

// Страница создания и загрузки игры
let mainPage = gui.addPage('main');

mainPage.addBlock('tempitlePage', vec(50, 10), vec(70, 15), 5, color(57, 132, 235, 0.8))
.setFont(8, color(255, 255, 255, 1))
.setText('Панель администратора');

mainPage.addBlock('blockGame', vec(50, 60), vec(40, 40), 5, color(235, 162, 57, 0.5));

mainPage.addBlock('createGameButton', vec(50, 50), vec(30, 12), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
.setText('Создать игру')
.setFontSize(13)
.onClick( ()=> {
  alert('create');
} );

mainPage.addBlock('loadGameButton', vec(50, 70), vec(30, 12), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
.setText('Загрузить игру')
.setFontSize(13)
.onClick( ()=> {
  alert('load');
} );

gui.currentPage = gui.pages.main;
gui.update();
