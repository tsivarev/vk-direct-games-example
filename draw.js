var drawModule = (function() {
    /* game properties */
    const wBlocks = 18;
    const hBlocks = 30;
    var w;
    var h;
    var score;
    var blockSize;
    var snake;
    var apple;
    var direction;
    var curDirection;
    var oldScore;

    var updateProperties = function() {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        blockSize = Math.min(innerWidth / wBlocks, innerHeight / hBlocks);
        w = wBlocks * blockSize;
        h = hBlocks * blockSize;
        canvas.width = w;
        canvas.height = h;
        canvas.style.marginLeft = (innerWidth - w) / 2;
        canvas.style.marginTop = (innerHeight - h) / 2;
        // w = 800;
        // h = 800;
        score = 0;
        // blockSize = 40;
        snake = [];
        direction = "right";
        curDirection = direction;
    };

    var drawSnakeBlock = function(x, y, type) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2, blockSize / 2 - 1, 0, 2 * Math.PI, false);
        if (type === "head") {
            context.fillStyle = "blue";
        } else {
            context.fillStyle = "lightblue";
        }
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    };

    var drawApple = function(x, y) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2, blockSize / 2 - 1, 0, 2 * Math.PI, false);
        context.fillStyle = "yellow";
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#003300';
        context.stroke();
    };

    var drawScore = function() {
        // context.fillStyle = "white";
        // context.fillRect(w / 2 - 60, h + 10, 150, 30);
        var scoreText = "Score: " + oldScore;
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText(scoreText, w / 2 - 60, h + 35);

        var scoreText = "Score: " + score;
        context.fillStyle = "black";
        context.font = "30px Arial";
        context.fillText(scoreText, w / 2 - 60, h + 35);
    };

    var drawGame = function() {
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
            oldScore = score;
            gameloop = clearInterval(gameloop);
            return;
        }

        snake.unshift({x: snakeX, y: snakeY});
        if (snakeX === apple.x && snakeY === apple.y) {
            oldScore = score;
            score++;
            drawScore();
            generateApple();
        } else {
            var last = snake.pop();
            context.fillStyle = "lightgrey";
            context.fillRect(last.x * blockSize, last.y * blockSize, blockSize, blockSize);
        }
        drawSnakeBlock(snakeX, snakeY, "head");
        drawSnakeBlock(snake[1].x, snake[1].y, "body");
        curDirection = direction;

        drawApple(apple.x, apple.y);
    };

    var checkCrash = function(x, y) {
        for (var i in snake) {
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
    };

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

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

    var setDirection = function(dir) {
        direction = dir;
    };

    var getDirection = function() {
        return direction;
    };

    var getCurDirection = function() {
        return curDirection;
    };

    var start = function() {
        updateProperties();
        createSnake();
        generateApple();
        context.fillStyle = "lightgrey";
        context.fillRect(0, 0, w, h);
        drawScore();
        gameloop = setInterval(drawGame, 180);
    };

    return {
        start : start,
        setDirection: setDirection,
        getDirection: getDirection,
        drawGame: drawGame,
        getCurDirection: getCurDirection
    };
}());
