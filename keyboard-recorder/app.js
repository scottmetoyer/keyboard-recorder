const readline = require('readline');
const fs = require('fs');

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create file for reading
var now = new Date();
var isoString = now.toISOString();

var stream = fs.createWriteStream("Scans_" + isoString.replace(':', "-"), {
    flags: 'a'
});
var start = Date.now();

input.on('line', (input) => {
    var millis = Date.now() - start;
    console.log('Received input: ' + input);
    stream.write(input + ", " + millis + "\n");
});

if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        shutdown();
    });
}

process.on("SIGINT", function () {
    shutdown();
});

function shutdown() {
    console.log('Application exiting...');
    stream.close();
    process.exit();
}