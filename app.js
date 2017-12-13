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

    var dir = drawModule.getDirection();
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            if (dir !== "right") {
                dir = "left";
            }
        } else {
            /* right swipe */
            if (dir !== "left") {
                dir = "right";
            }
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            if (dir !== "down") {
                dir = "up";
            }
        } else {
            /* down swipe */
            if (dir !== "up") {
                dir = "down";
            }
        }
    }
    /* reset values */
    drawModule.setDirection(dir);
    xDown = null;
    yDown = null;
}




// document.onkeydown = function(event) {
//
//     keyCode = window.event.keyCode;
//     keyCode = event.keyCode;
//
//     var direction = drawModule.getDirection();
//     switch(keyCode) {
//
//         case 37:
//             if (direction != 'right') {
//                 direction = 'left';
//             }
//             break;
//
//         case 39:
//             if (direction != 'left') {
//                 direction = 'right';
//             }
//             break;
//
//         case 38:
//             if (direction != 'down') {
//                 direction = 'up';
//             }
//             break;
//
//         case 40:
//             if (direction != 'up') {
//                 direction = 'down';
//             }
//             break;
//     }
//     drawModule.setDirection(direction);
// };





var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    // canvas.width = window.innerWidth / 5 * 4;
    // canvas.height = window.innerHeight / 4 * 3;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

function startGame() {
    document.getElementById('startView').style.display = "none";
    document.getElementById('gameCanvas').style.display = "block";

    drawModule.start();
}
