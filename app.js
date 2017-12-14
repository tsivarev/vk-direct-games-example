const right = "right";
const left = "left";
const up = "up";
const down = "down";
const px = "px";
const wBlocks = 18;
const hBlocks = 25;
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
const headColor = "#5a76b5";
const bodyColor = "#a1b4dd";
const appleColor = "#ffcbcb";
const appleBorderColor = "#bf6969";
const gameFieldColor = "#e8eaf2";

/* listen to swipes */
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    var direction = drawModule.getCurDirection();
    if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
        if (xDiff > 0) {
            /* left swipe */
            if (drawModule.getCurDirection() !== right) {
                direction = left;
            }
        } else {
            /* right swipe */
            if (drawModule.getCurDirection() !== left) {
                direction = right;
            }
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            if (drawModule.getCurDirection() !== down) {
                direction = up;
            }
        } else {
            /* down swipe */
            if (drawModule.getCurDirection() !== up) {
                direction = down;
            }
        }
    }
    drawModule.setDirection(direction);

    xDown = null;
    yDown = null;
}

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

function startGame() {
    document.getElementById("startView").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";

    drawModule.start();
}

