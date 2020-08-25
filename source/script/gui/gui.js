import Page from '/script/gui/page.js';
export default class GUI {
  static W = window.innerWidth;
  static H = window.innerHeight;

  constructor(){
    let canvas = document.createElement('canvas');
    canvas.width = GUI.W;
    canvas.height = GUI.H;
    document.body.append(canvas);
    this.ctx = canvas.getContext('2d');

    this.pages = {};
    this.currentPage = null;
  }

  update(){
    this.ctx.clearRect(0, 0, GUI.W, GUI.H);
    if(!this.currentPage) return;

  }

}
