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
let testDrop = start.addBlock(vec(50, 30), vec(50, 15), W*0.01, color(142, 57, 250, 0.7), color(122, 57, 250, 0.7))
testDrop.dragable = true;

let testBtn = start.addBlock(vec(50, 50), vec(50, 15), W*0.01, color(57, 142, 250, 0.7), color(57, 122, 250, 0.7));
testBtn.onclick = () => {
  prompt('test button is work');
};
testBtn.ondrop = () => {
  alert('drop');
}

let testDrop2 = start.addBlock(vec(50, 70), vec(50, 15), W*0.01, color(142, 57, 250, 0.7), color(122, 57, 250, 0.7))
testDrop2.dragable = true;
testDrop2.ondrop = () => {
  alert('drop 2');
}

let testDrop3 = start.addBlock(vec(50, 90), vec(50, 15), W*0.01, color(142, 57, 250, 0.7), color(122, 57, 250, 0.7))
testDrop3.dragable = true;

gui.currentPage = start;
gui.update();

gui.canvas.addEventListener('mousedown', event => {
  gui.update(event);
});
gui.canvas.addEventListener('mouseup', event => {
  gui.update(event);

});
gui.canvas.addEventListener('mousemove', event => {
  gui.update(event);
});
