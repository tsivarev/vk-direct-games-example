var drawModule = (function() {
    /* game properties */
    var w = 800;
    var h = 800;
    var score = 0;
    var blockSize = 40;
    var snake = [];
    var apple;
    var direction = "right";

    var drawSnakeBlock = function(x, y) {
        context.fillStyle = "lightblue";
        context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        context.strokeStyle = "blue";
        context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    };

    var drawApple = function(x, y) {
        context.fillStyle = "black";
        context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        context.fillStyle = "yellow";
        context.fillRect(x * blockSize + 1, y * blockSize + 1, blockSize - 2, blockSize - 2);
    };

    var drawScore = function() {
        var scoreText = "Score: " + score;
        context.fillStyle = "black";
        context.fillText(score_text, 145, h - 5);
    };

    var drawGame = function() {
        context.fillStyle = "lightgrey";
        context.fillRect(0, 0, w, h);
        context.strokeStyle = "black";
        context.strokeRect(0, 0, w, h);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        switch(direction) {
            case "right":
                snakeX++;
                break;
            case "left":
                snakeX--;
                break;
            case "down":
                snakeY++;
                break;
            case "up":
                snakeY--;
                break;
        }

        if (snakeX === -1 || snakeY === -1 || snakeX * blockSize === w || snakeY * blockSize === h || checkCrash(snakeX, snakeY)) {
            gameloop = clearInterval(gameloop);
            return;
        }

        if (snakeX == apple.x && snakeY == apple.y) {
            score++;
            generateApple();
        } else {
            snake.pop();
        }
        snake.unshift({x: snakeX, y: snakeY});
        for (var i = 0; i < snake.length; i++) {
            drawSnakeBlock(snake[i].x, snake[i].y);
        }

        drawApple(apple.x, apple.y);
    };

    var checkCrash = function (x, y) {

    };

    var createSnake = function() {
        var length = 3;
        for (var i = length - 1; i >= 0; i--) {
            snake.push({x: i, y: 0});
        }
        console.log(snake);
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var generateApple = function () {
        apple = {
          x: getRandomInt(0, w / blockSize),
          y: getRandomInt(0, h / blockSize)
        };

        while(checkCrash(apple.x, apple.y)) {
            apple = {
                x: getRandomInt(0, w / blockSize),
                y: getRandomInt(0, h / blockSize)
            };
        }
    };

    var changeDirection = function(dir) {
        direction = dir;
    };

    var start = function() {
        createSnake();
        generateApple();
        gameloop = setInterval(drawGame, 320);
    };

    return {
        start : start,
        changeDirection: changeDirection
    };
}());
