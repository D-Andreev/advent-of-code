const {readInput} = require('../../helpers');

const input = readInput('./input.txt');

let tmpMax = 0;
let maxC = [];

for (let i = 0; i < input.length; i++) {
  const c = input[i];
  if (c === '') {
    maxC.push(tmpMax);
    tmpMax = 0;
  } else {
    if (i === input.length - 1) {
      maxC.push(parseInt(c))
    } else {
      tmpMax += parseInt(c);
    }
  }
}

const sorted = maxC.sort((a, b) => parseInt(b) - parseInt(a))
console.log(sorted[0], sorted[1], sorted[2])
console.log(sorted[0] + sorted[1] + sorted[2])
