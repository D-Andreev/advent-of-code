const fs = require('fs');
const {EOL} = require('os');

module.exports = {
  readInput(path) {
    const input = fs.readFileSync(path)
    .toString()
    .split(EOL);
    input.pop();
    return input;
  }
};
