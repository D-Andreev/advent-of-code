namespace day4 {
  const {readInput} = require('../../helpers');
  const path = require('path');

  const input = readInput(path.join(__dirname, 'input.prod.txt'));

  class Section {
    public start: number;
    public end: number;

    constructor(data: string[]) {
      this.start = parseInt(data[0], 10);
      this.end = parseInt(data[1], 10);
    }
  }

  type Pair = {
    firstElfSection: Section;
    secondElfSection: Section;
  }

  function parsePair(inputRow: string): Pair {
    const pairs = inputRow.split(',');
    const firstElfSection = pairs[0].split('-');
    const secondElfSection = pairs[1].split('-');

    return {
      firstElfSection: new Section(firstElfSection),
      secondElfSection: new Section(secondElfSection),
    };
  }

  function partOne() {
    return input.reduce((fullyOverlappingPairs: number, inputRow: string) => {
      const {firstElfSection, secondElfSection} = parsePair(inputRow);
      if (firstElfSection.start <= secondElfSection.start &&
        firstElfSection.end >= secondElfSection.end) {
        fullyOverlappingPairs++;
      } else if (secondElfSection.start <= firstElfSection.start &&
        secondElfSection.end >= firstElfSection.end) {
        fullyOverlappingPairs++;
      }

      return fullyOverlappingPairs;
    }, 0);
  }

  function partTwo() {
    return input.reduce((overlappingPairs: number, inputRow: string) => {
      const {firstElfSection, secondElfSection} = parsePair(inputRow);
      if (secondElfSection.start >= firstElfSection.start &&
        secondElfSection.start <= firstElfSection.end) {
        overlappingPairs++;
      } else if (firstElfSection.start >= secondElfSection.start &&
                firstElfSection.start <= secondElfSection.end) {
        overlappingPairs++;
      }

      return overlappingPairs;
    }, 0);
  }

  console.log(partOne());
  console.log(partTwo());
}
