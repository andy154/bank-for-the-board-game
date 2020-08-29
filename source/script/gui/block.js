export default class Block {
  constructor(page, pos, size, radius, color, hoverColor){
    this.page = page;

    this.pos = pos;
    this.size = size;
    this.radius = radius;
    this.onclick = null;

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

    page.elements.push(this);
    return this;
  }

  draw(event = null){
    let ctx = this.page.gui.ctx;
    let x = this.pos.x - this.size.x/2 + this.offset.x + this.move.x;
    let y = this.pos.y - this.size.y/2 + this.offset.y + this.move.y;
    let w = this.size.x;
    let h = this.size.y;
    let r = this.radius;
    let color = `rgba(${this.activeColor.r}, ${this.activeColor.g}, ${this.activeColor.b},${this.activeColor.a})`;
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

    if(event && ctx.isPointInPath(event.pageX, event.pageY) && this.onclick){
      if((event.type == 'mousemove' || event.type == 'touchmove' || event.type == 'touchstart') && !this.inPath){
        this.inPath = true;
        this.activeColor = this.hoverColor;
        return this.page.gui.update();
      }

      if(this.inPath){
        if(event.type == 'mouseup' || event.type == 'touchend'){
          this.onclick();
          this.inPath = false;
          this.activeColor = this.color;
          return this.page.gui.update();
        }
      }

    }else if(event && this.onclick && this.inPath && !ctx.isPointInPath(event.pageX, event.pageY)){
      this.inPath = false;
      this.activeColor = this.color;
      return this.page.gui.update();
    }

    ctx.fill();
  }

}
