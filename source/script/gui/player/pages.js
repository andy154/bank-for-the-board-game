import {W, H, vecPos, vecSize, vec, color} from '/script/gui/gui.js';

function addPageTitle(page){
  page.addBlock('title_page', vecPos(0, 10), vecSize(90, 10), 5, color(57, 142, 235, 0.85))
  .setFont(13, color(255, 255, 255, 1))
  .addText('Миллионер', vec(-15, 0), 10)
  .addText('classic', vec(28, 20), 8, color(235, 10, 10, 1));
}

function addMainPage(game, gui){

  let page = gui.addPage('main');

  addPageTitle(page);

  page.addBlock('block_message', vecPos(0, 50), vecSize(50, 5), 5, color(0, 0, 0, 0))
  .addText('Нет активной игры', vec(0, 0), 7)
  .addText('Ожидайте...', vec(0, 125), 6);

  return page;
}

function addWaitPlayersPage(game, gui){

  let page = gui.addPage('waitPlayers');

  addPageTitle(page);

  page.addBlock('block_message', vecPos(0, 50), vecSize(50, 5), 5, color(0, 0, 0, 0))
  .addText('Ожидание других игроков...', vec(0, 0), 7);

  return page;
}



export function initPages(game, gui){
  let pages = {};

  pages.main = addMainPage(game, gui);
  pages.waitPlayers = addWaitPlayersPage(game, gui);

  gui.pages = pages;
}
