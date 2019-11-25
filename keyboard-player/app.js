const fs = require('fs');
var playIndex = 0;
var playing = true;
var events = [];

if (process.argv.length < 3) {
    showUsage();
    process.exit();
}

var fileName = process.argv[2];

// Open file for reading
var scans = fs.readFileSync(fileName).toString().split("\n");

// Parse into objects
for (i in scans) {
    var line =  scans[i].trim();
    if (!line) {
        // Empty string
    } else {
        var event = line.split(",");
        events.push({ scan: event[0].trim(), time: event[1].trim()});
    }
}

console.log("Loaded " + events.length + " events. Playing...");
var start = Date.now();

while (playing) {
    if (playIndex >= events.length) {
        playing = false;
    } else {
        var millis = Date.now() - start;
        if(millis >= events[playIndex].time) {
            console.log(events[playIndex].scan);
            playIndex++;
        }
    }
}

console.log("File ended.");

function showUsage() {
    console.log("Usage: node keyboard-player <input csv file>");
}