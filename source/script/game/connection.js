export default class Connection {
  constructor() {
    this.socket = new WebSocket(`ws://${window.location.hostname}:8080`);

    this.socket.onmessage = messageEvent => {
      let message = JSON.parse(messageEvent.data);
      this.socket.dispatchEvent(new CustomEvent(message.method, { detail: message } ));
    }

    return this;
  }

  async sendMessage(method, data = null){
    let id = Date.now();
    this.socket.send(JSON.stringify( { id: id, method: method, data: data } ));

    let response = new Promise( resolve => {
      let func = event => {
        let message = event.detail;
        if(id != message.id) return;
        this.socket.removeEventListener(method, func);
        resolve(message);
      };
      this.socket.addEventListener(method, func);
      // setTimeout();
    });

    return await response;
  }
}
