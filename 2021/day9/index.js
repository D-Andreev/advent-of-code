const {readInput, parseMatrix} = require('../helpers');
const assert = require('assert');

const input = readInput('./input.txt');
const heightMap = parseMatrix(input);
let prev = null;

function partOne() {
  const lowPoints = getLowPoints();
  return lowPoints.map(({value}) => value + 1).reduce((a, b) => a + b, 0);
}

function partTwo() {
  let basins = [];
  const lowPoints = getLowPoints();
  const used = {};
  for (let l = 0; l < lowPoints.length; l++) {
    const points = [
      createPoint(
        lowPoints[l].i,
        lowPoints[l].j,
        lowPoints[l].value,
        {left: true, right: true, top: true, bottom: true}
      )
    ];
    let sum = 0;
    while (points.length > 0) {
      const currentPoint = points[0];
      prev = currentPoint.value;
      if (currentPoint.directions.top) {
        sum = checkTop(currentPoint, points, sum, used);
      }
      prev = currentPoint.value;
      if (currentPoint.directions.left) {
        sum = checkLeft(currentPoint, points, sum, used);
      }
      prev = currentPoint.value;
      if (currentPoint.directions.right) {
        sum = checkRight(currentPoint, points, sum, used);
      }
      prev = currentPoint.value;
      if (currentPoint.directions.bottom) {
        sum = checkBottom(currentPoint, points, sum, used);
      }

      used[`${currentPoint.i}${currentPoint.j}`] = true;
      points.shift();
    }
    basins.push(sum + 1);
  }

  basins.sort((a, b) => parseInt(b) - parseInt(a));
  let result = 1;
  for (let i = 0; i < 3; i++) {
    result *= basins[i];
  }
  return result;
}

function checkTop(currentPoint, points, sum, used) {
  for (let i = currentPoint.i - 1; i >= 0; i--) {
    if (used.hasOwnProperty(`${i}${currentPoint.j}`)) continue;
    const neighbour = heightMap[i][currentPoint.j];
    const pointsIdx = points.findIndex(p => p.i === i && p.j === currentPoint.j);
    if (pointsIdx !== -1 && points[pointsIdx].directions.top) break;
    if (prev < neighbour && neighbour !== 9) {
      points.push(
        createPoint(
          i,
          currentPoint.j,
          neighbour,
          {left: true, right: true, top: false, bottom: false}
        )
      );
      prev = neighbour;
      sum++;
    } else break;
  }
  currentPoint.directions.top = false;

  return sum;
}

function checkRight(currentPoint, points, sum, used) {
  for (let j = currentPoint.j + 1; j < heightMap[0].length; j++) {
    if (used.hasOwnProperty(`${currentPoint.i}${j}`)) continue;
    const neighbour = heightMap[currentPoint.i][j];
    const pointsIdx = points.findIndex(p => p.i === currentPoint.i && p.j === j);
    if (pointsIdx !== -1 && points[pointsIdx].directions.right) break;
    if (prev < neighbour && neighbour !== 9) {
      points.push(
        createPoint(
          currentPoint.i,
          j,
          neighbour,
          {left: false, right: false, top: true, bottom: true}
        )
      );
      prev = neighbour;
      sum++;
    } else break;
  }
  currentPoint.directions.right = false;

  return sum;
}

function checkLeft(currentPoint, points, sum, used) {
  for (let j = currentPoint.j - 1; j >= 0; j--) {
    if (used.hasOwnProperty(`${currentPoint.i}${j}`)) continue;
    const neighbour = heightMap[currentPoint.i][j];
    const pointsIdx = points.findIndex(p => p.i === currentPoint.i && p.j === j);
    if (pointsIdx !== -1 && points[pointsIdx].directions.left) break;
    if (prev < neighbour && neighbour !== 9) {
      points.push(
        createPoint(
          currentPoint.i,
          j,
          neighbour,
          {left: false, right: false, top: true, bottom: true}
        )
      );
      prev = neighbour;
      sum++;
    } else break;
  }
  currentPoint.directions.left = false;

  return sum;
}

function checkBottom(currentPoint, points, sum, used) {
  for (let i = currentPoint.i + 1; i < heightMap.length; i++) {
    if (used.hasOwnProperty(`${i}${currentPoint.j}`)) continue;
    const neighbour = heightMap[i][currentPoint.j];
    const pointsIdx = points.findIndex(p => p.i === i && p.j === currentPoint.j);
    if (pointsIdx !== -1 && points[pointsIdx].directions.bottom) break;
    if (prev < neighbour && neighbour !== 9) {
      points.push(
        createPoint(
          i,
          currentPoint.j,
          neighbour,
          {left: true, right: true, top: false, bottom: false}
        )
      );
      prev = neighbour;
      sum++;
    } else break;
  }
  currentPoint.directions.bottom = false;

  return sum;
}

function getLowPoints() {
  const lowPoints = [];
  for (let i = 0; i < heightMap.length; i++) {
    const row = heightMap[i];
    for (let j = 0; j < row.length; j++) {
      const rowElement = row[j];
      let higherNeighbours = 0;
      if (j - 1 >= 0) {
        higherNeighbours += rowElement < row[j - 1] ? 1 : 0;
      } else {
        higherNeighbours++;
      }
      if (j + 1 < row.length) {
        higherNeighbours += rowElement < row[j + 1] ? 1 : 0;
      } else {
        higherNeighbours++;
      }

      if (i - 1 >= 0) {
        higherNeighbours += rowElement < heightMap[i - 1][j] ? 1 : 0;
      } else {
        higherNeighbours++;
      }
      if (i + 1 < heightMap.length) {
        higherNeighbours += rowElement < heightMap[i + 1][j] ? 1 : 0;
      } else {
        higherNeighbours++;
      }
      if (higherNeighbours === 4) {
        lowPoints.push({i, j, value: heightMap[i][j]});
      }
    }
  }

  return lowPoints;
}

function createPoint(i, j, value, directions) {
  return {
    i,
    j,
    value,
    directions,
  }
}

assert.equal(partOne(), 570);
assert.equal(partTwo(), 1665846); // TODO: Not correct
