const DIRECTION_RIGHT = "right";
const DIRECTION_LEFT = "left";
const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";
const PX = "px";
const SCORE_SIZE = 70;

let width;
let height;
let blockSize;
let score;

VK.init(function() {
    // API initialization succeeded
}, function() {
    // API initialization failed
}, '5.69');

/* listen to swipes */
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("mousedown", handleTouchStart, false);
document.addEventListener("mouseup", handleTouchMove, false);

let xDown = null;
let yDown = null;

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

    let xUp = event.clientX || (event.touches && event.touches[0].clientX);
    let yUp = event.clientY || (event.touches && event.touches[0].clientY);

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    let direction = gameModule.getCurrentDirection();
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

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

function startGame() {
    document.getElementById("startView").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";

    gameModule.start();
}

