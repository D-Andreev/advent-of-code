const {readInput} = require('../helpers');
const assert = require('assert');

const input = readInput('./input.txt');

function partOne() {
  const lines = input.map(l => l.split(''));
  const syntaxErrorScore = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };
  const closing = {
    '[': ']',
    '{': '}',
    '(': ')',
    '<': '>',
  };
  const opening = Object.keys(closing);
  const syntaxErrorCounts = {};

  for (const line of lines) {
    let opened = [];

    for (const token of line) {
      if (opening.includes(token)) {
        opened.push(token);
      } else if (closing[opened.pop()] !== token) {
        syntaxErrorCounts[token] = syntaxErrorCounts[token] + 1 || 1;
        break;
      }
    }
  }
  let syntaxErrScore = 0;

  for (const [token, n] of Object.entries(syntaxErrorCounts)) {
    syntaxErrScore += syntaxErrorScore[token] * n;
  }

  return syntaxErrScore;
}

function partTwo() {
  // TODO
}

assert.equal(partOne(), 323613);
