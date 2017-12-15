const RIGHT = "right";
const LEFT = "left";
const UP = "up";
const DOWN = "down";
const PX = "px";
const W_BLOCKS = 18;
const H_BLOCKS = 25;
const COLOR_HEAD = "#5a76b5";
const COLOR_BODY = "#a1b4dd";
const COLOR_APPLE = "#ffcbcb";
const COLOR_APPLE_BORDER = "#bf6969";
const COLOR_GAME_FIELD = "#e8eaf2";

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

    var direction = drawModule.getCurDirection();
    if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
        if (xDiff > 0) {
            /* LEFT swipe */
            if (drawModule.getCurDirection() !== RIGHT) {
                direction = LEFT;
            }
        } else {
            /* RIGHT swipe */
            if (drawModule.getCurDirection() !== LEFT) {
                direction = RIGHT;
            }
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            if (drawModule.getCurDirection() !== DOWN) {
                direction = UP;
            }
        } else {
            /* down swipe */
            if (drawModule.getCurDirection() !== UP) {
                direction = DOWN;
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

