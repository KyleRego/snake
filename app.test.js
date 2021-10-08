/**
 * @jest-environment jsdom
 */

const { test, expect } = require('@jest/globals');
const app = require('./app')

let snakeSegmentExample1 = {x:10, y:10, dir: "right"};
let snakeSegmentExample2 = {x:20, y:10, dir: "right"};
let snakeSegmentExample3 = {x:30, y:10, dir: "right"};
let snakeSegmentExample3b = {x:40, y:10, dir:"right"};
let snakeSegmentExample4 = {x:10, y:20, dir: "down"};
let snakeSegmentExample5 = {x:10, y:30, dir:"down"};
let snakeSegmentExample6 = {x:50, y:50, dir: "left"};
let snakeSegmentExample7 = {x:40, y:50, dir: "left"};
let snakeSegmentExample8 = {x:50, y:50, dir: "up"};
let snakeSegmentExample9 = {x:50, y:40, dir: "up"};

let snakeExample1 = [snakeSegmentExample3, snakeSegmentExample2, snakeSegmentExample1];
let snakeExample2 = [snakeSegmentExample3b, snakeSegmentExample3, snakeSegmentExample2];

let snakeExample3 = [ {x:40, y:40, dir:"right"}, {x:30, y:40, dir:"right"} ]
let snakeExample4 = [ {x:50, y:40, dir:"right"}, {x:40, y:40, dir:"right"} ]

test('moveSnake basic test', () => {
    expect(app.moveSnake(snakeExample1)).toStrictEqual(snakeExample2);
})

test('moveSnake basic test 2', () => {
    expect(app.moveSnake(snakeExample3)).toStrictEqual(snakeExample4);
})

test('moveSnakeSegment towards the right', () => {
    expect(app.moveSnakeSegment(snakeSegmentExample1)).toStrictEqual(snakeSegmentExample2);
})

test('moveSnakeSegment down', () => {
    expect(app.moveSnakeSegment(snakeSegmentExample4)).toStrictEqual(snakeSegmentExample5);
})

test('moveSnakeSegment towards the left', () => {
    expect(app.moveSnakeSegment(snakeSegmentExample6)).toStrictEqual(snakeSegmentExample7);
})

test('moveSnakeSegment up', () => {
    expect(app.moveSnakeSegment(snakeSegmentExample8)).toStrictEqual(snakeSegmentExample9);
})