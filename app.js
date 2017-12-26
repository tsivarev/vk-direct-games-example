const DIRECTION_RIGHT = "right";
const DIRECTION_LEFT = "left";
const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";
const PX = "px";
const SCORE_SIZE = 70;

var width;
var height;
var blockSize;

VK.init(function() {
    // API initialization succeeded
}, function() {
    // API initialization failed
}, '5.60');

/* listen to swipes */
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("mousedown", handleTouchStart, false);
document.addEventListener("mouseup", handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(event) {
    xDown = event.clientX || (event.touches && event.touches[0].clientX);
    yDown = event.clientY || (event.touches && event.touches[0].clientY);
}

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }
    if (!!event.touches && event.touches.length > 1) {
        return;
    }

    var xUp = event.clientX || (event.touches && event.touches[0].clientX);
    var yUp = event.clientY || (event.touches && event.touches[0].clientY);

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    var direction = gameModule.getCurrentDirection();
    if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
        if (xDiff > 0) {
            /* LEFT swipe */
            if (gameModule.getCurrentDirection() !== DIRECTION_RIGHT) {
                direction = DIRECTION_LEFT;
            }
        } else {
            /* RIGHT swipe */
            if (gameModule.getCurrentDirection() !== DIRECTION_LEFT) {
                direction = DIRECTION_RIGHT;
            }
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            if (gameModule.getCurrentDirection() !== DIRECTION_DOWN) {
                direction = DIRECTION_UP;
            }
        } else {
            /* down swipe */
            if (gameModule.getCurrentDirection() !== DIRECTION_UP) {
                direction = DIRECTION_DOWN;
            }
        }
    }
    gameModule.setDirection(direction);

    xDown = null;
    yDown = null;
}

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

function startGame() {
    document.getElementById("startView").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";

    gameModule.start();
}

