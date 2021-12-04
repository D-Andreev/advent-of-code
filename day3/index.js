const {readInput} = require('../helpers');
const assert = require('assert');

const input = readInput('./input.txt');

function partOne() {
  let currentIndex = 0;
  let gammaBinary = '';
  let epsilonBinary = '';
  while (currentIndex < input[0].length) {
    gammaBinary += getGamma(input, currentIndex);
    epsilonBinary += getEpsilon(input, currentIndex);
    currentIndex++;
  }
  return parseInt(gammaBinary, 2) * parseInt(epsilonBinary, 2);
}

function getGamma(input, currentIndex) {
  let zeroC = 0;
  let oneC = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i][currentIndex] === '1') {
      oneC++;
    } else {
      zeroC++;
    }
  }
  return oneC > zeroC ? '1' : '0';
}

function getEpsilon(input, currentIndex) {
  let zeroC = 0;
  let oneC = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i][currentIndex] === '1') {
      oneC++;
    } else {
      zeroC++;
    }
  }
  return oneC > zeroC ? '0' : '1';
}

function partTwo() {
  let oxygenGeneratorRatingBinary = '';
  let indices = {};
  for (let i = 0; i < input.length; i++) {
    indices[i] = i;
  }
  let currentIdx = 0;
  while (currentIdx < input[0].length) {
    oxygenGeneratorRatingBinary += getOxygenGeneratorRating(input, currentIdx, indices);
    const keys = Object.keys(indices);
    if (keys.length === 1) {
      oxygenGeneratorRatingBinary = input[indices[keys[0]]];
      break;
    }
    currentIdx++;
  }

  indices = {};
  for (let i = 0; i < input.length; i++) {
    indices[i] = i;
  }
  currentIdx = 0;
  let c02ScrubberRatingBinary = '';
  while (currentIdx < input[0].length) {
    c02ScrubberRatingBinary += getC02ScrubberRating(input, currentIdx, indices);
    const keys = Object.keys(indices);
    if (keys.length === 1) {
      c02ScrubberRatingBinary = input[indices[keys[0]]];
      break;
    }
    currentIdx++;
  }

  const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2);
  const c02ScrubberRating = parseInt(c02ScrubberRatingBinary, 2);
  return oxygenGeneratorRating * c02ScrubberRating;
}

function getOxygenGeneratorRating(input, currentIndex, indices) {
  let onesIndices = [];
  let zeroesIndices = [];
  for (let i = 0; i < input.length; i++) {
    if (!indices.hasOwnProperty(i)) continue;
    if (input[i][currentIndex] === '1') onesIndices.push(i);
    else zeroesIndices.push(i);
  }
  if (onesIndices.length > zeroesIndices.length) {
    for (let i = 0; i < zeroesIndices.length; i++) {
      delete indices[zeroesIndices[i]];
    }
    return '1';
  } else if (zeroesIndices.length > onesIndices.length) {
    for (let i = 0; i < onesIndices.length; i++) {
      delete indices[onesIndices[i]];
    }
    return '0';
  } else {
    for (let i = 0; i < zeroesIndices.length; i++) {
      delete indices[zeroesIndices[i]];
    }
    return '1';
  }
}

function getC02ScrubberRating(input, currentIndex, indices) {
  let onesIndices = [];
  let zeroesIndices = [];
  for (let i = 0; i < input.length; i++) {
    if (!indices.hasOwnProperty(i)) continue;
    if (input[i][currentIndex] === '1') onesIndices.push(i);
    else zeroesIndices.push(i);
  }
  if (onesIndices.length > zeroesIndices.length) {
    for (let i = 0; i < onesIndices.length; i++) {
      delete indices[onesIndices[i]];
    }
    return '0';
  } else if (zeroesIndices.length > onesIndices.length) {
    for (let i = 0; i < zeroesIndices.length; i++) {
      delete indices[zeroesIndices[i]];
    }
    return '1';
  } else {
    for (let i = 0; i < onesIndices.length; i++) {
      delete indices[onesIndices[i]];
    }
    return '0';
  }
}

assert.equal(partOne(), 3847100);
assert.equal(partTwo(), 4105235);
