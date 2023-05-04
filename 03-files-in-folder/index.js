const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        const fileSizeInBytes = stats.size;
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileExtension = path.extname(file).substring(1);

        console.log(`${path.parse(file).name} - ${fileExtension} - ${fileSizeInKB.toFixed(3)}kb`);
      } else {
        console.error(`Error: ${file} is not a file!`);
      }
    });
  });
});




