const {readInput} = require('../helpers');

const input = readInput('./input.txt');

function partOne() {
  let horizontalPosition = 0;
  let depth = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i].split(' ');
    const direction = line[0];
    const x = parseInt(line[1]);
    if (direction === 'forward') {
      horizontalPosition += x;
    } else if (direction === 'up') {
      depth -= x;
    } else if (direction === 'down') {
      depth += x;
    }
  }

  console.log(horizontalPosition * depth);
}

function partTwo() {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i].split(' ');
    const direction = line[0];
    const x = parseInt(line[1]);
    if (direction === 'forward') {
      horizontalPosition += x;
      depth += aim * x;
    } else if (direction === 'up') {
      aim -= x;
    } else if (direction === 'down') {
      aim += x;
    }
  }

  console.log(horizontalPosition * depth);
}

partOne();
partTwo();
