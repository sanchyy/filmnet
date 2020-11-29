const path  = require('path');
const fs    = require('fs');

const moveFile = (movie, dirPath) => {

  let filePath = path.join(dirPath, movie.name);
    return new Promise((resolve, reject) => {
      fs.promises.access(filePath)
        .then(() => reject(new Error(`File ${movie.name} already exists`)))
        .catch(() =>
          movie.mv(filePath, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          })
        );
    });
};

module.exports = moveFile;