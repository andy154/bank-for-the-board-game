import Block from '/script/gui/block.js';

export default class Page {
  constructor(gui){
    this.gui = gui;
    this.prevPage = null;
    this.subPages = {};
    this.elements = {};

    return this;
  }

  addBlock(name, pos, size, radius, color, hoverColor){
    return new Block(this, name, pos, size, radius, color, hoverColor);
  }

}
