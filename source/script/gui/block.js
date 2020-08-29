export default class Block {
  constructor(page, pos, size, radius, color, hoverColor){
    this.page = page;

    this.pos = pos;
    this.size = size;
    this.radius = radius;
    this.onclick = null;
    this.ondrop = null;
    this.dragable = false;

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
    let x = this.pos.x - this.size.x/2 + this.move.x - this.offset.x;
    let y = this.pos.y - this.size.y/2 + this.move.y - this.offset.y;
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

    if(this.text){
      ctx.beginPath();
      ctx.font = `72px Arial`;
      ctx.fillStyle = `rgba(0, 0, 0, 1)`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.text, x, y);
      ctx.closePath();
    }

  }

  dragReset(){
    this.page.drag = null;
    this.move.x = 0;
    this.move.y = 0;
    this.offset.x = 0;
    this.offset.y = 0;
  }

}
