import Page from '/script/gui/page.js';

let W = window.innerWidth;
let H = window.innerHeight;


export default class GUI {
  constructor(){
    let canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    document.body.append(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.pages = {};

    this.currentPage = null;

    this.dragElement = null;
    this.dropElement = null;
  }

  addPage(name){
    return this.pages[name] = new Page(this);
  }

  update(event = null){
    this.ctx.clearRect(0, 0, W, H);
    if(!this.currentPage) return;

    if(this.currentPage.drag) this.currentPage.elements.sort( (a, b) => {
      if(a == this.currentPage.drag) return 1;
      if(b == this.currentPage.drag) return -1;
    });
    this.currentPage.elements.forEach((element) => {
      element.draw(event);
    });
  }

}
