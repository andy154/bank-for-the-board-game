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
start.addButton(() => {
  let a = prompt();
}, gui, vec(50, 50), vec(50, 15), W*0.01, color(57, 142, 250, 0.85), color(57, 122, 250, 0.85));
gui.currentPage = start;
gui.update();

function touchStart(event){
  event.preventDefault();
  gui.update(event);
}

function touchEnd(event){
  gui.update(event);
}

function touchMove(event){
    gui.update(event);
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  gui.canvas.addEventListener('touchstart', touchStart);
  gui.canvas.addEventListener('touchend', touchEnd);
  gui.canvas.addEventListener('touchmove', touchMove);
}else{
  gui.canvas.addEventListener('mousedown', touchStart);
  gui.canvas.addEventListener('mouseup', touchEnd);
  gui.canvas.addEventListener('mousemove', touchMove);
}
