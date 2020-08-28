import GUI from '/script/gui/gui.js';
export let gui = new GUI();

let W = window.innerWidth;
let H = window.innerHeight;

function vec(x, y){
  return {x: W/100*x, y: H/100*y};
}

function color(r, g, b, a){
  return {r: r, g: g, b: b, a: a};
}

let start = gui.addPage('start');
start.addButton(() => alert('press'), gui, vec(50, 50), vec(50, 15), W*0.01, color(57, 142, 250, 0.85), color(57, 122, 250, 0.85));
gui.currentPage = start;
gui.update();

gui.canvas.addEventListener('mousedown', event => {
  gui.update(event);
});
gui.canvas.addEventListener('mouseup', event => {
  gui.update(event);
  gui.dragElement = null;
  gui.dropElement = null;
});
gui.canvas.addEventListener('mousemove', event => {
  gui.update(event);
});
