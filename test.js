const fs = require('fs');

// go through all the sql files in the current directory and inside each folder in the current directory
// create a new file with the name db.changelog-master.xml, and insert each file path as a liquibase changeSet
// path will be relative to the current directory

fs.readdirSync('./').forEach(function(dir) {
    if (fs.lstatSync(dir).isDirectory()) {
        fs.readdirSync(dir).forEach(function(file) {
        if (file.endsWith('.sql')) {
            console.log(file);
            fs.appendFileSync('db.changelog-master.xml', '<changeSet author="system" id="' + file + '" order="1">\n');
            // path will be relative to the current directory
            fs.appendFileSync('db.changelog-master.xml', '<sqlFile path="' + dir + '/' + file + '"/>\n');
            fs.appendFileSync('db.changelog-master.xml', '</changeSet>\n');
        }
        });
    }
    }
);