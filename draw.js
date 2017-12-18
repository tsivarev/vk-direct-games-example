var drawModule = (function () {
    var drawSnakeBlock = function (x, y, type) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2,
            blockSize / 2 - 1.5, 0, 2 * Math.PI, false);
        if (type === HEAD) {
            context.fillStyle = COLOR_HEAD;
        } else {
            context.fillStyle = COLOR_BODY;
        }
        context.fill();
        context.lineWidth = LINE_WIDTH;
        context.strokeStyle = COLOR_HEAD;
        context.stroke();
    };

    var drawApple = function (x, y) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2,
            blockSize / 2 - 1.5, 0, 2 * Math.PI, false);
        context.fillStyle = COLOR_APPLE;
        context.fill();
        context.lineWidth = LINE_WIDTH;
        context.strokeStyle = COLOR_APPLE_BORDER;
        context.stroke();
    };

    var drawScore = function () {
        var scoreElement = document.getElementById("scoreLabel");
        scoreElement.style.display = "inline";
        scoreElement.style.fontSize = scoreSize + PX;
        scoreElement.style.marginLeft = (window.innerWidth - width) / 2 + PX;
        scoreElement.innerHTML = "Score: " + score;
    };

    return {
        drawSnakeBlock: drawSnakeBlock,
        drawApple: drawApple,
        drawScore: drawScore
    };
}());
