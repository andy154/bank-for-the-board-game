import { W, H, vecPos, vecSize, vec, color } from '/script/gui/gui.js';
import { initPage } from '/script/gui/player/pages.js';

function register(game){
  let name = prompt('Введите ваше имя:');

  if(!name) return window.location.reload();

  game.playerRegister(name);
}


export async function main(game, gui, updatedVars = ''){
  await game.isLoaded;

  game.exist = updatedVars.includes('game.exist') ? await game.getExist() : game.exist || await game.getExist();
  game.status = updatedVars.includes('game.status') ? await game.getStatus() : game.status || await game.getStatus();
  game.playerData = updatedVars.includes('game.playerData') ? await game.getPlayerData() : game.playerData || await game.getPlayerData();

  if(!game.exist) {
    gui.currentPage = initPage(game, gui, 'waitGame');
    return gui.update();
  }

  if(game.status == 'wait_players') {
    if(game.playerData){
      gui.currentPage = initPage(game, gui, 'waitPlayers');
      return gui.update();
    }
    return register(game);
  }else if(game.status == 'playing'){
    gui.currentPage = initPage(game, gui, 'gameMainPage');

    return gui.update();
  }

}
