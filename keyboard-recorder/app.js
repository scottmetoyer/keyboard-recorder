const readline = require('readline');
readline.emitKeypressEvents(process.stdin);

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

input.on('line', (input) => {
    console.log('Received input: ' + input);

    // Timestamp it and save it to whatever persistence mechanism we use
});