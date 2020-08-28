export default class Block {
  constructor(func, gui, pos, size, radius, color, hoverColor){
    this.gui = gui;

    this.pos = pos;
    this.size = size;
    this.radius = radius;
    this.func = func;

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

    return this;
  }

  draw(event = null){
    let ctx = this.gui.ctx;
    let x = this.pos.x - this.size.x/2 + this.offset.x + this.move.x;
    let y = this.pos.y - this.size.y/2 + this.offset.y + this.move.y;
    let w = this.size.x;
    let h = this.size.y;
    let r = this.radius;
    let color = `rgba(${this.activeColor.r}, ${this.activeColor.g}, ${this.activeColor.b},${this.activeColor.a})`;

    ctx.clearRect(x, y, x + w, y + h);
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

    if(event && ctx.isPointInPath(event.pageX, event.pageY)) {
      if(event.type == 'touchstart' || event.type == 'mousedown' || event.type == 'touchmove' || event.type == 'mousemove'){
        this.gui.dragElement = this;
      }else if(event.type == 'touchend' || event.type == 'mouseup'){
        this.gui.dropElement = this;
      }
    }else if(event && !ctx.isPointInPath(event.pageX, event.pageY)){
      this.gui.dragElement = null;
    }

    ctx.fill();
  }
}
