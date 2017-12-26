var gameModule = (function () {
    const WIDTH_BLOCKS = 18;
    const HEIGHT_BLOCKS = 25;
    const GAME_INTERVAL = 180;
    const LENGTH = 3;
    const APP_URL = "https://vk.com/app6294082";
    const APP_SHARE_PHOTO_LINK = "photo-157932916_456239017";

    /* game properties */
    var snake;
    var apple;
    var direction;
    /* direction on screen */
    var currentDirection;

    var updateProperties = function () {
        blockSize = Math.min(window.innerWidth / (WIDTH_BLOCKS + 1),
            (window.innerHeight - SCORE_SIZE) / (HEIGHT_BLOCKS + 1));
        width = WIDTH_BLOCKS * blockSize;
        height = HEIGHT_BLOCKS * blockSize;
        canvas.width = width;
        canvas.height = height;
        score = 0;
        snake = [];
        direction = DIRECTION_RIGHT;
        currentDirection = direction;
    };

    var game = function () {
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        switch (direction) {
            case DIRECTION_RIGHT:
                snakeX++;
                break;
            case DIRECTION_LEFT:
                snakeX--;
                break;
            case DIRECTION_DOWN:
                snakeY++;
                break;
            case DIRECTION_UP:
                snakeY--;
                break;
        }

        if (snakeX === -1 || snakeY === -1 || (snakeX * blockSize) === width || (snakeY * blockSize) === height
            || checkCrash(snakeX, snakeY)) {
            renderModule.onCrashDisplayElements();
            saveResult();
            gameloop = clearInterval(gameloop);
            return;
        }

        snake.unshift({x: snakeX, y: snakeY});

        if (snakeX === apple.x && snakeY === apple.y) {
            score++;
            renderModule.drawScore();
            generateApple();
        } else {
            var last = snake.pop();
            renderModule.drawCleaningBlock(last.x, last.y);
        }

        renderModule.drawSnakeBlock(snakeX, snakeY);
        renderModule.drawSnakeBlock(snake[1].x, snake[1].y);
        currentDirection = direction;

        renderModule.drawApple(apple.x, apple.y);
    };

    var saveResult = function () {
        VK.callMethod("showShareBox", APP_URL, APP_SHARE_PHOTO_LINK, "im");
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
        for (var i = LENGTH - 1; i >= 0; i--) {
            snake.push({x: i, y: 0});
        }
    };

    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var generateApple = function () {
        apple = {
            x: getRandomInt(0, width / blockSize),
            y: getRandomInt(0, height / blockSize)
        };

        while (checkCrash(apple.x, apple.y)) {
            apple = {
                x: getRandomInt(0, width / blockSize),
                y: getRandomInt(0, height / blockSize)
            };
        }
    };

    var setDirection = function (newDirection) {
        direction = newDirection;
    };

    var getCurrentDirection = function () {
        return currentDirection;
    };

    var start = function () {
        updateProperties();
        createSnake();
        generateApple();
        renderModule.drawGameField();
        renderModule.drawScore();
        gameloop = setInterval(game, GAME_INTERVAL);
    };

    return {
        start: start,
        setDirection: setDirection,
        getCurrentDirection: getCurrentDirection
    };
}());
