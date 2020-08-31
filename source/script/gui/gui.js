import Page from '/script/gui/page.js';

export let W = window.innerWidth;
export let H = window.innerHeight;


export function vecPos(x, y){ //
  if(W > H){
    return {x: W/2 + H/100*x, y: H/100*y};
  }
  return {x: W/2 + W/100*x, y: H/100*y};
}

export function vecSize(x, y){ //
  if(W > H){
    return {x: H/100*x, y: H/100*y};
  }
  return {x: W/100*x, y: H/100*y};
}

export function vec(x, y){
  return {x: x, y: y}
}

export function vecLocal(x, y){
  return {x: x, y: y};
}

export function color(r, g, b, a){
  return {r: r, g: g, b: b, a: a};
}

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

    if(this.currentPage.drag) Object.values(this.currentPage.elements).sort( (a, b) => {
      if(a == this.currentPage.drag) return 1;
      if(b == this.currentPage.drag) return -1;
    });

    this.currentPage.drawElements(event);
  }

}
