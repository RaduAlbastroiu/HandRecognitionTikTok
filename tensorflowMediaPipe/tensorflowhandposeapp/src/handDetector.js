const handpose = require('@tensorflow-models/handpose');
const { downloadCsv } = require('./downloadCsv');
let model = null;
let number = 0;

let handData = [];

export async function handDetector() {
  console.log('HERE');

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
        console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      }
    }

    handData.push(handRowData);

    if (number == 10) {
      console.log('AJUNBGS');

      let colnames = [];
      for (let i = 0; i <= 20; i++) {
        colnames.push(`Key ${i} x`);
        colnames.push(`Key ${i} y`);
        colnames.push(`Key ${i} z`);
      }

      downloadCsv(colnames, handData);
    }
  }
}
