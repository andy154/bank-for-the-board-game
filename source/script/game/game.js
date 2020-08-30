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

  create(){
     this.server.sendMessage('func:game.create');
  }

  cancel(){
    this.server.sendMessage('func:game.cancel');
  }

  setStatus(value){
    this.server.sendMessage('set:game.status', value);
  }

}
