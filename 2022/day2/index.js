const {readInput} = require('../../helpers');

const input = readInput('./input.txt');

console.log(input)

const shapes = {
  rock: 'rock',
  'paper': 'paper',
  'scissors': 'scissors',
}

const opponentShapesMap = {
  A: shapes.rock,
  B: shapes.paper,
  C: shapes.scissors,
};

const myShapesMap = {
  X: shapes.rock,
  Y: shapes.paper,
  Z: shapes.scissors,
};

const pointsMap = {
  [shapes.rock]: 1,
  [shapes.paper]: 2,
  [shapes.scissors]: 3,
};

const whatBeatsWhat = {
  [shapes.paper]: shapes.rock,
  [shapes.scissors]: shapes.paper,
  [shapes.rock]: shapes.scissors,
}

const whatLosesToWhat = {
  [shapes.rock]: shapes.paper,
  [shapes.paper]: shapes.scissors,
  [shapes.scissors]: shapes.rock,
}

function getRoundScore(myShape, opponentShare) {
  let score = 0;
  if (opponentShare === myShape) {
    // draw
    score += 3;
  } else if (whatBeatsWhat[myShape] === opponentShare) {
    // I win
    score += 6;
  }
  score += pointsMap[myShape];
  return score;
}

let score = 0;
for (let i = 0; i < input.length; i++) {
  const [opponentShape, myShape] = input[i].split(' ');
  const opponentShapeConverted = opponentShapesMap[opponentShape];
  const myShapeConverted = myShapesMap[myShape];
  console.log('1', [opponentShape, myShape])
  console.log('2', opponentShapeConverted, myShapeConverted);
  console.log('3', whatBeatsWhat[opponentShapeConverted], myShapeConverted);
  console.log('=============')
  score += getRoundScore(myShapeConverted, opponentShapeConverted);
}

console.log('part I', score);
// X - lose, Y - draw, Z - win
score = 0;
for (let i = 0; i < input.length; i++) {
  const [opponentShape, desiredOutcome] = input[i].split(' ');
  const opponentShapeConverted = opponentShapesMap[opponentShape];
  let myShape;
  if (desiredOutcome === 'X') {
    myShape = whatBeatsWhat[opponentShapeConverted];
  } else if (desiredOutcome === 'Y') {
    myShape = opponentShapeConverted;
  } else {
    myShape = whatLosesToWhat[opponentShapeConverted];
  }
  score += getRoundScore(myShape, opponentShapeConverted);
}

console.log('part II', score);



