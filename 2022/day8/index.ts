namespace day8 {
  const path = require("path");
  const { readInput, parseMatrix, printMatrix } = require("../../helpers");

  const input = readInput(path.join(__dirname, "input.prod.txt"));

  function isEdge(row: number, col: number, matrix: number[][]): boolean {
    if (row === 0 || col === 0) return true;
    if (row === matrix.length - 1) return true;
    if (col === matrix[0].length - 1) return true;

    return false;
  }
  function isVisible(row: number, col: number, matrix: number[][]): boolean {
    const tree = matrix[row][col];
    let topVisible = true;
    for (let i = row - 1; i >= 0; i--) {
      if (matrix[i][col] >= tree) topVisible = false;
    }
    let bottomVisible = true;
    for (let i = row + 1; i < matrix[row + 1].length; i++) {
      if (matrix[i][col] >= tree) bottomVisible = false;
    }
    let leftVisible = true;
    for (let i = col - 1; i >= 0; i--) {
      if (matrix[row][i] >= tree) leftVisible = false;
    }
    let rightVisible = true;
    for (let i = col + 1; i < matrix[row].length; i++) {
      if (matrix[row][i] >= tree) rightVisible = false;
    }
    return [topVisible, bottomVisible, leftVisible, rightVisible].some(
      (v) => v
    );
  }

  function partOne() {
    const grid = parseMatrix(input);
    printMatrix(grid);
    let visibleTrees = 0;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (isEdge(row, col, grid) || isVisible(row, col, grid)) visibleTrees++;
      }
    }
    return visibleTrees;
  }

  function getScore(row: number, col: number, matrix: number[][]): number {
    const tree = matrix[row][col];
    let topScore = 0;
    for (let i = row - 1; i >= 0; i--) {
      if (matrix[i][col] >= tree) {
        topScore++;
        break;
      }
      topScore++;
    }
    let bottomScore = 0;
    for (let i = row + 1; i < matrix[row + 1].length; i++) {
      if (matrix[i][col] >= tree) {
        bottomScore++;
        break;
      }
      bottomScore++;
    }
    let leftScore = 0;
    for (let i = col - 1; i >= 0; i--) {
      if (matrix[row][i] >= tree) {
        leftScore++;
        break;
      }
      leftScore++;
    }
    let rightScore = 0;
    for (let i = col + 1; i < matrix[row].length; i++) {
      if (matrix[row][i] >= tree) {
        rightScore++;
        break;
      }
      rightScore++;
    }
    return topScore * leftScore * rightScore * bottomScore;
  }

  function partTwo() {
    const grid = parseMatrix(input);
    printMatrix(grid);
    let maxScore = 0;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (isEdge(row, col, grid)) continue;
        let score = getScore(row, col, grid);
        if (score > maxScore) maxScore = score;
      }
    }
    return maxScore;
  }

  console.log(partOne());
  console.log(partTwo());
}
