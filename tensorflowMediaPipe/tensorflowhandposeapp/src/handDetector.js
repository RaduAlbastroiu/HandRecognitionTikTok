const handpose = require('@tensorflow-models/handpose');
let model = null;
let number = 0;

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
    number++;
    console.log(number);
    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].landmarks;

      // Log hand keypoints.
      for (let i = 0; i < keypoints.length; i++) {
        const [x, y, z] = keypoints[i];
        console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      }
    }
  }
}
