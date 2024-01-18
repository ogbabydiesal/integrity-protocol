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


function firstFrame() {
    console.log("first frame");
    el.currentTime = 0; 
}

window.addEventListener("load", function() {
    el = document.querySelector("#viddy");
    if (this.window.innerWidth < 600) {
        el.setAttribute("poster", "integrityPoster.jpg");
    }
    cover = document.querySelector("#playButton");
    speedInput = document.querySelector("#speed");
    speedInput.oninput = function() {
        el.playbackRate = this.value;
    }
    effectInput = document.querySelector("#effect");
    effectInput.oninput = function() {
        wet.value = this.value;
    }
    delayInput = document.querySelector("#delay");
    delayInput.oninput = function() {
        delay.value = this.value;
    }
    sizeInput = document.querySelector("#size");
    sizeInput.oninput = function() {
        grainLength.value = this.value;
    }
    pitchInput = document.querySelector("#pitch");
    pitchInput.oninput = function() {
        var val = this.value;
        if (this.value == 0) {
            val = -1;
        }
        else if (this.value == -0.5) {
            val = -2.0;
        }
        pitch.value = val;
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
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-50, context.currentTime);
    compressor.knee.setValueAtTime(40, context.currentTime);
    compressor.ratio.setValueAtTime(12, context.currentTime);
    compressor.attack.setValueAtTime(0, context.currentTime);
    compressor.release.setValueAtTime(0.25, context.currentTime);
    wet = device.parametersById.get("wet");
    wet.value = "0.5";
    pitch = device.parametersById.get("pitch");
    pitch.value = "2.0";
    grainLength = device.parametersById.get("grainLength");
    grainLength.value = "120";
    delay = device.parametersById.get("delay");
    delay.value = "8000";
    echoes = device.parametersById.get("feedback");
    echoes.value = "0.6";
    device.node.connect(compressor);
    compressor.connect(context.destination);
};