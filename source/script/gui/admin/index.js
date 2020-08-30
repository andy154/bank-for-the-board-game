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

mainPage.addBlock('title_page', vec(50, 10), vec(70, 15), 5, color(57, 132, 235, 0.8))
.setFont(8, color(255, 255, 255, 1))
.setText('Панель администратора');

mainPage.addBlock('block_gameFuncs', vec(50, 60), vec(40, 40), 5, color(235, 162, 57, 0.5));

mainPage.addBlock('button_gameCreate', vec(50, 50), vec(30, 12), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
.setText('Создать игру')
.setFontSize(13)
.onClick( () => {
  game.create();
} );

mainPage.addBlock('button_gameLoad', vec(50, 70), vec(30, 12), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
.setText('Загрузить игру')
.setFontSize(13)
.onClick( ()=> {
  alert('load');
} );

// Страница ожидания игроков
let waitPlayersPage = gui.addPage('waitPlayers');

waitPlayersPage.addBlock('title_page', vec(50, 10), vec(70, 15), 5, color(57, 132, 235, 0.8))
.setFont(8, color(255, 255, 255, 1))
.setText('Панель администратора');

waitPlayersPage.addBlock('button_gameCancel', vec(50, 80), vec(15, 5), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
.setText('Назад')
.setFontSize(10)
.onClick( ()=> {
  game.cancel();
});

async function main(updateData = ''){
  await game.isLoaded;

  game.exist = updateData.includes('game.exist') ? await game.getExist() : game.exist || await game.getExist();
  if(!game.exist) {
    gui.currentPage = gui.pages.main;
    return gui.update();
  }

  game.status = updateData.includes('game.status') ? await game.getStatus() : game.status || await game.getStatus();
  if(game.status == 'wait_players') {
    gui.currentPage = gui.pages.waitPlayers;
    return gui.update();
  }

}

main();

game.server.socket.addEventListener('updateData', customEvent => {
  let message = customEvent.detail;
  main(message.data);
})
