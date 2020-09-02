export default class Game {
  constructor(server){
    this.server = server;
    return this;
  }

  async getExist(){
    let response = await this.server.sendMessageWithResponse('get:game.exist');
    return response.data;
  }

  async getStatus(){
    let response = await this.server.sendMessageWithResponse('get:game.status');
    return response.data;
  }

  async getPlayerData(){
    let response = await this.server.sendMessageWithResponse('get:game.playerData');
    return response.data;
  }

  async getPlayersList(){
    let response = await this.server.sendMessageWithResponse('get:game.playersList');
    return response.data;
  }

  async getCurrency(){
    let response = await this.server.sendMessageWithResponse('get:game.currency');
    return response.data;
  }

  create(){
     this.server.sendMessage('func:game.create');
  }

  cancel(){
    this.server.sendMessage('func:game.cancel');
  }

  setStatus(value){
    this.server.sendMessage('set:game.status', value);
  }

  playerRegister(name){
    this.server.sendMessage('func:game.playerRegister', name);
  }

  begin(){
    this.server.sendMessage('func:game.begin');
  }

  makeTransfer(payeeIp, count){
    let data = {
      payeeIp: payeeIp,
      count: +count
    }
    this.server.sendMessage('func:game.makeTransfer', data);
  }

  makePayment(payeeName, count){
    let data = {
      payeeName: payeeName,
      count: +count
    };
    this.server.sendMessage('func:game.makePayment', data);
  }

  payout(count){
    this.server.sendMessage('func:game.payout', +count);
  }

  getJeckpot(){
    this.server.sendMessage('func:game.getJeckpot');
  }

}
