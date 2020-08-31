import {W, H, vecPos, vecSize, vec, color} from '/script/gui/gui.js';
export async function main(game, gui, updatedVars = ''){
  await game.isLoaded;

  game.exist = updatedVars.includes('game.exist') ? await game.getExist() : game.exist || await game.getExist();
  game.status = updatedVars.includes('game.status') ? await game.getStatus() : game.status || await game.getStatus();
  game.playersList = updatedVars.includes('game.playersList') ? await game.getPlayersList() : game.playersList || await game.getPlayersList();

  if(!game.exist) {
    gui.currentPage = gui.pages.main;
    return gui.update();
  }

  if(game.status == 'wait_players') {
    gui.currentPage = gui.pages.waitPlayers;
    gui.currentPage.elements.block_playersList.deleteSubs();

    if(game.playersList.length == 0) {
      gui.currentPage.addBlock('message_noPlayers', vecPos(0, 50), vecSize(0, 0), 0, color(255, 255, 255, 0))
      .addParent(gui.currentPage.elements.block_playersList)
      .addText('Нет зарегистрированных игроков', vec(0, 0), 3);
      return gui.update();
    }

    game.playersList.forEach((_player, i) => {
      gui.currentPage.addBlock(`player_${i}`, vecPos(0, 30 + 7*i), vecSize(55, 5), 5, color(235, 160, 57, 0.75), color(235, 150, 57, 0.75))
      .addParent(gui.currentPage.elements.block_playersList)
      .addText(_player.name, vec(-25, 0), 2.5)
      .addText(_player.ip.slice(7), vec(25, 0), 2.5)
      .onClick( () => {});
    });

    return gui.update();
  }

}