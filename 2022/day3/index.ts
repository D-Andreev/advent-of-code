namespace day3 {
  const {readInput} = require('../../helpers');
  const path = require('path');

  const UPPERCASE_SUBTRACT_COUNT = 38;
  const LOWERCASE_SUBTRACT_COUNT = 96;
  type Compartment = string[];
  type ItemsMap = {[k: string]: number};

  const input = readInput(path.join(__dirname, 'input.prod.txt'));

  function splitRucksackIntoCompartments(rucksack: string): Compartment[] {
    const rucksackArr = rucksack.split('');
    return [
      rucksackArr.slice(0, rucksackArr.length / 2),
      rucksackArr.slice(rucksackArr.length / 2, rucksackArr.length)
    ];
  }

  function countItemsInRucksack(compartment: Compartment, itemsMap: ItemsMap) {
    compartment.forEach((item) => {
      if (!itemsMap.hasOwnProperty(item)) {
        itemsMap[item] = 0;
      }
      itemsMap[item]++;
    });
  }

  function getItemPriority(item: string): number {
    return item === item.toUpperCase() ?
      item.charCodeAt(0) - UPPERCASE_SUBTRACT_COUNT: item.charCodeAt(0) - LOWERCASE_SUBTRACT_COUNT;
  }

  function getSumOfPriorities(repeatingItems: string[]): number {
    return repeatingItems
      .reduce((partialSum, item) => partialSum + getItemPriority(item), 0);
  }

  function partOne() {
    const repeatingItems = [];
    for (let i = 0; i < input.length; i++) {
      const rucksack = input[i];
      const compartments = splitRucksackIntoCompartments(rucksack);
      const items = {};
      countItemsInRucksack(compartments[0], items);
      for (let j = 0; j < compartments[1].length; j++) {
        const item = compartments[1][j];
        if (items.hasOwnProperty(item)) {
          repeatingItems.push(item);
          break;
        }
      }
    }

    return getSumOfPriorities(repeatingItems);
  }

  function partTwo() {
    const repeatingItems = [];
    for (let i = 0; i < input.length; i+=3) {
      const rucksack1 = input[i].split('');
      const rucksack2 = input[i + 1].split('');
      const rucksack3 = input[i + 2].split('');

      const firstRucksackItems = {};
      const secondRucksackItems = {};
      countItemsInRucksack(rucksack1, firstRucksackItems);
      countItemsInRucksack(rucksack2, secondRucksackItems);

      for (let j = 0; j < rucksack3.length; j++) {
        const item = rucksack3[j];
        if (firstRucksackItems.hasOwnProperty(item) && secondRucksackItems.hasOwnProperty(item)) {
          repeatingItems.push(item);
          break;
        }
      }
    }

    return getSumOfPriorities(repeatingItems);
  }

  console.log(partOne());
  console.log(partTwo());
}
