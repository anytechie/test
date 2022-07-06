const fs = require('fs');

// go through all the sql files in the current directory
// create a new file with the name db.changelog-master.xml, and insert each file path as a liquibase changeSet
fs.readdirSync('./').forEach(file => {
    if (file.endsWith('.sql')) {
        fs.appendFileSync('db.changelog-master.xml', `<changeSet author="${file}" id="${file}" file="${file}"/>\n`);
    }
}
);