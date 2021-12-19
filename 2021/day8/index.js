const {readInput} = require('../helpers');
const assert = require('assert');

const input = readInput('./input.txt');
const digitsSegmentMap = {
  0: 6,
  1: 2,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
};
const numberSegmentsMap = {
  0: [0, 1, 2, 4, 5, 6],
  1: [2, 5],
  2: [0, 2, 3, 4, 6],
  3: [0, 2, 3, 5, 6],
  4: [1, 2, 3, 5],
  5: [0, 1, 3, 5, 6],
  6: [0, 1, 3, 4, 5, 6],
  7: [0, 2, 5],
  8: [0, 1, 2, 3, 4, 5, 6],
  9: [0, 1, 2, 3, 5, 6],
};

function parseInput(input) {
  return input.map((line) => {
    const split = line.split(' | ');
    return {
      uniqueSignals: split[0].split(' '),
      outputValue: split[1].split(' '),
    }
  });
}

function partOne() {
  const lines = parseInput(input);
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.outputValue.length; j++) {
      const outputValueElement = line.outputValue[j];
      if (outputValueElement.length === digitsSegmentMap[1]) sum++;
      if (outputValueElement.length === digitsSegmentMap[4]) sum++;
      if (outputValueElement.length === digitsSegmentMap[7]) sum++;
      if (outputValueElement.length === digitsSegmentMap[8]) sum++;
    }
  }
  return sum;
}

function partTwo() {
  const lines = parseInput(input);
  let permutations = [];
  getPermutations('abcdefg').map(p => permutations.push(p));
  const results = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < permutations.length; j++) {
      const permutation = permutations[j];
      let allValid = true;
      for (let p = 0; p < line.uniqueSignals.length; p++) {
        const pattern = line.uniqueSignals[p];
        const digit = getDigit(pattern, permutation);
        if (digit === false) {
          allValid = false;
          break;
        }
      }
      if (allValid) {
        const digits = [];
        for (let k = 0; k < line.outputValue.length; k++) {
          const outputValue = line.outputValue[k];
          digits.push(getDigit(outputValue, permutation));
        }
        results.push(parseInt(digits.join('')));
      }
    }
  }
  let sum = 0;
  for (let i = 0; i < results.length -1; i+=2) {
    sum += Math.max(results[i], results[i + 1]);
  }
  return sum;
}

function getPermutations(string) {
  if (string.length < 2 ) {
    return string;
  }

  let permutations = [];
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (string.indexOf(char) !== i) {
      continue;
    }
    let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length);
    for (let permutation of getPermutations(remainingChars)) {
      permutations.push(char + permutation)
    }
  }
  return permutations;
}

function getDigit(pattern, permutation) {
  const positions = pattern.split('').map((p) => permutation.indexOf(p)).sort();
  for (let p in numberSegmentsMap) {
    let map = numberSegmentsMap[p];
    map = map.sort();
    let areTheSame = true;
    for (let j = 0; j < map.length; j++) {
      if (map[j] !== positions[j]) {
        areTheSame = false;
        break;
      }
    }
    if (areTheSame) {
      return p;
    }
  }
  return false;
}

assert.equal(partOne(), 387);
assert.equal(partTwo(), 986034);
