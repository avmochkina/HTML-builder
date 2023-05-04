const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.open(filePath, 'a', (err, fd) => {
  if (err) throw err;

  console.log('Type your text or type exit to quit:');

  rl.on('line', (input) => {
    if (input === 'exit') {
      console.log('Goodbye!');
      fs.closeSync(fd);
      process.exit();
    }
    fs.write(fd, input + '\n', (err) => {
      if (err) throw err;
    });
  });
});
