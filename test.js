const fs = require('fs');

// go through all the sql files in the current directory and inside each folder in the current directory
// create a new file with the name db.changelog-master.xml, and insert each file path as a liquibase changeSet

fs.readdirSync(__dirname).forEach(function(file) {
    if (file.indexOf('.') !== 0) {
        fs.readdirSync(__dirname + '/' + file).forEach(function(file) {
            if (file.indexOf('.') !== 0) {
                fs.appendFileSync(__dirname + '/db.changelog-master.xml', '<changeSet author="' + file + '" id="' + file + '" order="1">\n');
                fs.appendFileSync(__dirname + '/db.changelog-master.xml', '<sqlFile path="' + __dirname + '/' + file + '/' + file + '.sql" />\n');
                fs.appendFileSync(__dirname + '/db.changelog-master.xml', '</changeSet>\n');
            }
        });
    }
}
);