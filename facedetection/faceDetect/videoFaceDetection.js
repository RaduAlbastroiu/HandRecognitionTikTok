const cv = require('opencv4nodejs');
const { getDataFilePath } = require('../utils');
const { runVideoFaceDetection } = require('./commons');

const videoFile = getDataFilePath('../facedetection/data/test.mp4');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

function detectFaces(img) {
  // restrict minSize and scaleFactor for faster processing
  const options = {
    // minSize: new cv.Size(40, 40),
    // scaleFactor: 1.2,
    scaleFactor: 1.1,
    minNeighbors: 10,
  };
  return classifier.detectMultiScale(img.bgrToGray(), options).objects;
}

let array_images = [];
runVideoFaceDetection(videoFile, detectFaces, array_images);

let out = new cv.VideoWriter(
  'project.mp4',
  cv.VideoWriter.fourcc('DIVX'),
  15,
  new cv.Size(800, 800)
);

console.log('HERE');
array_images.forEach((element) => {
  out.write(element);
});
console.log('HERE 2');
out.release();
