const cv = require('opencv4nodejs');

const displayImage = () => {
  const image = cv.imread(
    '/Users/radualbastroiu/Documents/Projects/HandRecognitionTikTok/test/pug.png'
  );
  cv.imshowWait('Image', image);
};

module.exports = displayImage;
