export default class Game {
  constructor(){

    return this;
  }

  async getExist(server){
    let response = await server.sendMessage('existGame');
    return response.data;
  }

  async test(server){
    let response = await server.sendMessage('test', Math.random());
    console.log(response);
  }
  async create(server){

  }



}
