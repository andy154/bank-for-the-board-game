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

  page.addBlock('transfer', vecPos(0, 7), vecSize(80, 10), 15, color(235, 122, 57, 0.75), color(235, 102, 57, 0.75))
  .addText('Перевод игроку', vec(0, 0), 4)
  .onClick( () => {
    let page = initPage(game, gui, 'selectPlayer');
    gui.setPage(page);
  } );

  page.addBlock('player', vecPos(0, 22), vecSize(80, 15), 15, color(235, 132, 57, 0.8), color(235, 112, 57, 0.8))
  .addText(game.playerData.name, vec(0, -20), 8)
  .addText(`Баланс: ${game.playerData.money} ${game.currency}`, vec(0, 20), 4, color(255, 255, 50, 1))
  .setDragable(true)
  .onDrop( () => {
    switch(page.drag.name){
      case 'bank':
        let count = prompt('Укажите сумму, которую хотите получить из банка:');

        if(count === null) return;
        if(!+count) return alert('Вы не указали сумму!');

        game.payout(count);
      break;

      case 'fund':
        let page = initPage(game, gui, 'getFundMoney');
        gui.setPage(page);
      break;

      case 'jackpot':
        let conf = confirm('Вы хотите забрать джекпот?');

        if(conf){
          game.getJeckpot();
        }else{
          return;
        }

      break;
    }
  });

  page.addBlock('bank', vecPos(-30, 50), vecSize(25, 12), 15, color(22, 185, 57, 0.75), color(0, 170, 57, 0.75))
  .addText('Банк', vec(0, 0), 4)
  .setDragable(true)
  .onDrop( () => {
    let count = prompt('Укажите сумму перевода в банк:');

    if(count === null) return;
    if(!+count) return alert('Вы не указали сумму!');

    game.makePayment('bank', count);
  })
  .onClick( () => {
    let page = initPage(game, gui, 'bank');
    gui.setPage(page);
  });

  page.addBlock('fund', vecPos(30, 50), vecSize(25, 12), 15, color(22, 97, 200, 0.75), color(22, 77, 200, 0.75))
  .addText('Фонд', vec(0, 0), 4)
  .setDragable(true)
  .onDrop( () => {
    let count = prompt('Укажите сумму перевода в фонд:');

    if(count === null) return;
    if(!+count) return alert('Вы не указали сумму!');

    game.makePayment('fund', count);
  });

  page.addBlock('jackpot', vecPos(0, 50), vecSize(25, 12), 15, color(170, 57, 170, 0.75), color(150, 57, 150, 0.75))
  .addText('Джекпот', vec(0, 0), 4)
  .setDragable(true)
  .onDrop( () => {
    let count = prompt('Укажите сумму перевода в джекпот:');

    if(count === null) return;
    if(!+count) return alert('Вы не указали сумму!');

    game.makePayment('jackpot', count);
  });

  page.addBlock('auction', vecPos(0, 70), vecSize(80, 12), 15, color(200, 200, 0, 0.75), color(190, 190, 0, 0.75))
  .addText('Аукцион', vec(0, 0), 6, color(255, 255, 255, 1))
  .onClick( () => {
    let page = initPage(game, gui, 'auction');
    gui.setPage(page);
  } );

  page.addBlock('eventLog', vecPos(0, 95), vecSize(60, 7), 15, color(212, 212, 212, 0.75), color(200, 200, 200, 0.75))
  .addText('Журнал событий', vec(0, 0), 5)
  .onClick( () => {
    let page = initPage(game, gui, 'eventLog');
    gui.setPage(page);
  } );

  return page;
}

function addSelectPlayerPage(game, gui){

  let page = gui.addPage('selectPlayer');

  page.addBlock('message', vecPos(0, 10), vecSize(80, 15), 15, color(57, 132, 235, 0.8), color(57, 112, 235, 0.8))
  .addText('Выберете получателя:', vec(0, 0), 7)

  game.playersList.filter(_player => _player.name != game.playerData.name).forEach( (_player, i) => {
    page.addBlock(`player_${i}`, vecPos(0, 30 + 13*i), vecSize(60, 8), 15, color(235, 132, 57, 0.7), color(235, 112, 57, 0.7))
    .addText(_player.name, vec(0, 0), 5)
    .onClick( () => {
      let count = prompt('Укажите сумму перевода:');

      if(count === null) return;
      if(!+count) return alert('Вы не указали сумму!');

      game.makeTransfer(_player.ip, count);
      let page = initPage(game, gui, 'gameMainPage');
      gui.setPage(page);
    } );
  });

  page.addBlock('back', vecPos(0, 90), vecSize(35, 7), 15, color(57, 132, 235, 0.8), color(57, 112, 235, 0.8))
  .addText('Назад', vec(0, 0), 4)
  .onClick( () => {
    let page = initPage(game, gui, 'gameMainPage');
    gui.setPage(page);
  } );

  return page;
}

