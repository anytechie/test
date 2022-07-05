const fs = require('fs');

const file = "output.txt";

let content = fs.readFileSync(file, 'utf8');

const stack = [];

const scripts = [];

while(true) {
    let idx = content.indexOf('CREATE TABLE');
    for (let i = idx; i < content.length; i++) {
        const char = content[i];
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            stack.pop();
            if (stack.length === 0) {
                scripts.push(content.substring(idx, i + 1));
                content = content.substring(i + 1);
                break;
            }
        }
    }
    if (idx === -1) {
        break;
    }
}


const tables = [] // [{name, script}]

for(let script of scripts) {
    let name = script.slice(script.indexOf('TABLE') + 5, script.indexOf('('));
    name = name.replace(/\s/g, '');
    name = name.replace(/"/g, '');
    name = name.split('.')[1];
    if (!name) {
        throw new Error('Invalid script');
    }
    const table = {name, script};
    tables.push(table);
}
console.log(tables);

// create a new folder
if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
}

for(let table of tables) {
    fs.writeFileSync(`output/${table.name}.sql`, table.script);
}
