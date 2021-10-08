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
// returns false if the snake hits itself or a wall
function gameOver(snake){
    let firstSegment = snake[0];
    x = firstSegment.x;
    y = firstSegment.y;
    let overBorder = (x >= 400) || (x <= 0);
    return overBorder;
}

// Snake -> Snake
// sets up a key event handler which changes the direction
// of the first snake segment according to the arrow key pressed
function addKeyHandler(snake){
    document.addEventListener('keydown', function(key){
        let keyValue = key.key;
        let firstSegment = snake[0]
        switch(keyValue){
            case 'ArrowUp':
                firstSegment.dir = "up";
                break;
            case 'ArrowDown':
                firstSegment.dir = "down";
                break;
            case 'ArrowLeft':
                firstSegment.dir = "left";
                break;
            case 'ArrowRight':
                firstSegment.dir = "right";
                break;
        }
        snake[0] = firstSegment;
    })
    return snake;
}


console.log(moveSnake([ {x:40, y:40, dir:"right"}, {x:30, y:40, dir:"right"} ]))

let mainSnake = [ {x:40, y:40, dir:"right"}, {x:30, y:40, dir:"right"} ]

function main(snake){
    setInterval( function() {
        renderSnake(snake);
        snake = addKeyHandler(snake);
        snake = moveSnake(snake);
        
    }, 1000)
}

main(mainSnake);

try {
exports.moveSnakeSegment = moveSnakeSegment
exports.moveSnake = moveSnake
} catch {
    console.log("exports is not defined when run in the browser")
}