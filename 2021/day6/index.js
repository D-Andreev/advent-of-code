const {readInput, parseCommaSeparatedNumbers} = require('../helpers');
const assert = require('assert');

const input = readInput('./input.txt');

function partOne() {
  let lanternFishTimers = parseCommaSeparatedNumbers(input[0]);
  for (let i = 0; i < 80; i++) {
    const babies = [];
    for (let j = 0; j < lanternFishTimers.length; j++) {
      lanternFishTimers[j]--;
      if (lanternFishTimers[j] === -1) {
        lanternFishTimers[j] = 6;
        babies.push(8);
      }
    }
    lanternFishTimers = lanternFishTimers.concat(babies);
  }

  return lanternFishTimers.length;
}

function partTwo() {
  let lanternFishTimers = parseCommaSeparatedNumbers(input[0]);
  let initialState = new Array(9).fill(0);
  lanternFishTimers.map( (element) => {
    initialState[element]++
  });
  for(let i = 0; i < 256; i++) {
    let dayZero = initialState[0];
    let dayOne = initialState[1];
    let dayTwo = initialState[2];
    let dayThree = initialState[3];
    let dayFour = initialState[4];
    let dayFive = initialState[5];
    let daySix = initialState[6];
    let daySeven = initialState[7];
    let dayEight = initialState[8];
    initialState[0] = dayOne;
    initialState[1] = dayTwo;
    initialState[2] = dayThree;
    initialState[3] = dayFour;
    initialState[4] = dayFive;
    initialState[5] = daySix;
    initialState[6] = daySeven + dayZero;
    initialState[7] = dayEight;
    initialState[8] = dayZero;
  }

  return initialState.reduce((a, b)=> a + b);
}

assert.equal(partOne(), 358214);
assert.equal(partTwo(), 1622533344325);
