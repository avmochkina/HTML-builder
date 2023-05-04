const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

const copyDir = async () => {
  try {
    await fs.promises.access(srcDir, fs.constants.R_OK);
    await fs.promises.mkdir(destDir, { recursive: true });

    const files = await fs.promises.readdir(srcDir);

    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);

      const fileStat = await fs.promises.stat(srcPath);

      if (fileStat.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }

    console.log('Directory copied successfully!');
  } catch (error) {
    console.error(`Error while copying directory: ${error.message}`);
  }
};

copyDir();


