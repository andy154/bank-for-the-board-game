import Block from '/script/gui/block.js';

export default class Page {
  constructor(gui){
    this.gui = gui;
    this.elements = {};

    return this;
  }

  drawElements(event){
    Object.values(this.elements).forEach((element) => {
      if(element) element.draw(event);
    });
  }

  addBlock(name, pos, size, radius, color, hoverColor){
    return new Block(this, name, pos, size, radius, color, hoverColor);
  }

}
