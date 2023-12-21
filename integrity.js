let canv;
let offset = 100;
let el;
let cover;
let effectInput;
let speedInput; 
let sizeInput;
let delayInput;
let pitchInput;
let echoInput;
let echoes;
let pitch;
let effect;
let speed;
let context;
let wet;
let grainLength;
let delay;


window.addEventListener("load", function() {
    el = document.querySelector("#viddy");
    cover = document.querySelector(".playButton");
    speedInput = document.querySelector("#speed");
    speedInput.oninput = function() {
        el.playbackRate = this.value;
    }
    effectInput = document.querySelector("#effect");
    effectInput.oninput = function() {
        wet.value = this.value;
    }
    sizeInput = document.querySelector("#size");
    sizeInput.oninput = function() {
        grainLength.value = this.value;
    }
    pitchInput = document.querySelector("#pitch");
    pitchInput.oninput = function() {
        pitch.value = this.value;
    }
    echoInput = document.querySelector("#echoes");
    echoInput.oninput = function() {
        echoes.value = this.value;
    }
    setup();
});

function play() {
    el.play();
    cover.style.display = "none";
    showControls();
    context.resume();
}

function showControls() {
    setTimeout(() => {
        document.querySelectorAll('.slidey').forEach(function(rangey) {
            rangey.style.opacity = "1.0";
        });
      }, "4200");   
}

const { createDevice } = RNBO;

const setup = async () => {
    let WAContext = window.AudioContext || window.webkitAudioContext;
    context = new WAContext();
    let rawPatcher = await fetch("integrity.export.json");
    let patcher = await rawPatcher.json();
    let device = await createDevice({ context, patcher });
    source = context.createMediaElementSource(el);
    source.connect(device.node);
    wet = device.parametersById.get("wet");
    pitch = device.parametersById.get("pitch");
    grainLength = device.parametersById.get("grainLength");
    delay = device.parametersById.get("delay");
    echoes = device.parametersById.get("feedback");
    device.node.connect(context.destination);
};