import {game} from '/script/game/index.js';
import GUI from '/script/gui/gui.js';
import {W, H, vecPos, vecSize, vec, vecLocal, color} from '/script/gui/gui.js';
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

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  gui.canvas.addEventListener('touchstart', touchStart);
  gui.canvas.addEventListener('touchend', touchEnd);
  gui.canvas.addEventListener('touchmove', touchMove);
}else{
  gui.canvas.addEventListener('mousedown', touchStart);
  gui.canvas.addEventListener('mouseup', touchEnd);
  gui.canvas.addEventListener('mousemove', touchMove);
}

function title_page(page){
  page.addBlock('title_page', vecPos(0, 10), vecSize(90, 10), 5, color(57, 142, 235, 0.85))
  .setFont(13, color(255, 255, 255, 1))
  .addText('Миллионер', vec(-15, 0), 10)
  .addText('classic', vec(28, 20), 8, color(235, 10, 10, 1));
}

let mainPage = gui.addPage('main');
title_page(mainPage);

function register(){
  let name = prompt('Введите ваше имя:');

  if(!name) return register();

  game.playerRegister(name);
}

let waitPlayersPage = gui.addPage('waitPlayers');
title_page(waitPlayersPage);

async function main(updatedVars = ''){
  await game.isLoaded;

  game.exist = updatedVars.includes('game.exist') ? await game.getExist() : game.exist || await game.getExist();
  if(!game.exist) {
    gui.currentPage = gui.pages.main;
    return gui.update();
  }

  game.status = updatedVars.includes('game.status') ? await game.getStatus() : game.status || await game.getStatus();
  game.playerData = updatedVars.includes('game.playerData') ? await game.getPlayerData() : game.playerData || await game.getPlayerData();
  console.log(game.playerData);
  if(game.status == 'wait_players') {
    if(game.playerData){
      gui.currentPage = gui.pages.waitPlayers;
      return gui.update();
    }
    return register();
  }

}

main();

game.server.socket.addEventListener('updateData', customEvent => {
  let message = customEvent.detail;
  main(message.data);
})
