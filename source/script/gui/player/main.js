import {W, H, vecPos, vecSize, vec, vecLocal, color} from '/script/gui/gui.js';


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
    gui.currentPage = gui.pages.main;
    return gui.update();
  }

  if(game.status == 'wait_players') {
    if(game.playerData){
      gui.currentPage = gui.pages.waitPlayers;
      return gui.update();
    }
    return register(game);
  }

}
