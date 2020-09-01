import {W, H, vecPos, vecSize, vec, color} from '/script/gui/gui.js';
import { initPage } from '/script/gui/admin/pages.js';

export async function main(game, gui, updatedVars = ''){
  await game.isLoaded;

  game.exist = updatedVars.includes('game.exist') ? await game.getExist() : game.exist || await game.getExist();
  game.status = updatedVars.includes('game.status') ? await game.getStatus() : game.status || await game.getStatus();
  game.playersList = updatedVars.includes('game.playersList') ? await game.getPlayersList() : game.playersList || await game.getPlayersList();

  if(!game.exist) {
    let page = initPage(game, gui, 'main');
    gui.setPage(page);
    return gui.update();
  }

  if(game.status == 'wait_players') {
    let page = initPage(game, gui, 'waitPlayers');
    gui.setPage(page);

    if(game.playersList.length == 0) {
      gui.currentPage.addBlock('message_noPlayers', vecPos(0, 50), vecSize(0, 0), 0, color(255, 255, 255, 0))
      .addText('Нет зарегистрированных игроков', vec(0, 0), 3);
      return gui.update();
    }

    game.playersList.forEach((_player, i) => {
      gui.currentPage.addBlock(`player_${i}`, vecPos(0, 30 + 7*i), vecSize(55, 5), 5, color(235, 160, 57, 0.75), color(235, 150, 57, 0.75))
      .addText(_player.name, vec(-25, 0), 2.5)
      .addText(_player.ip.slice(7), vec(25, 0), 2.5)
      .onClick( () => {});
    });

    return gui.update();
  }else if(game.status == 'playing'){
    let page = initPage(game, gui, 'gameMainPage');
    gui.setPage(page);

    return gui.update();
  }

}
