/**
 * @jest-environment jsdom
 */

const { test, expect } = require('@jest/globals');
const app = require('./app')

let snakeSegmentExample1 = {x:10, y:10, dir: "right"};
let snakeSegmentExample2 = {x:20, y:10, dir: "right"};
let snakeSegmentExample3 = {x:10, y:20, dir: "down"};
let snakeSegmentExample4 = {x:10, y:30, dir:"down"};
let snakeSegmentExample5 = {x:50, y:50, dir: "left"};
let snakeSegmentExample6 = {x:40, y:50, dir: "left"};
let snakeSegmentExample7 = {x:50, y:50, dir: "up"};
let snakeSegmentExample8 = {x:50, y:40, dir: "up"};

test('moveSnakeSegment towards the right', () => {
    expect(app.moveSnakeSegment(snakeSegmentExample1)).toStrictEqual(snakeSegmentExample2);
})

test('moveSnakeSegment down', () => {
    expect(app.moveSnakeSegment(snakeSegmentExample3)).toStrictEqual(snakeSegmentExample4);
})

test('moveSnakeSegment towards the left', () => {
    expect(app.moveSnakeSegment(snakeSegmentExample5)).toStrictEqual(snakeSegmentExample6);
})

test('moveSnakeSegment up', () => {
    expect(app.moveSnakeSegment(snakeSegmentExample7)).toStrictEqual(snakeSegmentExample8);
})

let snakeEx1 = [ {x:10, y:20, dir:"right"}, {x:20, y: 20, dir:"left"}, {x:30, y:20, dir:"left"}];
let snakeEx2 = [ {x:20, y:20, dir:"right"}, {x:10, y:20, dir:"right"}, {x:20, y:20, dir:"left"}];

test('moveSnake basic test 1', () => {
    expect(app.moveSnake(snakeEx1)).toStrictEqual(snakeEx2);
})

let snakeSegEx1 = {x:10, y:10, dir: "right"};
let snakeSegEx2 = {x:20, y:10, dir: "right"};
let snakeSegEx3 = {x:10, y:20, dir: "left"};
let snakeSegEx4 = {x:20, y:10, dir: "left"}

test('snakeSegmentEquals basic test 1', () => {
    expect(app.snakeSegmentEquals(snakeSegEx1, snakeSegEx2)).toBe(false);
})

test('snakeSegmentEquals basic test 2', () => {
    expect(app.snakeSegmentEquals(snakeSegEx1, snakeSegEx1)).toBe(true);
})

test('snakeSegmentEquals basic test 3', () => {
    expect(app.snakeSegmentEquals(snakeSegEx1, snakeSegEx3)).toBe(false);
})

test('snakeSegmentEquals basic test 4', () => {
    expect(app.snakeSegmentEquals(snakeSegEx2, snakeSegEx4)).toBe(true);
})

let snakeEx3 = [ {x:20, y:20, dir:"right"}, {x:10, y:20, dir:"right"}, {x:20, y:20, dir:"left"}];

test('overItself basic test 1', () => {
    expect(app.overItself(snakeEx3)).toBe(true);
})
