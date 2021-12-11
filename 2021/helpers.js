const fs = require('fs');
const {EOL} = require('os');

module.exports = {
  readInput(path) {
    const input = fs.readFileSync(path)
    .toString()
    .split(EOL);
    input.pop();
    return input;
  },

  printMatrix(matrix) {
    let str = '';
    for (let i = 0; i < matrix.length; i++) {
      const matrixElement = matrix[i];
      for (let j = 0; j < matrixElement.length; j++) {
        str += matrixElement[j] ? matrixElement[j] : '.';
      }
      str += '\n';
    }
    console.log(str);
  }
};
