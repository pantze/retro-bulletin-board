const fs = require('fs');
const path = require('path');

const getDirectoryListing = (dirPath, subDir = '') => {
    const fullPath = path.join(dirPath, subDir);
    return fs.readdirSync(fullPath).map(file => ({
        name: file,
        path: path.join(fullPath, file),
        isDirectory: fs.statSync(path.join(fullPath, file)).isDirectory()
    }));
};

const downloadFile = (filePath, res) => {
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
};

module.exports = {
    getDirectoryListing,
    downloadFile
};