const readline = require('readline');
const fs = require('fs');

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create file for writing
var now = new Date();
var fileName = "scans_" + now.getFullYear() + now.getMonth() + now.getDate() + "_" + now.getHours() + now.getMinutes() + now.getSeconds() + ".csv";

var start = Date.now();

input.on('line', (input) => {
    var millis = Date.now() - start;
    var line = input + ", " + millis + "\n";

    fs.writeFile(fileName, line, { flag: 'a' }, (err) => {
        // throws an error, you could also catch it here
        if (err) {
            console.log('Error: ' + err);
        }
    });
});