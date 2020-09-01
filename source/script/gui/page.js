import Block from '/script/gui/block.js';

export default class Page {
  constructor(gui){
    this.gui = gui;
    this.elements = {};

    this.isCurrent = true;

    return this;
  }

  drawElements(event){
    let elements = Object.values(this.elements)
    elements.sort( (a, b) => {
      if(a == this.drag) return 1;
      if(b == this.drag) return -1;
      return 0;
    });

    for(let element of elements){
      if(element && element.draw(event)) {
        return this.gui.update();
      }
    }
  }

  addBlock(name, pos, size, radius, color, hoverColor){
    return new Block(this, name, pos, size, radius, color, hoverColor);
  }

}
