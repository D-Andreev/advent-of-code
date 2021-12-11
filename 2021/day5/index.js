const {readInput} = require('../helpers');
const assert = require('assert');

const input = readInput('./input.txt');

function partOne() {
  const linesOfVents = parseLines();
  const board = createBoard(linesOfVents);
  let numberOfPointsWithOverlappingLines = 0;
  markLines(linesOfVents, board);
  for (let i = 0; i < board.length; i++) {
    const boardElement = board[i];
    for (let j = 0; j < boardElement.length; j++) {
      if (boardElement[j] >= 2) numberOfPointsWithOverlappingLines++;
    }
  }

  return numberOfPointsWithOverlappingLines;
}

function parseLines(includeDiagonal = false) {
  const linesOfVents = [];
  for (let i = 0; i < input.length; i++) {
    const coords = input[i].split(' -> ');
    const startOfLine = coords[0].split(',');
    const endOfLine = coords[1].split(',');
    if (!includeDiagonal && startOfLine[0] !== endOfLine[0] && startOfLine[1] !== endOfLine[1]) {
      continue;
    }
    linesOfVents.push({
      x1: parseInt(startOfLine[0]),
      y1: parseInt(startOfLine[1]),
      x2: parseInt(endOfLine[0]),
      y2: parseInt(endOfLine[1])
    });
  }
  return linesOfVents;
}

function createBoard(linesOfVents) {
  const maxX = getMaxCoord(linesOfVents, 'x1', 'x2');
  const maxY = getMaxCoord(linesOfVents, 'y1', 'y2');
  const board = [];
  for (let i = 0; i <= maxX; i++) {
    board.push([]);
    for (let j = 0; j <= maxY; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}

function getMaxCoord(linesOfVents, startCoord, endCoord) {
  let maxCoord = 0;
  for (let i = 0; i < linesOfVents.length; i++) {
    const inputElement = linesOfVents[i];
    const maxOfXCoords = Math.max(inputElement[startCoord], inputElement[endCoord]);
    if (maxOfXCoords > maxCoord) maxCoord = maxOfXCoords;
  }
  return maxCoord;
}

function markLines(linesOfVents, board) {
  for (let i = 0; i < linesOfVents.length; i++) {
    const line = linesOfVents[i];
    const minX = Math.min(line.x1, line.x2);
    const minY = Math.min(line.y1, line.y2);
    const maxX = Math.max(line.x1, line.x2);
    const maxY = Math.max(line.y1, line.y2);

    if (line.x1 === line.x2) {
      markVerticalLine(board, line, minY, maxY);
    } else if (line.y1 === line.y2) {
      markHorizontalLine(board, line, minX, maxX);
    } else {
      markDiagonal(board, line, maxX, minX, maxY, minY);
    }
  }
}

function markVerticalLine(board, line, minY, maxY) {
  for (let j = minY; j <= maxY; j++) {
    if (j >= board.length) continue;
    board[j][line.x1]++;
  }
}

function markHorizontalLine(board, line, minX, maxX) {
  for (let j = minX; j <= maxX; j++) {
    if (j >= board[0].length) continue;
    board[line.y1][j]++;
  }
}

function markDiagonal(board, line, maxX, minX, maxY, minY) {
  if (line.x1 > line.x2) {
    for (let i = maxY - minY; i >= 0; i--) {
      board[maxY--][minX++]++;
    }
  } else {
    for (let i = maxY - minY; i >= 0; i--) {
      board[maxY--][maxX--]++;
    }
  }
}

function partTwo() {
  const linesOfVents = parseLines(true);
  const board = createBoard(linesOfVents);

  let numberOfPointsWithOverlappingLines = 0;
  markLines(linesOfVents, board);
  for (let i = 0; i < board.length; i++) {
    const boardElement = board[i];
    for (let j = 0; j < boardElement.length; j++) {
      if (boardElement[j] >= 2) numberOfPointsWithOverlappingLines++;
    }
  }

  return numberOfPointsWithOverlappingLines;
}

assert.equal(partOne(), 8060);
assert.equal(partTwo(), 21644); // TODO: Diagonal lines dont work
