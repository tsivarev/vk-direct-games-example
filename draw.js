var drawModule = (function () {
    /* game properties */
    var w;
    var h;
    var score;
    var scoreSize = 70;
    var blockSize;
    var snake;
    var apple;
    var direction;
    /* direction on screen */
    var curDirection;

    var updateProperties = function () {
        blockSize = Math.min(innerWidth / (wBlocks + 1), innerHeight / (hBlocks + 1));
        w = wBlocks * blockSize;
        h = hBlocks * blockSize;
        canvas.width = w;
        canvas.height = h;
        canvas.style.marginLeft = (innerWidth - w) / 2 + px;
        score = 0;
        snake = [];
        direction = right;
        curDirection = direction;
    };

    var drawSnakeBlock = function (x, y, type) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2,
            blockSize / 2 - 1.5, 0, 2 * Math.PI, false);
        if (type === "head") {
            context.fillStyle = headColor;
        } else {
            context.fillStyle = bodyColor;
        }
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = headColor;
        context.stroke();
    };

    var drawApple = function (x, y) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2,
            blockSize / 2 - 1.5, 0, 2 * Math.PI, false);
        context.fillStyle = appleColor;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = appleBorderColor;
        context.stroke();
    };

    var drawScore = function () {
        var scoreEl = document.getElementById("scoreLabel");
        scoreEl.style.display = "inline";
        scoreEl.style.fontSize = (scoreSize) + px;
        scoreEl.style.marginLeft = (innerWidth / 2 - scoreSize * 2.85) + px;
        scoreEl.innerHTML = "Score: " + score;
    };

    var drawGame = function () {
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        switch (direction) {
            case right:
                snakeX++;
                break;
            case left:
                snakeX--;
                break;
            case down:
                snakeY++;
                break;
            case up:
                snakeY--;
                break;
        }

        if (snakeX === -1 || snakeY === -1 || snakeX * blockSize === w || snakeY * blockSize === h
            || checkCrash(snakeX, snakeY)) {
            document.getElementById("startView").style.display = "inline";
            canvas.style.display = "none";
            gameloop = clearInterval(gameloop);
            return;
        }

        snake.unshift({x: snakeX, y: snakeY});

        if (snakeX === apple.x && snakeY === apple.y) {
            score++;
            drawScore();
            generateApple();
        } else {
            var last = snake.pop();
            context.fillStyle = gameFieldColor;
            context.fillRect(last.x * blockSize - 1, last.y * blockSize - 1, blockSize + 2, blockSize + 2);
        }

        drawSnakeBlock(snakeX, snakeY, "head");
        drawSnakeBlock(snake[1].x, snake[1].y, "body");
        curDirection = direction;

        drawApple(apple.x, apple.y);
    };

    var checkCrash = function (x, y) {
        for (var i in snake) {
            if (snake[i].x === x && snake[i].y === y) {
                return true;
            }
        }
        return false;
    };

    var createSnake = function () {
        var length = 3;
        for (var i = length - 1; i >= 0; i--) {
            snake.push({x: i, y: 0});
        }
    };

    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var generateApple = function () {
        apple = {
            x: getRandomInt(0, w / blockSize),
            y: getRandomInt(0, h / blockSize)
        };

        while (checkCrash(apple.x, apple.y)) {
            apple = {
                x: getRandomInt(0, w / blockSize),
                y: getRandomInt(0, h / blockSize)
            };
        }
    };

    var setDirection = function (dir) {
        direction = dir;
    };

    var getCurDirection = function () {
        return curDirection;
    };

    var start = function () {
        updateProperties();
        createSnake();
        generateApple();
        context.fillStyle = gameFieldColor;
        context.fillRect(0, 0, w, h);
        drawScore();
        gameloop = setInterval(drawGame, 180);
    };

    return {
        start: start,
        setDirection: setDirection,
        getCurDirection: getCurDirection
    };
}());
