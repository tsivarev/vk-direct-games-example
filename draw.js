var drawModule = (function () {
    /* game properties */
    var w;
    var h;
    var score;
    var scoreSize = 50;
    var blockSize;
    var snake;
    var apple;
    var direction;
    /* direction on screen */
    var curDirection;

    var updateProperties = function () {
        blockSize = Math.min(window.innerWidth / (W_BLOCKS + 1), window.innerHeight / (H_BLOCKS + 1));
        w = W_BLOCKS * blockSize;
        h = H_BLOCKS * blockSize;
        canvas.width = w;
        canvas.height = h;
        canvas.style.marginLeft = (window.innerWidth - w) / 2 + PX;
        score = 0;
        snake = [];
        direction = RIGHT;
        curDirection = direction;
    };

    var drawSnakeBlock = function (x, y) {
        context.fillStyle = COLOR_SNAKE;
        context.fillRect(x * blockSize + 1, y * blockSize + 1, blockSize - 2, blockSize - 2);
    };

    var drawApple = function (x, y) {
        var radius = blockSize / 4;
        var drawApple = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (var i = 0; i < drawApple.length; i++) {
            context.beginPath();
            context.arc(x * blockSize + blockSize / 2 + radius * drawApple[i][0],
                y * blockSize + blockSize / 2 + radius * drawApple[i][1],
                radius / 2, 0, 2 * Math.PI, false);
            context.fillStyle = COLOR_APPLE;
            context.fill();
            context.stroke();
        }
    };

    var drawScore = function () {
        var scoreEl = document.getElementById("scoreLabel");
        scoreEl.style.display = "inline";
        scoreEl.style.fontSize = scoreSize + PX;
        scoreEl.style.marginLeft = (window.innerWidth - w) / 2 + PX;
        scoreEl.innerHTML = "SCORE: " + score;
    };

    var drawGame = function () {
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        switch (direction) {
            case RIGHT:
                snakeX++;
                break;
            case LEFT:
                snakeX--;
                break;
            case DOWN:
                snakeY++;
                break;
            case UP:
                snakeY--;
                break;
        }

        if (snakeX === -1 || snakeY === -1 || (snakeX * blockSize) === w || (snakeY * blockSize) === h
            || checkCrash(snakeX, snakeY)) {
            onCrashDisplayElements();
            saveResult();
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
            context.fillStyle = COLOR_GAME_FIELD;
            context.fillRect(last.x * blockSize - 1, last.y * blockSize - 1, blockSize + 2, blockSize + 2);
        }

        drawSnakeBlock(snakeX, snakeY);
        drawSnakeBlock(snake[1].x, snake[1].y);
        curDirection = direction;

        drawApple(apple.x, apple.y);
    };

    function createRequest(method, url) {
        var xmlHttpRequest = new XMLHttpRequest();
        if ("withCredentials" in xmlHttpRequest) {
            xmlHttpRequest.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined") {
            xmlHttpRequest = new XDomainRequest();
            xmlHttpRequest.open(method, url);
        } else {
            xmlHttpRequest = null;
        }
        return xmlHttpRequest;
    }

    var saveResult = function () {
        // const urlAddress = "https://api.vk.com/method/secure.addAppEvent?activity_id=2&value=" + score +
        //     "&access_token=9371463093714630937146306093114c729937193714630c95f1f115b89926b31f1188a&v=5.69";
        // var xmlHttp = createRequest("GET", urlAddress);
        // xmlHttp.onload = function() {
        //     alert("score " + score + " was saved");
        // };
        // xmlHttp.onerror = function(e) {
        //     alert("error while saving result");
        // };
        // xmlHttp.send();

        // VK.callMethod("showLeaderboardBox", score);
        VK.callMethod("showShareBox", score + " очков в игре Snake! Присоединяйся!",
            [{"type": "link", "link": gameLink}, {"type": "photo", "photo": {
                    "id": 386237065,
                    "album_id": 0,
                    "owner_id": 20458730}}],
            "wall");
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
        context.fillStyle = COLOR_GAME_FIELD;
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
