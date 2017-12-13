var drawModule = (function() {
    /* game properties */
    var w;
    var h;
    var score;
    var blockSize;
    var snake;
    var apple;
    var direction;

    var updateProperties = function() {
        w = 900;
        h = 1500;
        // w = 400;
        // h = 400;
        score = 0;
        blockSize = 50;
        snake = [];
        direction = "right";
    };

    var drawSnakeBlock = function(x, y, type) {
        if (type === "head") {
            context.fillStyle = "blue";
        } else {
            context.fillStyle = "lightblue";
        }
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
        context.font = "30px Arial";
        context.fillText(scoreText, w / 2 - 60, h - 5);
    };

    var drawGame = function() {
        context.fillStyle = "lightgrey";
        context.fillRect(0, 0, w, h);
        context.strokeStyle = "black";
        context.strokeRect(0, 0, w, h);
        drawScore();

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

        if (snakeX === -1 || snakeY === -1 || snakeX * blockSize === w || snakeY * blockSize === h
            || checkCrash(snakeX, snakeY)) {
            document.getElementById('startView').style.display = "inline";
            document.getElementById('gameCanvas').style.display = "block";
            gameloop = clearInterval(gameloop);
            return;
        }

        if (snakeX === apple.x && snakeY === apple.y) {
            score++;
            drawScore();
            generateApple();
        } else {
            snake.pop();
        }
        snake.unshift({x: snakeX, y: snakeY});
        drawSnakeBlock(snake[0].x, snake[0].y, "head");
        for (var i = 1, len = snake.length; i < len; i++) {
            drawSnakeBlock(snake[i].x, snake[i].y, "body");
        }

        drawApple(apple.x, apple.y);
    };

    var checkCrash = function (x, y) {
        for (var i = 0, len = snake.length; i < len; i++) {
            if (snake[i].x === x && snake[i].y === y) {
                return true;
            }
        }
        return false;
    };

    var createSnake = function() {
        var length = 3;
        for (var i = length - 1; i >= 0; i--) {
            snake.push({x: i, y: 0});
        }
        console.log(snake);
    };

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var generateApple = function () {
        apple = {
          x: getRandomInt(0, w / blockSize),
          y: getRandomInt(0, h / blockSize)
        };
        console.log(" ");
        console.log(apple.x + " " + apple.y);
        console.log(snake);

        while(checkCrash(apple.x, apple.y)) {
            apple = {
                x: getRandomInt(0, w / blockSize),
                y: getRandomInt(0, h / blockSize)
            };
            console.log("collision: " + apple.x + " " + apple.y);
        }
    };

    var setDirection = function(dir) {
        direction = dir;
    };

    var getDirection = function() {
        return direction;
    };

    var start = function() {
        updateProperties();
        createSnake();
        generateApple();
        gameloop = setInterval(drawGame, 130);
    };

    return {
        start : start,
        setDirection: setDirection,
        getDirection: getDirection
    };
}());
