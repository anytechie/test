const fs = require('fs');

const file = "output.txt";

let content = fs.readFileSync(file, 'utf8');

const stack = [];

const createTable = [];

while(true) {
    let idx = content.indexOf('CREATE TABLE');
    for (let i = idx; i < content.length; i++) {
        const char = content[i];
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            stack.pop();
            if (stack.length === 0) {
                createTable.push(content.substring(idx, i + 1));
                content = content.substring(i + 1);
                break;
            }
        }
    }
    if (idx === -1) {
        break;
    }
}

console.log(createTable);

