namespace day5 {
  const path = require('path');
  const {readInput} = require('../../helpers');

  const input = readInput(path.join(__dirname, 'input.prod.txt'));
  let stacks = [];
  const separatorIdx = input.findIndex(v => v === "");

  class Stack {
    private readonly arr: string[];

    constructor() {
      this.arr = [];
    }

    put(item: string) {
      this.arr.unshift(item);
    }

    peek(): string {
      return this.arr[0];
    }

    pop() {
      return this.arr.shift();
    }
  }

  function createStacks() {
    // Too lazy to parse this
    const stack1 = new Stack();
    stack1.put('R');
    stack1.put('G');
    stack1.put('J');
    stack1.put('B');
    stack1.put('T');
    stack1.put('V');
    stack1.put('Z');

    const stack2 = new Stack();
    stack2.put('J');
    stack2.put('R');
    stack2.put('V');
    stack2.put('L');

    const stack3 = new Stack();
    stack3.put('S');
    stack3.put('Q');
    stack3.put('F');

    const stack4 = new Stack();
    stack4.put('Z');
    stack4.put('H');
    stack4.put('N');
    stack4.put('L');
    stack4.put('F');
    stack4.put('V');
    stack4.put('Q');
    stack4.put('G');

    const stack5 = new Stack();
    stack5.put('R');
    stack5.put('Q');
    stack5.put('T');
    stack5.put('J');
    stack5.put('C');
    stack5.put('S');
    stack5.put('M');
    stack5.put('W');

    const stack6 = new Stack();
    stack6.put('S');
    stack6.put('W');
    stack6.put('T');
    stack6.put('C');
    stack6.put('H');
    stack6.put('F');

    const stack7 = new Stack();
    stack7.put('D');
    stack7.put('Z');
    stack7.put('C');
    stack7.put('V');
    stack7.put('F');
    stack7.put('N');
    stack7.put('J');

    const stack8 = new Stack();
    stack8.put('L');
    stack8.put('G');
    stack8.put('Z');
    stack8.put('D');
    stack8.put('W');
    stack8.put('R');
    stack8.put('F');
    stack8.put('Q');

    const stack9 = new Stack();
    stack9.put('J');
    stack9.put('B');
    stack9.put('W');
    stack9.put('V');
    stack9.put('P');

    stacks = [
      stack1,
      stack2,
      stack3,
      stack4,
      stack5,
      stack6,
      stack7,
      stack8,
      stack9,
    ];
  }

  function partOne() {
    createStacks();

    for (let i = separatorIdx + 1; i < input.length; i++) {
      const row = input[i];
      const [count, stackIdx, targetStackIdx] = row.match(/\d+/g);
      for (let j = 0; j < count; j++) {
        const popped = stacks[parseInt(stackIdx) - 1].pop();
        stacks[parseInt(targetStackIdx) - 1].put(popped);
      }
    }

    let res = '';
    stacks.forEach(s => res += s.peek());
    return res;
  }

  function partTwo() {
    createStacks();

    for (let i = separatorIdx + 1; i < input.length; i++) {
      const row = input[i];
      const [count, stackIdx, targetStackIdx] = row.match(/\d+/g);
      const poppedItems = [];
      for (let j = 0; j < count; j++) {
        poppedItems.push(stacks[parseInt(stackIdx) - 1].pop());
      }

      poppedItems.reverse().forEach((item) => {
        stacks[parseInt(targetStackIdx) - 1].put(item);
      });
    }

    let res = '';
    stacks.forEach(s => res += s.peek());
    return res;
  }

  console.log(partOne());
  console.log(partTwo());
}
