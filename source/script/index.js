import {game} from '/script/game/index.js';
async function importGUI(){
  let gui = await import( `/script/gui/${(window.location.hostname == 'localhost') ? 'admin' : 'player'}/index.js` ) ;
  return gui;
}
let gui = importGUI();
