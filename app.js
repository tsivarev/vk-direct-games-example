const right = "right";
const left = "left";
const up = "up";
const down = "down";
const px = "px";
const wBlocks = 18;
const hBlocks = 25;
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

/* listen to swipes */
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

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

    var dir = drawModule.getCurDirection();
    if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
        if (xDiff > 0) {
            /* left swipe */
            if (drawModule.getCurDirection() !== right) {
                dir = left;
            }
        } else {
            /* right swipe */
            if (drawModule.getCurDirection() !== left) {
                dir = right;
            }
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            if (drawModule.getCurDirection() !== down) {
                dir = up;
            }
        } else {
            /* down swipe */
            if (drawModule.getCurDirection() !== up) {
                dir = down;
            }
        }
    }
    drawModule.setDirection(dir);

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

