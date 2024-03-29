const handpose = require('@tensorflow-models/handpose');
const { downloadCsv } = require('./downloadFile');
const {
  getColNames63,
  getColNamesConverted,
  handKeyPointsConverter,
  handKeyPointsConverterRow,
  getFingersUp,
} = require('./handKeyPointsConverter');
const { predictRandomForest } = require('./randomforest/randomForest');
let model = null;
let number = 0;

// store hand position data
let handKeyPointsData = [];

export async function handDetector(generateCsv) {
  console.log('Frame');

  // provide img / video
  if (model === null) {
    model = await handpose.load();
  }

  const predictions = await model.estimateHands(
    document.querySelector('video')
  );

  if (predictions.length > 0) {
    let handRowData = [];

    number++;
    console.log(number);

    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].landmarks;

      // Log hand keypoints.
      for (let i = 0; i < keypoints.length; i++) {
        const [x, y, z] = keypoints[i];
        handRowData.push(x);
        handRowData.push(y);
        handRowData.push(z);
        //console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      }
    }

    if (generateCsv) {
      handKeyPointsData.push(handRowData);
    }

    // export csv
    if (number == 20 && generateCsv) {
      console.log('Download Csv');

      let colnames = getColNamesConverted();
      let convertedFeatures = handKeyPointsConverter(
        handKeyPointsData,
        'Vulcan'
      );

      downloadCsv(colnames, convertedFeatures);
    }

    let convertedData = handKeyPointsConverterRow(handRowData);
    let result = predictRandomForest([convertedData]);

    return result;
  }
}
