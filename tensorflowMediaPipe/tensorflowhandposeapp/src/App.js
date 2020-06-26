import React, { useEffect } from 'react';
import { CameraFeed } from './CameraFeed';

const handpose = require('@tensorflow-models/handpose');
const test_img = require('./test_img.png');

async function main() {
  const model = await handpose.load();

  console.log('HERE');

  // provide img / video
  const predictions = await model.estimateHands(
    document.querySelector('video')
  );

  console.log('Length');
  console.log(predictions.length);
  if (predictions.length > 0) {
    console.log('Length');
    console.log(predictions.length);

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

function App() {
  useEffect(() => {
    console.log('mounted');
    main();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test</h1>
        <CameraFeed></CameraFeed>
      </header>
    </div>
  );
}

export default App;
