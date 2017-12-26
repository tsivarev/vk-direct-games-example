var renderModule = (function () {
    const COLOR_SNAKE = "black";
    const COLOR_APPLE = "black";
    const COLOR_GAME_FIELD = "#a2d39c";
    const SNAKE_BLOCK_SIZE_OFFSET = 1;
    const DRAW_APPLE_COORDINATES_ADJUSTMENT = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    var drawSnakeBlock = function (x, y) {
        context.fillStyle = COLOR_SNAKE;
        context.fillRect(x * blockSize + SNAKE_BLOCK_SIZE_OFFSET, y * blockSize + SNAKE_BLOCK_SIZE_OFFSET,
            blockSize - 2 * SNAKE_BLOCK_SIZE_OFFSET, blockSize - 2 * SNAKE_BLOCK_SIZE_OFFSET);
    };

    var drawApple = function (x, y) {
        var radius = blockSize / 4;
        for (var i = 0; i < DRAW_APPLE_COORDINATES_ADJUSTMENT.length; i++) {
            context.beginPath();
            context.arc(x * blockSize + blockSize / 2 + radius * DRAW_APPLE_COORDINATES_ADJUSTMENT[i][0],
                y * blockSize + blockSize / 2 + radius * DRAW_APPLE_COORDINATES_ADJUSTMENT[i][1],
                radius / 2, 0, 2 * Math.PI, false);
            context.fillStyle = COLOR_APPLE;
            context.fill();
            context.stroke();
        }
    };

    var drawCleaningBlock = function (x, y) {
        context.fillStyle = COLOR_GAME_FIELD;
        context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    };

    var drawScore = function () {
        var scoreElement = document.getElementById("scoreLabel");
        scoreElement.style.display = "inline";
        scoreElement.style.fontSize = SCORE_SIZE + PX;
        scoreElement.style.marginLeft = (window.innerWidth - width) / 2 + PX;
        scoreElement.innerHTML = "SCORE: ";
    };

    var drawGameField = function () {
        context.fillStyle = COLOR_GAME_FIELD;
        context.fillRect(0, 0, width, height);
        canvas.style.marginLeft = (window.innerWidth - width) / 2 + PX;
    };

    var onCrashDisplayElements = function () {
        canvas.style.display = "none";

        document.getElementById("startView").style.display = "inline";
        document.getElementById("playButton").style.top = "50%";

        var gameOverLabel = document.getElementById("gameOverLabel");
        gameOverLabel.style.display = "block";

        var scoreLabelGameOver = document.getElementById("scoreLabelGameOver");
        scoreLabelGameOver.innerHTML = "SCORE: " + score;
        scoreLabelGameOver.style.display = "block";
    };

    return {
        drawSnakeBlock: drawSnakeBlock,
        drawApple: drawApple,
        drawCleaningBlock: drawCleaningBlock,
        drawScore: drawScore,
        drawGameField: drawGameField,
        onCrashDisplayElements: onCrashDisplayElements
    };
}());