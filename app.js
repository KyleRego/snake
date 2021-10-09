// A SnakeSegment is an Object:
// {x: Number, y: Number, dir: Direction}
// Direction is one of: "up", "down", "left", or "right"
// represents one segment of a snake

// A Food is an Object:
// {x: Number, y: Number}
// represents a food that when the head of the snake goes over
// the snake will grow one unit from its tail

// A Snake is an Array of SnakeSegments

// SNAKEGAMESIZE/SNAKESEGMENTSIZE should be a whole number
const SNAKESEGMENTSIZE = 40;
const SNAKEGAMESIZE = 400;

// set up the div which is the container for the snake and foods
// this is done to avoid getElementById returning null when
// running tests with Jest
// returns the snakeGame object so that the rest of the program has access
function setUpSnakeGame(){
    let snakeGame = document.createElement("div");
    snakeGame.style.position = "relative";
    snakeGame.style.margin = "auto";
    snakeGame.style.backgroundColor = "black";
    snakeGame.style.width = `${SNAKEGAMESIZE}px`;
    snakeGame.style.height = `${SNAKEGAMESIZE}px`;
    document.body.appendChild(snakeGame);

    return snakeGame;
}

// displays the game over message in the HTML
// also displays a reset button which when clicked, resets the game
function displayGameOver(){
    let gameOverMessage = document.createElement("div");
    gameOverMessage.style.position = "relative";
    gameOverMessage.style.top = "350px"
    gameOverMessage.style.left = "250px"
    gameOverMessage.textContent = "Game Over!";
    gameOverMessage.style.fontSize = "24px";
    gameOverMessage.style.color = "red";
    snakeGame.appendChild(gameOverMessage);

    let buttonContainer = document.createElement("div");
    buttonContainer.id = "button-container";
    buttonContainer.style.textAlign = "center";
    buttonContainer.style.padding = "1rem"
    snakeGame.insertAdjacentElement('afterend', buttonContainer);

    let resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    resetButton.style.margin = "auto";
    resetButton.type = "button";
    buttonContainer.appendChild(resetButton);

    resetButton.onclick = function(){
        document.body.removeChild(snakeGame);
        document.body.removeChild(buttonContainer);
        let mainSnake = [ {x:40, y:40, dir:"right"}, {x:30, y:40, dir:"right"}, {x:20, y:40, dir:"right"} ]
        main(mainSnake);
    }
}

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
    newSnakeSegment.classList.add("snake-segment");
    snakeGame.appendChild(newSnakeSegment);
}

// Snake ->
// renders the entire snake in the HTML
function renderSnake(snake){
    let snakeSegments = document.querySelectorAll(".snake-segment");
    for (let snakeSegment of snakeSegments){
        snakeGame.removeChild(snakeSegment);
    }
    
    snake.forEach(renderSnakeSegment);
}

// Food ->
// renders the food in the HTML
function renderFood(food){
    let x = food.x;
    let y = food.y;
    let newFood = document.createElement("div");
    newFood.style.position = "absolute";
    newFood.style.width = `${SNAKESEGMENTSIZE}px`;
    newFood.style.height = `${SNAKESEGMENTSIZE}px`;
    newFood.style.top = `${y}px`;
    newFood.style.left = `${x}px`;
    newFood.style.backgroundColor = "pink";
    newFood.classList.add("food");
    snakeGame.appendChild(newFood);
}

// unrenders the current food in the HTML
function unrenderFood(){
    foodToRemove = document.querySelector(".food");
    snakeGame.removeChild(foodToRemove);
}

// -> Food
// generates a Food Object at a random position
// and returns the food
function generateFood(){
    let foodx = Math.floor(Math.random()*SNAKEGAMESIZE/SNAKESEGMENTSIZE)*SNAKESEGMENTSIZE;
    let foody = Math.floor(Math.random()*SNAKEGAMESIZE/SNAKESEGMENTSIZE)*SNAKESEGMENTSIZE;
    let food = {x: foodx, y: foody};
    return food;
    
}

// Snake Food -> Boolean
// returns true if the head of the snake 
// is over the food
function snakeOverFood(snake, food){
    let firstSegment = snake[0]
    let overX = firstSegment.x === food.x;
    let overY = firstSegment.y === food.y;
    return overX && overY;
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
// grows the snakes tail by one snake segment
function growSnakeTail(snake){
    let lastSegment = snake[snake.length-1];
    let newSegment = {};
    switch (lastSegment.dir){
        case 'up':
            newSegment = moveSnakeSegment(
                {x:lastSegment.x, y:lastSegment.y, dir:"down"}
            );
            break;
        case 'down':
            newSegment = moveSnakeSegment(
                {x:lastSegment.x, y:lastSegment.y, dir:"up"}
            );
            break;
        case 'left':
            newSegment = moveSnakeSegment(
                {x:lastSegment.x, y:lastSegment.y, dir:"right"}
            );
            break;
        case 'right':
            newSegment = moveSnakeSegment(
                {x:lastSegment.x, y:lastSegment.y, dir:"left"}
            );
            break;
    }
    snake.push(newSegment);
    return snake;

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
    let overBorderX = (x >= SNAKEGAMESIZE) || (x <= -10);
    let overBorderY = (y >= SNAKEGAMESIZE) || (y <= -10);
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
    snakeGame = setUpSnakeGame();
    food = generateFood();
    renderFood(food);
    
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

        if (snakeOverFood(snake, food)){
            unrenderFood();
            snake = growSnakeTail(snake);
            food = generateFood();
            renderFood(food);
        }

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
exports.snakeOverFood = snakeOverFood
} catch {
    //
}