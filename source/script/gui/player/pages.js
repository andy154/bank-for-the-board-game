import {W, H, vecPos, vecSize, vec, color} from '/script/gui/gui.js';

function addPageTitle(page){
  page.addBlock('title', vecPos(0, 10), vecSize(90, 10), 5, color(57, 142, 235, 0.85))
  .setFont(13, color(255, 255, 255, 1))
  .addText('Миллионер', vec(-15, 0), 10)
  .addText('classic', vec(28, 20), 8, color(235, 10, 10, 1));
}


function addWaitGamePage(game, gui){

  let page = gui.addPage('main');

  addPageTitle(page);

  page.addBlock('message', vecPos(0, 50), vecSize(50, 5), 5, color(0, 0, 0, 0))
  .addText('Нет активной игры', vec(0, 0), 7)
  .addText('Ожидайте...', vec(0, 125), 6);

  return page;
}

function addWaitPlayersPage(game, gui){

  let page = gui.addPage('waitPlayers');

  addPageTitle(page);

  page.addBlock('message', vecPos(0, 50), vecSize(50, 5), 5, color(0, 0, 0, 0))
  .addText('Ожидание других игроков...', vec(0, 0), 7);

  return page;
}

function addGameMainPage(game, gui){
  let page = gui.addPage('gameMainPage');

  page.addBlock('transfer', vecPos(0, 7), vecSize(60, 10), 15, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
  .addText('Перевод игроку', vec(0, 0), 4)
  .onClick( () => {
    let page = initPage(game, gui, 'selectPlayer');
    gui.setPage(page);
  } );

  page.addBlock('player', vecPos(0, 22), vecSize(60, 15), 15, color(235, 132, 57, 0.8), color(235, 112, 57, 0.8))
  .addText(game.playerData.name, vec(0, -20), 6)
  .addText(`Баланс: ${game.playerData.money}`, vec(0, 20), 4, color(255, 255, 50, 1))
  .setDragable(true)
  .onDrop( () => {
    // ...
    alert('Получить деньги из ...');
  });

  page.addBlock('bank', vecPos(-30, 50), vecSize(25, 12), 15, color(22, 185, 57, 0.75), color(0, 170, 57, 0.75))
  .addText('Банк', vec(0, 0), 4)
  .setDragable(true)
  .onDrop( () => {
    // ...
    alert('Внести деньги в банк');
  });

  page.addBlock('fund', vecPos(30, 50), vecSize(25, 12), 15, color(22, 97, 200, 0.75), color(22, 77, 200, 0.75))
  .addText('Фонд', vec(0, 0), 4)
  .setDragable(true)
  .onDrop( () => {
    // ...
    alert('Внести деньги в фонд');
  });

  page.addBlock('jackpot', vecPos(0, 50), vecSize(25, 12), 15, color(170, 57, 170, 0.75), color(150, 57, 150, 0.75))
  .addText('Джекпот', vec(0, 0), 4)
  .setDragable(true)
  .onDrop( () => {
    // ...
    alert('Внести деньги в джекпот');
  });

  page.addBlock('auction', vecPos(0, 65), vecSize(60, 12), 15, color(200, 200, 0, 0.75), color(190, 190, 0, 0.75))
  .addText('Аукцион', vec(0, 0), 6, color(255, 255, 255, 1))
  .onClick( () => {
    // ...
    alert('Создать/участвовать');
  } );

  page.addBlock('eventLog', vecPos(0, 95), vecSize(70, 7), 15, color(212, 212, 212, 0.75), color(200, 200, 200, 0.75))
  .addText('Журнал событий', vec(0, 0), 5)
  .onClick( () => {
    // ...
    alert('Открыть');
  } );

  return page;
}

function addSelectPlayerPage(game, gui){

  let page = gui.addPage('selectPlayer');
  addPageTitle(page);
  return page;
}


let pages = {};
pages.waitGame = addWaitGamePage;
pages.waitPlayers = addWaitPlayersPage;
pages.gameMainPage = addGameMainPage;
pages.selectPlayer = addSelectPlayerPage;


export function initPage(game, gui, pageName){
  return pages[pageName](game, gui);
}
