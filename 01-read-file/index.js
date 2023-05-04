const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');

// Now you can use `filePath` to read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

