import Block from '/script/gui/block.js';

export default class Page {
  constructor(gui){
    this.gui = gui;
    this.prevPage = null;
    this.subPages = {};
    this.elements = [];

    return this;
  }

  addBlock(gui, pos, size, radius, color){
    let block = new Block(gui, pos, size, radius, color);
    this.elements.push(block);
  }
  
  addButton(func, gui, pos, size, radius, color, hoverColor){
    let block = new Block(func, gui, pos, size, radius, color, hoverColor);

    block.onpress = () => {
      if(gui.dragElement == block) {
        block.activeColor = block.hoverColor;
        block.draw();
        if(gui.dropElement == block){
          gui.dragElement = null;
          gui.dropElement = null;
          block.func();
          gui.update();
        }
      }else{
        block.activeColor = block.color;
        block.draw();

      }
    };

    this.elements.push(block);
  }
}