function addBankPage(game, gui){
  let page = gui.addPage('bank');

  page.addBlock('title', vecPos(0, 10), vecSize(80, 15), 15, color(57, 180, 57, 0.7))
  .addText('Банк', vec(0, 0), 10);

  page.addBlock('pledge', vecPos(-25, 40), vecSize(40, 12), 15, color(135, 132, 57, 0.8), color(135, 112, 57, 0.8))
  .addText('Залог', vec(0, 0), 6)
  .onClick( () => {
    // ...
  } );

  page.addBlock('ransom', vecPos(25, 40), vecSize(40, 12), 15, color(235, 62, 57, 0.8), color(200, 62, 57, 0.8))
  .addText('Выкуп', vec(0, 0), 6)
  .onClick( () => {
    // ...
  } );

  page.addBlock('luck', vecPos(-25, 60), vecSize(40, 12), 15, color(135, 132, 57, 0.8), color(135, 112, 57, 0.8))
  .addText('Удачная инвистиция', vec(0, 0), 4)
  .onClick( () => {
    // ...
  } );

  page.addBlock('failure', vecPos(25, 60), vecSize(40, 12), 15, color(235, 62, 57, 0.8), color(200, 62, 57, 0.8))
  .addText('Неудачный кредит', vec(0, 0), 4)
  .onClick( () => {
    // ...
  } );

  page.addBlock('back', vecPos(0, 90), vecSize(35, 7), 15, color(57, 132, 235, 0.8), color(57, 112, 235, 0.8))
  .addText('Назад', vec(0, 0), 4)
  .onClick( () => {
    let page = initPage(game, gui, 'gameMainPage');
    gui.setPage(page);
  } );

  return page;
}

function addGetFundMoney(game, gui){
  let page = gui.addPage('getFundMoney');

  page.addBlock('title', vecPos(0, 10), vecSize(80, 15), 15, color(57, 132, 235, 0.8))
  .addText('Благотворительный', vec(0, -20), 8)
  .addText('Фонд', vec(0, 25), 8);

  page.addBlock('full', vecPos(0, 40), vecSize(40, 12), 15, color(65, 172, 57, 0.8), color(65, 152, 57, 0.8))
  .addText('Забрать всё', vec(0, 0), 6)
  .onClick( () => {
    // ...
  } );

  page.addBlock('half', vecPos(0, 60), vecSize(40, 12), 15, color(65, 172, 57, 0.8), color(65, 152, 57, 0.8))
  .addText('Забрать половину', vec(0, 0), 4)
  .onClick( () => {
    // ...
  } );

  page.addBlock('back', vecPos(0, 90), vecSize(35, 7), 15, color(57, 132, 235, 0.8), color(57, 112, 235, 0.8))
  .addText('Назад', vec(0, 0), 4)
  .onClick( () => {
    let page = initPage(game, gui, 'gameMainPage');
    gui.setPage(page);
  } );

  return page;
}

function addAuctionPage(game, gui){
  let page = gui.addPage('auction');

  page.addBlock('title', vecPos(0, 10), vecSize(80, 15), 15, color(57, 132, 235, 0.8))
  .addText('Аукцион', vec(0, 0), 8);

  page.addBlock('back', vecPos(0, 90), vecSize(35, 7), 15, color(57, 132, 235, 0.8), color(57, 112, 235, 0.8))
  .addText('Назад', vec(0, 0), 4)
  .onClick( () => {
    let page = initPage(game, gui, 'gameMainPage');
    gui.setPage(page);
  } );

  return page;
}

function addEventLogPage(game, gui){
  let page = gui.addPage('eventLog');

  page.addBlock('title', vecPos(0, 10), vecSize(80, 15), 15, color(57, 132, 235, 0.8))
  .addText('Журнал событий', vec(0, 0), 8);

  page.addBlock('back', vecPos(0, 90), vecSize(35, 7), 15, color(57, 132, 235, 0.8), color(57, 112, 235, 0.8))
  .addText('Назад', vec(0, 0), 4)
  .onClick( () => {
    let page = initPage(game, gui, 'gameMainPage');
    gui.setPage(page);
  } );

  return page;
}


let pages = {};
pages.waitGame = addWaitGamePage;
pages.waitPlayers = addWaitPlayersPage;
pages.gameMainPage = addGameMainPage;
pages.selectPlayer = addSelectPlayerPage;
pages.bank = addBankPage;
pages.getFundMoney = addGetFundMoney;
pages.auction = addAuctionPage;
pages.eventLog = addEventLogPage;

export function initPage(game, gui, pageName){
  return pages[pageName](game, gui);
}
