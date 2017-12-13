/* listen to swipes */
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    var dir = "right";
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            dir = "left";
        } else {
            /* right swipe */
            dir = "right";
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            dir = "up";
        } else {
            /* down swipe */
            dir = "down";
        }
    }
    /* reset values */
    drawModule.changeDirection(dir);
    xDown = null;
    yDown = null;
};

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
}
resizeCanvas();

function startGame() {
    document.getElementById('startView').style.display = "none";
    document.getElementById('gameCanvas').style.display = "block";

    drawModule.start();
}
