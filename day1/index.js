const fs = require('fs');
const {EOL} = require('os');

const input = fs.readFileSync('./input.txt')
  .toString()
  .split(EOL);
input.pop();

function partOne() {
  let increasedCount = 0;
  let prev = null;
  for (let i = 0; i < input.length; i++) {
    const n = parseInt(input[i]);
    if (prev === null) {
      prev = n;
      continue;
    }

    if (n > prev) {
      increasedCount++;
    }
    prev = n;
  }
  console.log(increasedCount);
}

function partTwo() {
  let increasedCount = 0;
  let prevWindowSum = null;
  for (let i = 0; i < input.length - 2; i++) {
    const n1 = parseInt(input[i]);
    const n2 = parseInt(input[i + 1]);
    const n3 = parseInt(input[i + 2]);
    const windowsSum = n1 + n2 + n3;
    if (prevWindowSum === null) {
      prevWindowSum = windowsSum;
      continue;
    }
    if (windowsSum > prevWindowSum) {
      increasedCount++;
    }
    prevWindowSum = windowsSum;
  }
  console.log(increasedCount);
}
partTwo();
