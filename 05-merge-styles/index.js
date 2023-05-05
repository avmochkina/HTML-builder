const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const stylesFolderPath = path.join(__dirname, 'styles');
const distFolderPath = path.join(__dirname, 'project-dist');
const bundleFilePath = path.join(distFolderPath, 'bundle.css');

const allowedExtensions = ['.css'];

const getFilesInDir = async (dirPath) => {
  const dirents = await fs.promises.readdir(dirPath, { withFileTypes: true });
  return dirents.filter(dirent => dirent.isFile() && allowedExtensions.includes(path.extname(dirent.name)))
                .map(dirent => path.join(dirPath, dirent.name));
};

const readFiles = async (filePaths) => {
  const fileContents = await Promise.all(filePaths.map(fp => fs.promises.readFile(fp, 'utf-8')));
  return fileContents.join('');
};

const buildBundle = async () => {
  try {
    const styleFiles = await getFilesInDir(stylesFolderPath);
    const bundleContent = await readFiles(styleFiles);
    await writeFile(bundleFilePath, bundleContent);
    console.log('Bundle created successfully!');
  } catch (err) {
    console.error(`Error creating bundle: ${err}`);
  }
};

buildBundle();