const {readInput, parseCommaSeparatedNumbers} = require('../helpers');
const assert = require('assert');

const input = readInput('./input.txt');

function partOne() {
  const crabsPositions = parseCommaSeparatedNumbers(input[0]);
  let minFuel = Number.MAX_SAFE_INTEGER;
  const maxPosition = Math.max(...crabsPositions);
  const line = new Array(maxPosition + 1).fill(0);
  for (let i = 0; i < crabsPositions.length; i++) {
    const crabsPosition = crabsPositions[i];
    line[crabsPosition]++;
  }
  for (let i = 0; i < line.length; i++) {
    let fuelSum = 0;
    for (let j = 0; j < line.length; j++) {
      if (line[j] === 0) continue;
      for (let k = 0; k < line[j]; k++) {
        const fuelCost = Math.abs(i - j);
        fuelSum += fuelCost;
      }
    }
    if (fuelSum < minFuel) {
      minFuel = fuelSum;
    }
  }

  return minFuel;
}

function partTwo() {
  const crabsPositions = parseCommaSeparatedNumbers(input[0]);
  let minFuel = Number.MAX_SAFE_INTEGER;
  const maxPosition = Math.max(...crabsPositions);
  const line = new Array(maxPosition + 1).fill(0);
  for (let i = 0; i < crabsPositions.length; i++) {
    const crabsPosition = crabsPositions[i];
    line[crabsPosition]++;
  }
  for (let i = 0; i < line.length; i++) {
    let fuelSum = 0;
    for (let j = 0; j < line.length; j++) {
      if (line[j] === 0) continue;
      for (let k = 1; k <= line[j]; k++) {
        const fuelCost = Math.abs(i - j);
        fuelSum += fuelCost * (fuelCost + 1) / 2;
      }
    }
    if (fuelSum < minFuel) {
      minFuel = fuelSum;
    }
  }

  return minFuel;
}

assert.equal(partOne(), 364898);
assert.equal(partTwo(), 104149091);
