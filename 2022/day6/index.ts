namespace day6 {
  const path = require('path');
  const {readInput} = require('../../helpers');

  const input = readInput(path.join(__dirname, 'input.prod.txt'));
  const dataStream = input[0];

  function partOne() {
    for (let i = 0; i <= dataStream.length; i++) {
      const map = {};
      for (let j = i; j < i + 4; j++) {
        if (!map.hasOwnProperty(dataStream[j])) {
          map[dataStream[j]] = true;
          if (Object.keys(map).length === 4) {
            return j + 1;
          }
          continue;
        }

        break;
      }
    }

    return -1;
  }

  function partTwo() {
    for (let i = 0; i <= dataStream.length; i++) {
      const map = {};
      for (let j = i; j < i + 14; j++) {
        if (!map.hasOwnProperty(dataStream[j])) {
          map[dataStream[j]] = true;
          if (Object.keys(map).length === 14) {
            return j + 1;
          }
          continue;
        }

        break;
      }
    }

    return -1;
  }

  console.log(partOne());
  console.log(partTwo());
}
