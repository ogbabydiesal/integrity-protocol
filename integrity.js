let canv;
let offset = 100;
let el;
let cover;

let speedInput; 
let speed;

window.addEventListener("load", function() {
    el = document.getElementById("viddy");
    cover = document.querySelector(".playButton");
    speedInput = document.querySelector("#speed");
    speedInput.oninput = function() {
        el.playbackRate = this.value;
      } 
});

function play() {
    el.play();
    cover.style.display = "none";
    showControls();
}

function showControls() {
    setTimeout(() => {
        document.querySelectorAll('.slidey').forEach(function(rangey) {
            rangey.style.opacity = "1.0";
        });
      }, "4200");   
}
