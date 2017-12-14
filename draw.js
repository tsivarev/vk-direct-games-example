var drawModule = (function() {
    /* game properties */
    const wBlocks = 18;
    const hBlocks = 25;
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    var w;
    var h;
    var score;
    var scoreSize = 70;
    var blockSize;
    var snake;
    var apple;
    var direction;
    var curDirection;
    var oldScore;

    var updateProperties = function() {
        blockSize = Math.min(innerWidth / (wBlocks + 1), innerHeight / (hBlocks + 1));
        w = wBlocks * blockSize;
        h = hBlocks * blockSize;
        canvas.width = w;
        canvas.height = h;
        // scoreSize = (innerHeight - h) / 4;
        canvas.style.marginLeft = (innerWidth - w) / 2 + "px";
        canvas.style.marginTop = "15px";
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
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2, blockSize / 2 - 1.5, 0, 2 * Math.PI, false);
        if (type === "head") {
            context.fillStyle = "#5a76b5";
        } else {
            context.fillStyle = "#a1b4dd";
        }
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#5a76b5';
        context.stroke();
    };

    var drawApple = function(x, y) {
        context.beginPath();
        context.arc(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2, blockSize / 2 - 1.5, 0, 2 * Math.PI, false);
        context.fillStyle = "#ffcbcb";
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "#bf6969";
        context.stroke();
    };

    var drawScore = function() {
        var scoreEl = document.getElementById("scoreLabel");
        scoreEl.style.display = "inline";
        scoreEl.style.fontSize = (scoreSize) + "px";
        scoreEl.style.marginLeft = (innerWidth / 2 - scoreSize * 2.5) + "px";
        scoreEl.innerHTML = "Score: " + score;

        // var scoreText = "Score: " + oldScore;
        // context.fillStyle = "white";
        // context.font = "30px Arial";
        // context.fillText(scoreText, w / 2 - 60, h + 35);
        //
        // var scoreText = "Score: " + score;
        // context.fillStyle = "black";
        // context.font = "30px Arial";
        // context.fillText(scoreText, w / 2 - 60, h + 35);
    };

    var drawPauseButton = function() {
        var pauseButton = document.getElementById('pauseButton');
        pauseButton.style.display = "inline";
        pauseButton.style.marginRight = ((innerWidth - w) / 2 - 2) + "px";
        pauseButton.style.height = scoreSize * 1.5 + "px";
        pauseButton.style.width = scoreSize * 2.5 + "px";
        pauseButton.style.fontSize = scoreSize / 3 * 2 + "px";
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
            document.getElementById('gameCanvas').style.display = "none";
            document.getElementById('pauseButton').style.display = "block";
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
            context.fillStyle = "#e8eaf2";
            context.fillRect(last.x * blockSize - 1, last.y * blockSize - 1, blockSize + 2, blockSize + 2);
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

    var getCurDirection = function() {
        return curDirection;
    };

    var start = function() {
        updateProperties();
        createSnake();
        generateApple();
        context.fillStyle = "#e8eaf2";
        context.fillRect(0, 0, w, h);
        drawScore();
        drawPauseButton();
        gameloop = setInterval(drawGame, 180);
    };

    return {
        start : start,
        setDirection: setDirection,
        drawGame: drawGame,
        getCurDirection: getCurDirection
    };
}());
