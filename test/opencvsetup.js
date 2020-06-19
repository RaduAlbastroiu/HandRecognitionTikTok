const cv = require('opencv4nodejs');

const displayImage = () => {
  const image = cv.imread('pug.png');
  cv.imshowWait('Image', image);
};

module.exports = displayImage;
