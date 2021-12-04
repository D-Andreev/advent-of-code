const {readInput} = require('../helpers');
const assert = require('assert');

const input = readInput('./input.txt');

function partOne() {
  const numbers = input[0].split(',').map(n => parseInt(n));
  const boards = generateBoards();

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    for (let j = 0; j < boards.length; j++) {
      markNumber(boards[j], n);
      if (boardHasBingo(boards[j])) {
        const unmarkedSum = getUnmarkedSum(boards[j]);
        return unmarkedSum * n;
      }
    }
  }

  return false;
}

function generateBoards() {
  const boards = [];
  let currentRow = 2;
  let currentBoard = 0;
  while (currentRow < input.length) {
    if (!boards[currentBoard]) {
      boards[currentBoard] = [];
    }
    for (let i = 0; i < 5; i++) {
      boards[currentBoard][i] = parseRow(input[currentRow++]);
    }
    currentRow++;
    currentBoard++;
  }
  return boards;
}

function markNumber(board, n) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].n === n) board[i][j].marked = true;
    }
  }
}

function parseRow(row) {
  return row
    .split(' ')
    .map(n => parseInt(n))
    .filter(n => !isNaN(n))
    .map(n => ({n, marked: false}));
}

function boardHasBingo(board) {
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    let markedCount = 0;
    for (let j = 0; j < row.length; j++) {
      if (row[j].marked) markedCount++;
    }
    if (markedCount === row.length) return true;
  }
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    let markedCount = 0;
    for (let j = 0; j < board.length; j++) {
      if (board[j][i].marked) markedCount++;
    }
    if (markedCount === row.length) return true;
  }

  return false;
}

function getUnmarkedSum(board) {
  let unmarkedSum = 0;
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    for (let j = 0; j < row.length; j++) {
      if (!row[j].marked) unmarkedSum += row[j].n;
    }
  }

  return unmarkedSum;
}

function partTwo() {
  const numbers = input[0].split(',').map(n => parseInt(n));
  const boards = generateBoards();

  let winningBoards = [].fill(false);
  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    for (let j = 0; j < boards.length; j++) {
      markNumber(boards[j], n);
      if (boardHasBingo(boards[j])) {
        winningBoards[j] = true;
        if (winningBoards.filter(w => w).length === boards.length) {
          const unmarkedSum = getUnmarkedSum(boards[j]);
          return unmarkedSum * n;
        }
      }
    }
  }

  return false;
}


assert.equal(partOne(), 16674);
assert.equal(partTwo(), 7075);
