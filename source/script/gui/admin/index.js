import {game} from '/script/game/index.js';
import {W, H, vecPos, vecSize, vec, color} from '/script/gui/gui.js';
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

// Титульный блок
function title_page(page){
  page.addBlock('title_page', vecPos(0, 10), vecSize(70, 10), 5, color(57, 132, 235, 0.8))
  .addText('Панель администратора', vec(0, 0), 5.9);
}

// Страница создания и загрузки игры
let mainPage = gui.addPage('main');

title_page(mainPage);
mainPage.addBlock('block_gameFuncs', vecPos(0, 60), vecSize(40, 40), 5, color(235, 162, 57, 0.5));

mainPage.addBlock('button_gameCreate', vecPos(0, 50), vecSize(30, 12), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
.addText('Создать игру', vec(0, 0), 4)
.onClick( () => {
  game.create();
} );

mainPage.addBlock('button_gameLoad', vecPos(0, 70), vecSize(30, 12), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
.addText('Загрузить игру', vec(0, 0), 4)
.onClick( ()=> {
  alert('load');
} );

// Страница ожидания игроков
let waitPlayersPage = gui.addPage('waitPlayers');

title_page(waitPlayersPage);

waitPlayersPage.addBlock('block_playersList', vecPos(0, 65), vecSize(60, 60), 5, color(235, 162, 57, 0.5));

waitPlayersPage.addBlock('button_gameCancel', vecPos(-17, 90), vecSize(20, 5), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
.addText('< Назад', vec(0, 0), 4)
.onClick( ()=> {
  game.cancel();
});

waitPlayersPage.addBlock('button_gameStart', vecPos(15, 90), vecSize(25, 5), 5, color(122, 235, 57, 0.75), color(92, 225, 57, 0.75))
.addText('Начать игру', vec(0, 0), 4)
.onClick( ()=> {
  alert('начать игру')
});

async function main(updatedVars = ''){
  await game.isLoaded;

  game.exist = updatedVars.includes('game.exist') ? await game.getExist() : game.exist || await game.getExist();
  if(!game.exist) {
    gui.currentPage = gui.pages.main;
    return gui.update();
  }

  game.status = updatedVars.includes('game.status') ? await game.getStatus() : game.status || await game.getStatus();
  game.playersList = updatedVars.includes('game.playersList') ? await game.getPlayersList() : game.playersList || await game.getPlayersList();
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
