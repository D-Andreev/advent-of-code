const fs = require("fs");

module.exports = {
  readInput(path) {
    const input = fs.readFileSync(path).toString().split(/\r?\n/);
    input.pop();
    return input;
  },

  printMatrix(matrix) {
    let str = "";
    for (let i = 0; i < matrix.length; i++) {
      const matrixElement = matrix[i];
      for (let j = 0; j < matrixElement.length; j++) {
        str += matrixElement[j];
      }
      str += "\n";
    }
    console.log(str);
  },

  parseMatrix(lines) {
    const matrix = new Array(lines.length).fill([]);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const chars = line.split("");
      matrix[i] = chars.map((n) => parseInt(n));
    }

    return matrix;
  },

  parseCommaSeparatedNumbers(input) {
    return input.split(",").map((n) => parseInt(n));
  },
};
