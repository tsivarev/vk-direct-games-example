var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
}
resizeCanvas();

function startGame() {
    document.getElementById('startView').style.display = "none";
    document.getElementById('gameCanvas').style.display = "block";
}