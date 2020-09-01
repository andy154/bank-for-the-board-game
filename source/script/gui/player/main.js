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
    let page = initPage(game, gui, 'waitGame');
    gui.setPage(page);
    return gui.update();
  }

  if(game.status == 'wait_players') {
    if(game.playerData){
      let page = initPage(game, gui, 'waitPlayers');
      gui.setPage(page);
      return gui.update();
    }
    return register(game);
  }else if(game.status == 'playing'){
    let page = initPage(game, gui, 'gameMainPage');
    gui.setPage(page);

    return gui.update();
  }

}
