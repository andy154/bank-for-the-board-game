import Text from '/script/gui/text.js';

function toRGBA(color){
  return `rgba(${color.r}, ${color.g}, ${color.b},${color.a})`;
}

export default class Block {
  constructor(page, name, pos, size, radius, color, hoverColor){
    this.page = page;
    this.name = name;
    this.subs = [];
    this.parent = null;

    this.pos = pos;
    this.size = size;
    this.radius = radius;
    this.onclick = null;
    this.ondrop = null;
    this.dragable = false;

    this.text = [];
    this.fontSize = 13;
    this.fontColor = {r: 255, g: 255, b: 255, a: 1};

    this.offset = {
      x: 0,
      y: 0
    }
    this.move = {
      x: 0,
      y: 0
    }

    this.color = color;
    this.hoverColor = hoverColor;
    this.activeColor = color;

    this.inPath = false;

    page.elements[name] = this;
    return this;
  }

  addParent(element){
    element.subs.push(this);
    this.parent = element;
    return this;
  }

  deleteSubs(){
    this.subs.forEach(item => item.page.elements[item.name] = null);
    this.subs = [];
  }

  setFontSize(size){
    this.fontSize = size;
    return this;
  }

  setFont(size, color){
    this.fontSize = size;
    this.fontColor = color;
    return this;
  }

  addText(text, pos, size, color){
    pos.x = this.pos.x + (this.size.x * pos.x)/100;
    pos.y = this.pos.y + (this.size.y * pos.y)/100;
    this.text.push(new Text(this.page.gui.ctx, text, pos, size, color));
    return this;
  }

  setDragable(value){
    this.dragable = value;
    return this;
  }

  onClick(func){
    this.onclick = func;
    return this;
  }

  draw(event = null){
    let ctx = this.page.gui.ctx;
    let x = this.pos.x - this.size.x/2 + this.move.x - this.offset.x;
    let y = this.pos.y - this.size.y/2 + this.move.y - this.offset.y;
    let w = this.size.x;
    let h = this.size.y;
    let r = window.innerHeight*this.radius/1000;
    let color = toRGBA(this.activeColor);

    ctx.beginPath();

    ctx.fillStyle = color;
    ctx.moveTo(x, y + r);
    ctx.lineTo(x, y + h - r);
    ctx.quadraticCurveTo(x, y + h, x + r, y + h);
    ctx.lineTo(x + w - r, y + h);
    ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
    ctx.lineTo(x + w, y + r);
    ctx.quadraticCurveTo(x + w, y, x + w - r, y);
    ctx.lineTo(x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);

    if( event && ctx.isPointInPath(event.pageX, event.pageY) && (this.onclick || this.dragable || this.ondrop) ){ // if Block is active
      let touchstart = event.type == 'touchstart' || event.type == 'mousedown';
      let touchmove = event.type == 'touchmove' || event.type == 'mousemove';
      let touchend = event.type == 'touchend' || event.type == 'mouseup';

      if( (touchstart || touchmove) && !this.inPath ){ // in Path toggle
        this.inPath = true;
        this.activeColor = this.hoverColor;
        return this.draw();
      }

      if( this.inPath ){
        if( ( touchstart || event.type == 'touchmove') && this.dragable && !this.page.drag){
          this.page.drag = this;
          this.move.x = event.pageX - this.pos.x;
          this.move.y = event.pageY - this.pos.y;
          this.offset.x = this.move.x;
          this.offset.y = this.move.y;
          return this.draw();
        }

        if(touchmove && this.page.drag == this){
          this.move.x = event.pageX - this.pos.x;
          this.move.y = event.pageY - this.pos.y;
          return this.draw();
        }

        if( touchend ){
          if(this.page.drag == this){
            this.dragReset();
          }else if(this.page.drag && this.page.drag != this && this.ondrop){
            this.ondrop(this.page.drag);
          }else if(this.onclick){
            this.onclick();
          }
          this.inPath = false;
          this.activeColor = this.color;
          return this.draw();
        }

      }

    }else if( event && this.inPath && !ctx.isPointInPath(event.pageX, event.pageY)){ // out of Path toggle
      if(this.page.drag == this){
        this.dragReset();
      }
      this.inPath = false;
      this.activeColor = this.color;
      return this.draw();
    }

    ctx.fill();

    this.text.forEach((item) => {
      item.draw(this.move, this.offset);
    });

  }

  dragReset(){
    this.page.drag = null;
    this.move.x = 0;
    this.move.y = 0;
    this.offset.x = 0;
    this.offset.y = 0;
  }

}
