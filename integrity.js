let canv;
let offset = 100;
let el;
let cover;
let speedInput; 
let oscInput;
let depthInput;
let pitchInput;
let echoInput;
let echoes;
let pitch;
let depth;
let speed;
let context;
let oscillation;

window.addEventListener("load", function() {
    el = document.getElementById("viddy");
    cover = document.querySelector(".playButton");
    speedInput = document.querySelector("#speed");
    speedInput.oninput = function() {
        el.playbackRate = this.value;
    }
    oscInput = document.querySelector("#osc");
    oscInput.oninput = function() {
        oscillation.value = this.value;
    }
    depthInput = document.querySelector("#depth");
    depthInput.oninput = function() {
        depth.value = this.value;
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
// Create AudioContext


const setup = async () => {
    let WAContext = window.AudioContext || window.webkitAudioContext;
    context = new WAContext();
    let rawPatcher = await fetch("integrity.export.json");
    let patcher = await rawPatcher.json();

    let device = await createDevice({ context, patcher });
    
    source = context.createMediaElementSource(el);
    // Connect the devices in series
    source.connect(device.node);
    // This connects the device to audio output, but you may still need to call context.resume()
    // from a user-initiated function.
    depth = device.parametersById.get("depth");
    oscillation = device.parametersById.get("osc");
    pitch = device.parametersById.get("pitch");
    echoes = device.parametersById.get("feedback");
    device.node.connect(context.destination);
};

// We can't await an asynchronous function at the top level, so we create an asynchronous
// function setup, and then call it without waiting for the result.

