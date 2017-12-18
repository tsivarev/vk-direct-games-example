/* game properties */
const DIRECTION_RIGHT = "right";
const DIRECTION_LEFT = "left";
const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";
const PX = "px";
const WIDTH_BLOCKS = 18;
const HEIGHT_BLOCKS = 25;
const COLOR_HEAD = "#5a76b5";
const COLOR_BODY = "#a1b4dd";
const COLOR_APPLE = "#ffcbcb";
const COLOR_APPLE_BORDER = "#bf6969";
const COLOR_GAME_FIELD = "#e8eaf2";
const HEAD = "head";
const BODY = "body";
const LINE_WIDTH = 1;
const GAME_INTERVAL = 180;
var width;
var height;
var score;
var scoreSize = 70;
var blockSize;
var snake;
var apple;
var direction;
/* direction on screen */
var currentDirection;

/* listen to swipes */
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(event) {
    xDown = event.touches[0].clientX;
    yDown = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = event.touches[0].clientX;
    var yUp = event.touches[0].clientY;

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

