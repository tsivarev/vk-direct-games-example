var drawModule = (function () {
    const COLOR_HEAD = "#5a76b5";
    const COLOR_BODY = "#a1b4dd";
    const COLOR_APPLE = "#ffcbcb";
    const COLOR_APPLE_BORDER = "#bf6969";
    const COLOR_GAME_FIELD = "#e8eaf2";
    const SNAKE_BLOCK_BORDER_WIDTH = 1;

    var drawSnakeBlock = function (x, y, type) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2,
            blockSize / 2 - 1.5, 0, 2 * Math.PI, false);
        if (type === SNAKE_BLOCK_TYPE_HEAD) {
            context.fillStyle = COLOR_HEAD;
        } else {
            context.fillStyle = COLOR_BODY;
        }
        context.fill();
        context.lineWidth = SNAKE_BLOCK_BORDER_WIDTH;
        context.strokeStyle = COLOR_HEAD;
        context.stroke();
    };

    var drawApple = function (x, y) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2,
            blockSize / 2 - 1.5, 0, 2 * Math.PI, false);
        context.fillStyle = COLOR_APPLE;
        context.fill();
        context.lineWidth = SNAKE_BLOCK_BORDER_WIDTH;
        context.strokeStyle = COLOR_APPLE_BORDER;
        context.stroke();
    };

    var drawBlock = function (x, y) {
        context.fillStyle = COLOR_GAME_FIELD;
        context.fillRect(x * blockSize - 1, y * blockSize - 1, blockSize + 2, blockSize + 2);
    };

    var drawScore = function (score) {
        var scoreElement = document.getElementById("scoreLabel");
        scoreElement.style.display = "inline";
        scoreElement.style.fontSize = SCORE_SIZE + PX;
        scoreElement.style.marginLeft = (window.innerWidth - width) / 2 + PX;
        scoreElement.innerHTML = "Score: " + score;
    };

    var drawGameField = function () {
        context.fillStyle = COLOR_GAME_FIELD;
        context.fillRect(0, 0, width, height);
    };

    return {
        drawSnakeBlock: drawSnakeBlock,
        drawApple: drawApple,
        drawBlock: drawBlock,
        drawScore: drawScore,
        drawGameField: drawGameField
    };
}());
