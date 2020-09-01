import {W, H, vecPos, vecSize, vec, color} from '/script/gui/gui.js';

// Титульный блок
function addPageTitle(page){
  page.addBlock('title_page', vecPos(0, 10), vecSize(70, 10), 5, color(57, 132, 235, 0.8))
  .addText('Панель администратора', vec(0, 0), 5.9);
}

function addMainPage(game, gui){
  let page = gui.addPage('main');

  addPageTitle(page);
  page.addBlock('block_gameFuncs', vecPos(0, 50), vecSize(60, 40), 5, color(235, 162, 57, 0.5));

  page.addBlock('button_gameCreate', vecPos(0, 40), vecSize(30, 12), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
  .addText('Создать игру', vec(0, 0), 4)
  .onClick( () => {
    game.create();
  } );

  page.addBlock('button_gameLoad', vecPos(0, 60), vecSize(30, 12), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
  .addText('Загрузить игру', vec(0, 0), 4)
  .onClick( ()=> {
    alert('load');
  } );

  return page;
}

function addWaitPlayersPage(game, gui){
  let page = gui.addPage('waitPlayers');

  addPageTitle(page);

  page.addBlock('block_playersList', vecPos(0, 55), vecSize(60, 60), 5, color(235, 162, 57, 0.5))

  page.addBlock('button_gameCancel', vecPos(-17, 80), vecSize(20, 5), 5, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
  .addText('< Назад', vec(0, 0), 4)
  .onClick( ()=> {
    game.cancel();
  });

  page.addBlock('button_gameStart', vecPos(15, 80), vecSize(25, 5), 5, color(122, 235, 57, 0.75), color(92, 225, 57, 0.75))
  .addText('Начать игру', vec(0, 0), 4)
  .onClick( ()=> {
    game.begin();
  });

  return page;
}

function addGameMainPage(game, gui){
  let page = gui.addPage('gameMainPage');

  addPageTitle(page);

  return page;
}


let pages = {};

pages.main = addMainPage;
pages.waitPlayers = addWaitPlayersPage;
pages.gameMainPage = addGameMainPage;


export function initPage(game, gui, pageName){
  return pages[pageName](game, gui);
}
