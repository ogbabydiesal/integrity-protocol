let canv;
let offset = 100;
let el;
let cover;

function setup() {
    canv = createCanvas(800, 200); 
    canv.parent("controls");
    // example values
    colorKnob = new MakeKnobC("white", 50, ((width/4) * 0) + offset, 50, 0, 255, 0, 0,"", [0,0,255, 0], 0);
    colorKnob2 = new MakeKnobC("white", 50, ((width/4) * 1) + offset, 50, 0, 255, 0, 0,"", [0,0,255, 0], 0);
    colorKnob3 = new MakeKnobC("white", 50, ((width/4) * 2) + offset, 50, 0, 255, 0, 0,"", [0,0,25, 0], 0);
    colorKnob4 = new MakeKnobC("white", 50, ((width/4) * 3) + offset, 50, 0, 255, 0, 0,"", [0,0,255,0], 0);
    el = document.getElementById("viddy");
    cover = document.querySelector(".playBar");
}
  
function play() {
    el.play();
    cover.style.display = "none";
}
function draw() {
    background(0, 0, 255);
    //background(colorKnob.knobValue); // Use the knob to control something
    colorKnob.update();
    colorKnob2.update();
    colorKnob3.update();
    colorKnob4.update();
}
  
function mousePressed() { 
    colorKnob.active();
    colorKnob2.active();
    colorKnob3.active();
    colorKnob4.active(); 
}
function mouseReleased() { 
    colorKnob.inactive();
    colorKnob2.inactive();
    colorKnob3.inactive();
    colorKnob4.inactive(); 
}
  
  