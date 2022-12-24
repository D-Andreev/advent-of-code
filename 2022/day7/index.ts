namespace day7 {
  const path = require("path");
  const { readInput } = require("../../helpers");

  const input = readInput(path.join(__dirname, "input.prod.txt"));
  const commands = ["$ cd ", "$ ls"];

  const isCommand = (input: string) => {
    return input.startsWith("$ ");
  };

  class Node {
    constructor(
      public name: string,
      public children: Node[] = [],
      public type = "dir",
      public size = 0,
      public parent: Node | null = null
    ) {}
  }

  function getDirTotalSize(
    dir: Node,
    size: number,
    dirs: { [k: string]: number }
  ) {
    for (let i = 0; i < dir.children.length; i++) {
      const child = dir.children[i];
      if (child.type === "file") {
        size += child.size;
      } else {
        size += getDirTotalSize(child, 0, dirs);
      }
    }
    dirs[dir.parent ? `${dir.parent.name}/${dir.name}` : dir.name] = size;
    return size;
  }

  function generateFS(fs: Node) {
    for (let i = 1; i < input.length; i++) {
      const row = input[i];
      if (isCommand(row)) {
        if (row.startsWith(commands[0])) {
          const parsed = row.split(commands[0]);
          const path = parsed[1];
          if (path === "..") {
            fs = fs.parent;
          } else {
            const child = fs.children.find((c) => c.name === path);
            fs = child;
          }
        } else if (row === commands[1]) {
          for (let j = i + 1; j < input.length; j++) {
            if (isCommand(input[j])) {
              i += j - i - 1;
              break;
            }
            const split = input[j].split(" ");
            if (split[0] === "dir") {
              fs.children.push(new Node(split[1], [], "dir", 0, fs));
            } else {
              fs.children.push(
                new Node(split[1], [], "file", parseInt(split[0]), fs)
              );
            }
          }
        }
      }
    }
  }

  function partOne() {
    let fs = new Node("/");
    generateFS(fs);
    while (fs.parent !== null) {
      fs = fs.parent;
    }
    const dirs = {};
    getDirTotalSize(fs, 0, dirs);
    const maxSize = 100000;
    const sum = Object.keys(dirs)
      .filter((d) => dirs[d] <= maxSize)
      .reduce((acc, d) => (acc += dirs[d]), 0);
    return sum;
  }

  function partTwo() {
    let fs = new Node("/");
    generateFS(fs);
    while (fs.parent !== null) {
      fs = fs.parent;
    }
    const dirs = {};
    getDirTotalSize(fs, 0, dirs);
    const unusedSpace = 70000000 - dirs["/"];
    const neededSpace = 30000000;
    const sorted = Object.keys(dirs)
      .map((d) => dirs[d])
      .sort((a, b) => parseInt(a) - parseInt(b));
    for (let i = 0; i < sorted.length; i++) {
      if (unusedSpace + sorted[i] >= neededSpace) return sorted[i];
    }
  }

  console.log(partOne());
  console.log(partTwo());
}
