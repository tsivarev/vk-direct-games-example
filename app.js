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

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            document.getElementById("gameCanvas").style.backgroundColor = "lightblue";
        } else {
            /* right swipe */
            document.getElementById("gameCanvas").style.backgroundColor = "red";
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            document.getElementById("gameCanvas").style.backgroundColor = "black";
        } else {
            /* down swipe */
            document.getElementById("gameCanvas").style.backgroundColor = "white";
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
}
resizeCanvas();

// if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');
//     // drawing code here
// } else {
//     // canvas-unsupported code here
// }

function startGame() {
    document.getElementById('startView').style.display = "none";
    document.getElementById('gameCanvas').style.display = "block";
}