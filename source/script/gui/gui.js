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

  setPage(page){
    if(this.currentPage) this.currentPage.isCurrent = false;
    this.currentPage = page;
  }

  clear(){
    this.ctx.clearRect(0, 0, W, H);
  }

  update(event = null){
    this.clear();
    if(!this.currentPage) return;

    this.currentPage.drawElements(event);
  }

}
