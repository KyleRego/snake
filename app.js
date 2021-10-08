// A SnakeSegment is an Object:
// {x: Number, y: Number, dir: Direction}
// Direction is one of: "up", "down", "left", or "right"
// represents one segment of a snake

// A Snake is an Array of SnakeSegments

const SNAKESEGMENTSIZE = 10;

let snakeGame = document.getElementById("snake-game");

// SnakeSegment -> 
// renders the snake segment as a div in the HTML
function renderSnakeSegment(snakeSegment){
    let newSnakeSegment = document.createElement("div");
    newSnakeSegment.style.position = "absolute";
    newSnakeSegment.style.width = `${SNAKESEGMENTSIZE}px`;
    newSnakeSegment.style.height = `${SNAKESEGMENTSIZE}px`;
    newSnakeSegment.style.left = `${snakeSegment.x}px`;
    newSnakeSegment.style.top = `${snakeSegment.y}px`;
    newSnakeSegment.style.backgroundColor = "lightgreen";
    snakeGame.appendChild(newSnakeSegment);
}

// Snake ->
// renders the entire snake in the HTML
function renderSnake(snake){
    while (snakeGame.firstChild) {
        snakeGame.removeChild(snakeGame.firstChild);
    }
    snake.forEach(renderSnakeSegment);

}
// ->
// displays the game over message in the HTML
function displayGameOver(){
    let gameOverMessage = document.createElement("div");
    gameOverMessage.style.position = "relative";
    gameOverMessage.style.top = "350px"
    gameOverMessage.style.left = "250px"
    gameOverMessage.textContent = "Game Over!";
    gameOverMessage.style.fontSize = "24px";
    gameOverMessage.style.color = "red";
    snakeGame.appendChild(gameOverMessage);

}

// SnakeSegment -> SnakeSegment
// moves the snake segment according to its direction
// a distance of one SNAKESEGMENTSIZE
function moveSnakeSegment(snakeSegment){
    let oldx = snakeSegment.x
    let oldy = snakeSegment.y
    switch (snakeSegment.dir) {
        case 'up':
            snakeSegment.y = oldy - SNAKESEGMENTSIZE;
            break;
        case 'down':
            snakeSegment.y = oldy + SNAKESEGMENTSIZE;
            break;
        case 'left':
            snakeSegment.x = oldx - SNAKESEGMENTSIZE;
            break;
        case 'right':
            snakeSegment.x = oldx + SNAKESEGMENTSIZE;
            break;
    }
    return snakeSegment;
}

// Snake -> Snake
// adds a new segment onto the beginning of the snake,
// the new segment being the first segment moved once forward,
// and removes the last segment of the snake to make a new snake
function moveSnake(snake){
    const firstSegment = JSON.parse(JSON.stringify(snake[0]))
    const movedFirstSegment = moveSnakeSegment(firstSegment);
    snake.unshift(movedFirstSegment);
    snake.pop();
    return snake;
}

// Snake -> Boolean
// returns true if the snake hits itself or a wall
// otherwise returns false
function gameOver(snake){
    let firstSegment = snake[0];
    x = firstSegment.x;
    y = firstSegment.y;
    let overBorderX = (x >= 400) || (x <= -10);
    let overBorderY = (y >= 400) || (y <= -10);
    let snakeOverItself = overItself(snake);
    return snakeOverItself || overBorderX || overBorderY ;
}

// Snake -> Boolean
// returns true if the snake's head is on top of the snake
// otherwise returns false
function overItself(snake){
    let firstSegment = snake[0];
    for (const snakeSegment of snake.slice(1)){
        if (snakeSegmentEquals(snakeSegment, firstSegment)){
            return true;
        }
    }
    return false;
}

// SnakeSegment SnakeSegment -> Boolean
// returns true if two snake segments occupy the same position
function snakeSegmentEquals(snakeSegment1, snakeSegment2){
    let xEquals = snakeSegment1.x === snakeSegment2.x;
    let yEquals = snakeSegment1.y === snakeSegment2.y;
    return xEquals && yEquals;
}

function main(snake){
    document.addEventListener('keydown', function(key){
        let keyValue = key.key;
        switch(keyValue){
            case 'ArrowUp':
                snake[0].dir = "up";
                break;
            case 'ArrowDown':
                snake[0].dir = "down";
                break;
            case 'ArrowLeft':
                snake[0].dir = "left";
                break;
            case 'ArrowRight':
                snake[0].dir = "right";
                break;
        }});
    intervalID = setInterval( function() {
        renderSnake(snake);
        snake = moveSnake(snake);
        if (gameOver(snake)){
            clearInterval(intervalID);
            displayGameOver();
        }
    }, 100)
}

let mainSnake = [ {x:40, y:40, dir:"right"}, {x:30, y:40, dir:"right"}, {x:20, y:40, dir:"right"} ]
main(mainSnake);

try {
exports.moveSnakeSegment = moveSnakeSegment
exports.moveSnake = moveSnake
exports.overItself = overItself
exports.snakeSegmentEquals = snakeSegmentEquals
} catch {
    console.log("exports is not defined when run in the browser")
}