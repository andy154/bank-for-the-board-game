function toRGBA(color){
  return `rgba(${color.r}, ${color.g}, ${color.b},${color.a})`;
}

export default class Text {
  constructor(ctx, text, pos, size, color){
    this.ctx = ctx;
    this.text = text;
    this.pos = pos;
    this.fontSize = size || 10;
    this.fontColor = color || {r: 255, g: 255, b: 255, a: 1};

    return this;
  }

  draw(move, offset){
    this.ctx.beginPath();
    let inner = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    this.ctx.font = `${inner*this.fontSize/100}px Arial`;
    this.ctx.fillStyle = toRGBA(this.fontColor);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.text, this.pos.x + move.x - offset.x, this.pos.y + move.y - offset.y);
    this.ctx.closePath();
  }
}
