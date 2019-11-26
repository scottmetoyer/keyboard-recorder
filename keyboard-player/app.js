const fs = require('fs');
const midi = require('midi');
const output = new midi.Output();
var portCount = output.getPortCount();

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

console.log("Available MIDI devices:");
for (var i = 0; i < portCount; i++) {
  console.log(i + ': ' + output.getPortName(i));
}

var deviceNumber = 2;
output.openPort(deviceNumber);
console.log('Opened ' + output.getPortName(deviceNumber) +  '. Waiting for playback.');

// Play the sequence
while (playing) {
    if (playIndex >= events.length) {
        playing = false;
    } else {
        var millis = Date.now() - start;
        if(millis >= events[playIndex].time) {
            console.log(events[playIndex].scan);

            // TODO: Parse barcode and send MIDI CC
            var byte1 = Math.round(scale(input.substr(7, 2), 0, 100, 0, 127));
            var byte2 = Math.round(scale(input.substr(9, 2), 0, 100, 0, 127));
            var byte3 = Math.round(scale(input.substr(11, 2), 0, 100, 0, 127));
            var byte4 = Math.round(scale(input.substr(13, 2), 0, 100, 0, 127));

            output.sendMessage([176, 1, byte1]);
            output.sendMessage([176, 2, byte2]);
            output.sendMessage([176, 3, byte3]);
            output.sendMessage([176, 4, byte4]);

            playIndex++;
        }
    }
}

console.log("File ended.");

function showUsage() {
    console.log("Usage: node keyboard-player <input csv file>");
}